/* KijaniLab - Mini-jeu agritech v2 (bundled classic script for file:// support)
 *
 * v2 features over v1:
 *   - 2D world with farmer guided by keyboard / D-pad
 *   - Tractor that drives autonomously across crop rows
 *   - 6 upgrades (smartphone, e-commerce, tractor, sensors, drone, AI) + 7 levels
 *   - Auto-tick passive production for tractor / sensors / AI
 *   - Drone bonus on sell (+50%)
 *   - LocalStorage save (key 'kj-farm-v2')
 *
 * Same code is split as ES modules in ./modules/ for the React migration.
 */
(function () {
  'use strict';

  // ???????????????? constants
  var STORAGE_KEY    = 'kj-farm-v2';
  var STEP           = 30;
  var STAGE_W        = 600;
  var STAGE_H        = 360;
  var SELL_PER_UNIT  = 10;

  var PRICES = {
    smartphone: 100,
    ecommerce:  250,
    tractor:    500,
    sensors:    1200,
    drone:      3000,
    ai:         6000,
  };

  // upgrade purchase order - each unlocks once previous owned (UX guidance, not enforced)
  var UPGRADE_ORDER = ['smartphone', 'ecommerce', 'tractor', 'sensors', 'drone', 'ai'];

  // zones (rectangles in stage SVG coords, matching the visible field/pasture/pond)
  var ZONES = {
    crops:   { x1: 50,  y1: 50,  x2: 280, y2: 195 },
    pasture: { x1: 320, y1: 55,  x2: 560, y2: 175 },
    pond:    { x1: 330, y1: 220, x2: 560, y2: 320 },
  };

  // tick intervals (ms)
  var TICK = {
    tractor: 3000,
    sensors: 4000,
    ai:      8000,
  };
  var SOUND_KEY = 'kj-farm-v2-sound';
  var soundEnabled = true;
  var audioCtx = null;

  function loadSoundPreference() {
    try {
      soundEnabled = localStorage.getItem(SOUND_KEY) !== 'off';
    } catch (e) {
      soundEnabled = true;
    }
  }

  function saveSoundPreference() {
    try { localStorage.setItem(SOUND_KEY, soundEnabled ? 'on' : 'off'); } catch (e) {}
  }

  function ensureAudio() {
    if (!window.AudioContext && !window.webkitAudioContext) return null;
    if (!audioCtx) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, duration, type, volume) {
    if (!soundEnabled) return;
    var ctx = ensureAudio();
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.value = volume || 0.05;
    osc.connect(gain);
    gain.connect(ctx.destination);
    var now = ctx.currentTime;
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.start(now);
    osc.stop(now + duration);
  }

  function playSound(kind) {
    if (kind === 'move')       { playTone(240, 0.05, 'triangle', 0.025); return; }
    if (kind === 'crop')       { playTone(420, 0.08, 'triangle', 0.04); return; }
    if (kind === 'animal')     { playTone(300, 0.08, 'square', 0.04); return; }
    if (kind === 'fish')       { playTone(520, 0.09, 'sine', 0.04); return; }
    if (kind === 'sell')       { playTone(640, 0.09, 'triangle', 0.05); playTone(820, 0.12, 'triangle', 0.04); return; }
    if (kind === 'upgrade')    { playTone(700, 0.10, 'triangle', 0.05); playTone(980, 0.12, 'sine', 0.04); return; }
    if (kind === 'reset')      { playTone(200, 0.10, 'sawtooth', 0.04); return; }
    if (kind === 'victory')    {
      playTone(660, 0.10, 'triangle', 0.055);
      setTimeout(function () { playTone(880, 0.12, 'triangle', 0.05); }, 110);
      setTimeout(function () { playTone(1100, 0.16, 'triangle', 0.045); }, 230);
      return;
    }
  }

  // state — sensors == irrigation system
  var initialState = Object.freeze({
    money: 0, crops: 0, animals: 0, fish: 0,
    smartphone: false, ecommerce: false, tractor: false, sensors: false, drone: false, ai: false,
    farmerX: 130, farmerY: 230,
    irrigationBuff: 0,   // 0..1 stack, +20% per click on irrigation, capped at +60% (3)
    totalSold: 0,
    sales: 0,
    cooldownTractor: 0,  // ms left
    cooldownIrrig:   0,
  });

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, initialState);
      var parsed = JSON.parse(raw);
      return Object.assign({}, initialState, parsed);
    } catch (e) { return Object.assign({}, initialState); }
  }
  function save(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function resetState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    return Object.assign({}, initialState);
  }

  function level(s) {
    var n = 1;
    for (var i = 0; i < UPGRADE_ORDER.length; i++) if (s[UPGRADE_ORDER[i]]) n++;
    return n;
  }
  var LEVEL_LABELS = ['', 'Demarrage', 'Connecte', 'En ligne', 'Mecanise', 'Smart', 'Aerien', 'Smart Farm'];
  function levelLabel(n) { return LEVEL_LABELS[n] || ''; }

  function digitalProgress(s) {
    var owned = 0;
    for (var i = 0; i < UPGRADE_ORDER.length; i++) if (s[UPGRADE_ORDER[i]]) owned++;
    return owned / UPGRADE_ORDER.length;
  }
  function isFullyDigital(s) { return level(s) === 7; }

  // ???????????????? world helpers
  function inZone(x, y, z) { return x >= z.x1 && x <= z.x2 && y >= z.y1 && y <= z.y2; }
  function currentZone(x, y) {
    if (inZone(x, y, ZONES.crops))   return 'crops';
    if (inZone(x, y, ZONES.pasture)) return 'pasture';
    if (inZone(x, y, ZONES.pond))    return 'pond';
    return null;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function moveFarmer(s, dx, dy) {
    return Object.assign({}, s, {
      farmerX: clamp(s.farmerX + dx * STEP, 24,  STAGE_W - 24),
      farmerY: clamp(s.farmerY + dy * STEP, 50,  STAGE_H - 24),
    });
  }

  // ???????????????? actions (pure)
  function produceCrops(s)   { return Object.assign({}, s, { crops:   s.crops + 1 }); }
  function produceAnimals(s) { return Object.assign({}, s, { animals: s.animals + 1 }); }
  function produceFish(s)    { return Object.assign({}, s, { fish:    s.fish + 1 }); }

  // Compute the price multiplier with full breakdown — used for both sell + UI
  function computeMultipliers(s) {
    var m = 1;
    var parts = [];
    parts.push({ label: 'Base', value: '×1' });
    if (s.smartphone) { m *= 2; parts.push({ label: '📱 Smartphone', value: '×2' }); }
    if (s.ecommerce)  { m *= 2; parts.push({ label: '💻 E-commerce', value: '×2' }); }
    if (s.drone)      { m *= 1.5; parts.push({ label: '🛸 Drone', value: '×1.5' }); }
    if (s.irrigationBuff > 0) {
      var pct = 1 + 0.2 * s.irrigationBuff;
      m *= pct;
      parts.push({ label: '💧 Irrigation', value: '×' + pct.toFixed(2) });
    }
    return { multiplier: m, parts: parts };
  }

  function sell(s) {
    var total = s.crops + s.animals + s.fish;
    if (total === 0) return { state: s, gained: 0 };
    var base = total * SELL_PER_UNIT;
    var info = computeMultipliers(s);
    var gained = Math.floor(base * info.multiplier);
    return {
      state: Object.assign({}, s, {
        money: s.money + gained,
        crops: 0, animals: 0, fish: 0,
        irrigationBuff: 0,                 // consumed on sale
        totalSold: s.totalSold + gained,
        sales: s.sales + 1,
      }),
      gained: gained,
      breakdown: info,
    };
  }

  function buy(s, key) {
    if (s[key]) return { state: s, ok: false, reason: 'owned' };
    var price = PRICES[key];
    if (s.money < price) return { state: s, ok: false, reason: 'poor' };
    var next = Object.assign({}, s);
    next.money = s.money - price;
    next[key] = true;
    return { state: next, ok: true };
  }

  function actAtFarmer(s) {
    var z = currentZone(s.farmerX, s.farmerY);
    if (z === 'crops')   return produceCrops(s);
    if (z === 'pasture') return produceAnimals(s);
    if (z === 'pond')    return produceFish(s);
    return s;
  }

  // ???????????????? DOM helpers
  function $(sel) { return document.querySelector(sel); }
  function fmt(v) { return v.toLocaleString('fr-FR') + ' FCFA'; }

  function setVisible(sel, visible) {
    var el = $(sel);
    if (!el) return;
    el.style.display = visible ? '' : 'none';
  }

  function syncFauna(s) {
    setVisible('#animal-cow-1', s.animals >= 1);
    setVisible('#animal-goat-1', s.animals >= 2);
    setVisible('#animal-chicken-1', s.animals >= 3);
    setVisible('#animal-goat-2', s.animals >= 6);
    setVisible('#animal-cow-2', s.animals >= 10);

    setVisible('#pond-fish-1', s.fish >= 1);
    setVisible('#pond-fish-2', s.fish >= 2);
    setVisible('#pond-fish-3', s.fish >= 6);
  }

  function refreshSoundButton() {
    var btn = $('#btn-sound');
    if (!btn) return;
    btn.textContent = soundEnabled ? 'SOUND ON' : 'SOUND OFF';
    btn.style.color = soundEnabled ? 'var(--accent)' : '';
    btn.style.borderColor = soundEnabled ? 'var(--accent)' : '';
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    saveSoundPreference();
    refreshSoundButton();
    if (soundEnabled) playTone(660, 0.07, 'triangle', 0.04);
  }

  // ???????????????? render
  var lastFullyDigital = false;
  var lastFarmerX = null, lastFarmerY = null;

  function render(s) {
    // money + level
    $('#money').textContent       = fmt(s.money);
    $('#digital-level').textContent = Math.round(digitalProgress(s) * 100) + '%';
    $('#digital-bar').style.width = (digitalProgress(s) * 100) + '%';
    var lvl = level(s);
    $('#level-num').textContent   = lvl;
    $('#level-label').textContent = levelLabel(lvl);

    // stars (1..7)
    var stars = $('#stars');
    if (stars) {
      stars.innerHTML = '';
      for (var i = 1; i <= 7; i++) {
        var star = document.createElement('i');
        star.textContent = '?';
        if (i > lvl) star.className = 'off';
        stars.appendChild(star);
      }
    }

    // resources
    $('#crops').textContent   = s.crops;
    $('#animals').textContent = s.animals;
    $('#fish').textContent    = s.fish;
    syncFauna(s);

    // farmer transform
    var farmer = $('#farmer');
    if (farmer) {
      farmer.setAttribute('transform', 'translate(' + s.farmerX + ',' + s.farmerY + ')');
      // walk wobble: scale flip on horizontal movement direction
      if (lastFarmerX !== null && s.farmerX < lastFarmerX) farmer.setAttribute('data-facing', 'left');
      else if (lastFarmerX !== null && s.farmerX > lastFarmerX) farmer.setAttribute('data-facing', 'right');
    }
    lastFarmerX = s.farmerX; lastFarmerY = s.farmerY;

    // zone hint
    var hint = $('#hint');
    if (hint) {
      var z = currentZone(s.farmerX, s.farmerY);
      if (z === 'crops')        hint.textContent = '🌱 Cultures - ACTION pour recolter';
      else if (z === 'pasture') hint.textContent = '🐄 Paturage - ACTION pour elever';
      else if (z === 'pond')    hint.textContent = '🎣 Etang - ACTION pour pecher';
      else                      hint.textContent = 'Avancez sur une zone';
      hint.classList.toggle('empty', z === null);
    }

    // sell button enable
    var total = s.crops + s.animals + s.fish;
    var sellBtn = $('#btn-sell');
    sellBtn.disabled = total === 0;
    sellBtn.classList.toggle('is-disabled', total === 0);

    // upgrade cards
    UPGRADE_ORDER.forEach(function (key, idx) {
      var card = $('#card-' + key);
      var btn  = $('#btn-' + key);
      if (!card || !btn) return;
      var price = PRICES[key];
      // gate: must own previous upgrade (UX clarity, not enforced strictly)
      var prevOwned = idx === 0 || s[UPGRADE_ORDER[idx - 1]];
      if (s[key]) {
        btn.disabled = true;
        btn.textContent = '? Acquis';
        card.classList.add('upgrade--owned');
        card.classList.remove('upgrade--locked');
      } else if (!prevOwned) {
        btn.disabled = true;
        btn.textContent = 'Verrouille - acheter le palier precedent';
        card.classList.remove('upgrade--owned');
        card.classList.add('upgrade--locked');
      } else {
        btn.disabled = s.money < price;
        btn.textContent = 'Acheter - ' + price.toLocaleString('fr-FR') + ' FCFA';
        card.classList.remove('upgrade--owned');
        card.classList.remove('upgrade--locked');
      }
    });

    // toggle world props visibility per upgrades
    var droneEl    = $('#drone-mini');
    var sensorsEl  = $('#sensors-mini');
    var aiEl       = $('#ai-mini');
    var tractorEl  = $('#tractor-mini');
    if (droneEl)   droneEl.style.display   = s.drone   ? '' : 'none';
    if (sensorsEl) sensorsEl.style.display = s.sensors ? '' : 'none';
    if (aiEl)      aiEl.style.display      = s.ai      ? '' : 'none';
    if (tractorEl) {
      tractorEl.style.display = s.tractor ? '' : 'none';
      tractorEl.style.cursor = s.tractor ? 'pointer' : 'default';
      if (s.tractor) tractorEl.classList.add('clickable');
    }
    if (sensorsEl) {
      sensorsEl.style.cursor = s.sensors ? 'pointer' : 'default';
      if (s.sensors) sensorsEl.classList.add('clickable');
    }

    // profit breakdown panel
    var info = computeMultipliers(s);
    var totalUnits = s.crops + s.animals + s.fish;
    var basePrice = totalUnits * SELL_PER_UNIT;
    var nextPrice = Math.floor(basePrice * info.multiplier);
    var multEl = $('#profit-multiplier');
    var nextEl = $('#profit-next');
    var partsEl = $('#profit-parts');
    var totalEl = $('#profit-total');
    var salesEl = $('#profit-sales');
    var buffEl  = $('#profit-buff');
    if (multEl) multEl.textContent = '×' + info.multiplier.toFixed(2);
    if (nextEl) nextEl.textContent = totalUnits === 0 ? '—' : fmt(nextPrice);
    if (partsEl) {
      partsEl.innerHTML = info.parts.map(function (p) {
        return '<li><span>' + p.label + '</span><b>' + p.value + '</b></li>';
      }).join('');
    }
    if (totalEl) totalEl.textContent = fmt(s.totalSold);
    if (salesEl) salesEl.textContent = s.sales;
    if (buffEl) {
      buffEl.textContent = s.irrigationBuff > 0
        ? '+' + (s.irrigationBuff * 20) + '% (×' + s.irrigationBuff + ')'
        : '—';
    }

    // win box
    var winBox = $('#win-box');
    if (isFullyDigital(s)) {
      winBox.classList.remove('win-hidden');
      winBox.classList.add('win-shown');
    } else {
      winBox.classList.add('win-hidden');
      winBox.classList.remove('win-shown');
    }
  }

  function pulse(sel) {
    var el = typeof sel === 'string' ? $(sel) : sel;
    if (!el) return;
    el.classList.remove('animate-press');
    void el.offsetWidth;
    el.classList.add('animate-press');
  }

  function floatAt(sel, text) {
    var target = $(sel);
    if (!target) return;
    var ghost = document.createElement('span');
    ghost.textContent = text;
    ghost.className = 'float-ghost animate-float';
    target.appendChild(ghost);
    setTimeout(function () { ghost.remove(); }, 900);
  }

  // pop floating text on the SVG stage at world coords (e.g. when tractor harvests)
  function stagePop(x, y, text, variant) {
    var wrap = $('#stage-wrap');
    if (!wrap) return;
    var rect = wrap.getBoundingClientRect();
    var stage = $('#farm-stage').getBoundingClientRect();
    var sx = (x / STAGE_W) * stage.width  + (stage.left - rect.left);
    var sy = (y / STAGE_H) * stage.height + (stage.top  - rect.top);
    var pop = document.createElement('div');
    pop.className = 'stage-pop' + (variant ? ' stage-pop--' + variant : '');
    pop.textContent = text;
    pop.style.left = sx + 'px';
    pop.style.top  = sy + 'px';
    wrap.appendChild(pop);
    setTimeout(function () { pop.remove(); }, 1100);
  }

  function celebrate() {
    var win = $('#win-box');
    if (!win) return;
    win.classList.add('animate-glow');
    playSound('victory');
    setTimeout(function () { win.classList.remove('animate-glow'); }, 1600);
  }

  // ???????????????? tick (auto-production)
  var tickHandle = null;
  var ticks = { tractor: 0, sensors: 0, ai: 0 };

  // tractor patrol path - cycles through crop cells centers
  var TRACTOR_WAYPOINTS = [
    { x: 70,  y: 75 },  { x: 250, y: 75 },
    { x: 250, y: 120 }, { x: 70,  y: 120 },
    { x: 70,  y: 165 }, { x: 250, y: 165 },
  ];
  var tractorWaypointIx = 0;

  function moveTractorTo(point) {
    var t = $('#tractor-mini');
    if (!t) return;
    t.setAttribute('transform', 'translate(' + (point.x - 20) + ',' + (point.y - 20) + ')');
  }

  function startTick() {
    if (tickHandle) return;
    tickHandle = setInterval(function () {
      var s = state;
      ticks.tractor += 1000;
      ticks.sensors += 1000;
      ticks.ai      += 1000;

      // cooldowns
      if (state.cooldownTractor > 0 || state.cooldownIrrig > 0) {
        state = Object.assign({}, state, {
          cooldownTractor: Math.max(0, state.cooldownTractor - 1000),
          cooldownIrrig:   Math.max(0, state.cooldownIrrig - 1000),
        });
      }

      // tractor: every 3s, move to next waypoint and harvest +1 crop
      if (s.tractor && ticks.tractor >= TICK.tractor) {
        ticks.tractor = 0;
        var wp = TRACTOR_WAYPOINTS[tractorWaypointIx];
        moveTractorTo(wp);
        tractorWaypointIx = (tractorWaypointIx + 1) % TRACTOR_WAYPOINTS.length;
        // schedule the harvest after the move animation
        setTimeout(function () {
          state = produceCrops(state);
          save(state);
          stagePop(wp.x, wp.y, '+1 ??');
          render(state);
        }, 600);
      }

      // sensors: every 4s, +1 random resource
      if (s.sensors && ticks.sensors >= TICK.sensors) {
        ticks.sensors = 0;
        var pick = Math.floor(Math.random() * 3); // 0 crops, 1 animals, 2 fish
        var msg, x, y;
        if (pick === 0)      { state = produceCrops(state);   msg = '+1 ??'; x = 165; y = 110; }
        else if (pick === 1) { state = produceAnimals(state); msg = '+1 ??'; x = 440; y = 100; }
        else                 { state = produceFish(state);    msg = '+1 ??'; x = 445; y = 270; }
        save(state);
        stagePop(x, y, msg, 'info');
        render(state);
      }

      // AI: every 8s, auto-sell if any inventory
      if (s.ai && ticks.ai >= TICK.ai) {
        ticks.ai = 0;
        var totalNow = state.crops + state.animals + state.fish;
        if (totalNow > 0) {
          var res = sell(state);
          state = res.state;
          save(state);
          stagePop(320, 200, '+' + res.gained.toLocaleString('fr-FR') + ' FCFA', 'ai');
          render(state);
        }
      }
    }, 1000);
  }

  // ???????????????? controls
  function move(dx, dy) {
    state = moveFarmer(state, dx, dy);
    save(state);
    render(state);
    playSound('move');
  }

  function action() {
    var z = currentZone(state.farmerX, state.farmerY);
    if (!z) return;
    state = actAtFarmer(state);
    save(state);
    render(state);
    if (z === 'crops') playSound('crop');
    if (z === 'pasture') playSound('animal');
    if (z === 'pond') playSound('fish');
    // visual feedback at farmer position
    stagePop(state.farmerX, state.farmerY - 20, '+1');
  }

  function applyAndRender(next, opts) {
    var was = isFullyDigital(state);
    state = next;
    save(state);
    render(state);
    if (!was && isFullyDigital(state)) celebrate();
    if (opts && opts.pulse) pulse(opts.pulse);
    if (opts && opts.floatTarget && opts.floatText) floatAt(opts.floatTarget, opts.floatText);
  }

  function bindControls() {
    // D-pad buttons (also touch-friendly)
    document.querySelectorAll('.dpad button[data-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var d = btn.dataset.dir;
        if (d === 'up')    move(0, -1);
        if (d === 'down')  move(0,  1);
        if (d === 'left')  move(-1, 0);
        if (d === 'right') move( 1, 0);
      });
    });
    $('#d-act').addEventListener('click', action);

    // keyboard
    window.addEventListener('keydown', function (e) {
      var t = e.target;
      // ignore when typing in inputs
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      switch (e.key) {
        case 'ArrowUp':    case 'w': case 'z': move(0, -1); e.preventDefault(); break;
        case 'ArrowDown':  case 's':           move(0,  1); e.preventDefault(); break;
        case 'ArrowLeft':  case 'a': case 'q': move(-1, 0); e.preventDefault(); break;
        case 'ArrowRight': case 'd':           move( 1, 0); e.preventDefault(); break;
        case ' ':          case 'Enter':       action();    e.preventDefault(); break;
      }
    });

    // quick action buttons
    $('#btn-crops').addEventListener('click', function () {
      applyAndRender(produceCrops(state), { pulse: '#btn-crops', floatTarget: '#btn-crops', floatText: '+1' });
      playSound('crop');
    });
    $('#btn-animals').addEventListener('click', function () {
      applyAndRender(produceAnimals(state), { pulse: '#btn-animals', floatTarget: '#btn-animals', floatText: '+1' });
      playSound('animal');
    });
    $('#btn-fish').addEventListener('click', function () {
      applyAndRender(produceFish(state), { pulse: '#btn-fish', floatTarget: '#btn-fish', floatText: '+1' });
      playSound('fish');
    });

    // sell
    $('#btn-sell').addEventListener('click', function () {
      var res = sell(state);
      if (res.gained === 0) return;
      applyAndRender(res.state, { pulse: '#btn-sell', floatTarget: '#btn-sell', floatText: '+' + res.gained.toLocaleString('fr-FR') + ' FCFA' });
      playSound('sell');
    });

    // upgrades
    document.querySelectorAll('[data-buy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.buy;
        var res = buy(state, key);
        if (!res.ok) return;
        applyAndRender(res.state, { pulse: '#card-' + key });
        playSound('upgrade');
      });
    });

    var soundBtn = $('#btn-sound');
    if (soundBtn) soundBtn.addEventListener('click', toggleSound);

    // interactive tractor — click for instant +3 cultures (5s cooldown)
    var tractorEl = $('#tractor-mini');
    if (tractorEl) {
      tractorEl.addEventListener('click', function (e) {
        if (!state.tractor) return;
        if (state.cooldownTractor > 0) return;
        state = Object.assign({}, state,
          { crops: state.crops + 3, cooldownTractor: 5000 });
        save(state); render(state);
        playSound('crop');
        // pop +3 above tractor
        var t = e.currentTarget;
        var transform = t.getAttribute('transform') || 'translate(60,100)';
        var match = /translate\(([\-\d.]+),\s*([\-\d.]+)\)/.exec(transform);
        var tx = match ? parseFloat(match[1]) + 30 : 90;
        var ty = match ? parseFloat(match[2]) + 10 : 110;
        stagePop(tx, ty, '+3 🌱', 'info');
        tractorEl.classList.add('cooldown');
        setTimeout(function () { tractorEl.classList.remove('cooldown'); }, 5000);
      });
    }

    // interactive irrigation — click for +1 buff stack (max 3, max +60%) — 4s cooldown
    var irrigEl = $('#sensors-mini');
    if (irrigEl) {
      irrigEl.addEventListener('click', function () {
        if (!state.sensors) return;
        if (state.cooldownIrrig > 0) return;
        if (state.irrigationBuff >= 3) {
          stagePop(165, 175, 'BUFF MAX', 'info');
          return;
        }
        state = Object.assign({}, state,
          { irrigationBuff: Math.min(3, state.irrigationBuff + 1), cooldownIrrig: 4000 });
        save(state); render(state);
        playSound('upgrade');
        stagePop(165, 175, '+20% PROCHAINE VENTE', 'info');
        irrigEl.classList.add('cooldown');
        setTimeout(function () { irrigEl.classList.remove('cooldown'); }, 4000);
      });
    }

    // reset
    $('#btn-reset').addEventListener('click', function () {
      if (!confirm('Recommencer la partie ? Le compteur, les ressources et toutes les ameliorations seront effaces.')) return;
      state = resetState();
      tractorWaypointIx = 0;
      ticks = { tractor: 0, sensors: 0, ai: 0 };
      render(state);
      playSound('reset');
    });
  }

  // ???????????????? boot
  var state = load();

  function boot() {
    loadSoundPreference();
    refreshSoundButton();
    render(state);
    bindControls();
    startTick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();



