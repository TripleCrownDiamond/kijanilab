/* KijaniLab shared client behavior
 * Theme switch, language toggle, scroll-aware nav, reveal-on-scroll, loader.
 * Plain classic script (no ES modules) so it works over file:// without a server.
 */
(function () {
  'use strict';

  var html = document.documentElement;

  // theme
  var THEME_KEY = 'kj-theme';

  function initTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
      html.dataset.theme = stored;
    } else {
      html.dataset.theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    syncBrandLogos();
    syncThemeColor();
  }

  function syncBrandLogos() {
    var dark = html.dataset.theme === 'dark';
    var src = dark ? '/showcase/assets/logo-green-black-leaf.svg' : '/showcase/assets/logo-green-white-leaf.svg';

    document.querySelectorAll('[data-logo]').forEach(function (img) {
      img.src = src;
    });
    document.querySelectorAll('[data-logo-rel]').forEach(function (img) {
      img.src = src;
    });
    document.querySelectorAll('[data-loader-logo]').forEach(function (img) {
      img.src = src;
    });
  }

  function syncThemeColor() {
    var meta = document.querySelector('meta[name=theme-color]');
    if (meta) meta.content = html.dataset.theme === 'dark' ? '#0A1410' : '#F2EFE6';
  }

  function toggleTheme() {
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, html.dataset.theme);
    syncBrandLogos();
    syncThemeColor();
  }

  // language
  var LANG_KEY = 'kj-lang';

  function initLang() {
    var lang = localStorage.getItem(LANG_KEY) || 'fr';
    applyLang(lang);
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('.nav__lang button').forEach(function (b) {
      b.setAttribute('aria-current', b.dataset.lang === lang ? 'true' : 'false');
    });

    document.querySelectorAll('[data-fr]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang);
      if (v != null) el.textContent = v;
    });

    document.querySelectorAll('[data-fr-html]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang + '-html');
      if (v != null) el.innerHTML = v;
    });
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyLang(lang);
  }

  // nav scroll
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var mobileToggle = null;
    var mobilePanel = null;

    function closeMobileNav() {
      if (!mobileToggle || !mobilePanel) return;
      nav.classList.remove('nav--mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobilePanel.setAttribute('hidden', '');
    }

    function openMobileNav() {
      if (!mobileToggle || !mobilePanel) return;
      nav.classList.add('nav--mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobilePanel.removeAttribute('hidden');
    }

    function initMobileNav() {
      var menu = nav.querySelector('.nav__menu');
      var right = nav.querySelector('.nav__right');
      if (!menu || !right) return;

      mobileToggle = document.createElement('button');
      mobileToggle.className = 'nav__toggle';
      mobileToggle.type = 'button';
      mobileToggle.setAttribute('aria-label', 'Menu');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.setAttribute('aria-controls', 'nav-mobile-menu');
      mobileToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line></svg>';
      right.appendChild(mobileToggle);

      mobilePanel = document.createElement('div');
      mobilePanel.className = 'nav__mobile';
      mobilePanel.id = 'nav-mobile-menu';
      mobilePanel.setAttribute('hidden', '');

      menu.querySelectorAll('a').forEach(function (link) {
        mobilePanel.appendChild(link.cloneNode(true));
      });

      var loginLink = nav.querySelector('.nav__login');
      var ctaLink = nav.querySelector('.nav__cta');
      if (loginLink || ctaLink) {
        var sep = document.createElement('div');
        sep.className = 'nav__mobile-sep';
        mobilePanel.appendChild(sep);
      }

      [loginLink, ctaLink].forEach(function (link) {
        if (!link) return;
        var cloned = link.cloneNode(true);
        cloned.removeAttribute('class');
        mobilePanel.appendChild(cloned);
      });

      nav.appendChild(mobilePanel);

      mobileToggle.addEventListener('click', function () {
        var isOpen = nav.classList.contains('nav--mobile-open');
        if (isOpen) closeMobileNav();
        else openMobileNav();
      });

      mobilePanel.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMobileNav);
      });

      document.addEventListener('click', function (event) {
        if (!nav.contains(event.target)) closeMobileNav();
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMobileNav();
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 1024) closeMobileNav();
      });
    }

    initMobileNav();

    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 12); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // back-to-top button
  function ensureBackToTopButton() {
    var existing = document.getElementById('to-top');
    if (existing) return existing;

    var btn = document.createElement('button');
    var isEn = document.documentElement.lang === 'en';
    var label = isEn ? 'Back to top' : 'Retour en haut';

    btn.className = 'to-top';
    btn.id = 'to-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';

    document.body.appendChild(btn);
    return btn;
  }

  // scroll progress — slim line at top
  function initScrollProgress() {
    if (document.querySelector('.scroll-progress')) return;
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    function update() {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop;
      var scrollHeight = doc.scrollHeight - doc.clientHeight;
      var p = scrollHeight > 0 ? Math.max(0, Math.min(1, scrollTop / scrollHeight)) : 0;
      bar.style.width = (p * 100).toFixed(2) + '%';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  // animate section numerals when their head enters viewport
  function initSectionNumerals() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.section-no').forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          var head = e.target.closest('.section-head');
          if (head) head.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.section-no').forEach(function (el) { io.observe(el); });
  }

  // magnetic CTA — slight pull toward cursor
  function initMagneticCta() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    var ctas = document.querySelectorAll('.btn--primary, .btn--ghost, .nav__cta');
    ctas.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        btn.style.setProperty('--mx', (dx * 6) + 'px');
        btn.style.setProperty('--my', (dy * 4) + 'px');
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.setProperty('--mx', '0px');
        btn.style.setProperty('--my', '0px');
      });
    });
  }

  function initBackToTop() {
    var btn = ensureBackToTopButton();
    if (!btn) return;
    var threshold = 480;
    function onScroll() {
      btn.classList.toggle('show', window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  // loader
  function initLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;

    var statusEl = document.getElementById('loader-status');
    var progressEl = document.getElementById('loader-progress');

    var statusByLang = {
      fr: [
        "Initialisation de l'atelier digital",
        'Connexion aux modules de terrain',
        'Synchronisation des donnees agritech',
        'Analyse des indicateurs en cours',
        'Preparation de votre espace'
      ],
      en: [
        'Initializing the digital studio',
        'Connecting field modules',
        'Syncing agritech datasets',
        'Analyzing key indicators',
        'Preparing your workspace'
      ]
    };

    var BAR_DURATION_MS = 1400; // must match CSS bar animation
    var MIN_VISIBLE_MS = 1400;
    var MAX_VISIBLE_MS = 3500;

    var startedAt = performance.now();
    var isLoaded = document.readyState === 'complete';
    var ticker = null;
    var dismissed = false;

    function clearTicker() {
      if (ticker) {
        window.clearInterval(ticker);
        ticker = null;
      }
    }

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      clearTicker();
      if (progressEl) progressEl.textContent = '100%';
      loader.classList.add('gone');
    }

    function updateLoaderMeta() {
      var now = performance.now();
      var elapsed = now - startedAt;
      var ratio = Math.max(0, Math.min(elapsed / BAR_DURATION_MS, 1));
      var lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
      var statuses = statusByLang[lang];

      if (statusEl) {
        var statusIndex = Math.min(Math.floor(ratio * statuses.length), statuses.length - 1);
        statusEl.textContent = statuses[statusIndex];
      }

      if (progressEl) {
        var pct = Math.round(ratio * 100);
        if (!isLoaded && pct > 99) pct = 99;
        progressEl.textContent = String(pct) + '%';
      }

      if (isLoaded && elapsed >= MIN_VISIBLE_MS) {
        dismiss();
      }
    }

    updateLoaderMeta();
    ticker = window.setInterval(updateLoaderMeta, 90);

    if (!isLoaded) {
      window.addEventListener('load', function () {
        isLoaded = true;
        updateLoaderMeta();
      }, { once: true });
    }

    window.setTimeout(function () {
      isLoaded = true;
      dismiss();
    }, MAX_VISIBLE_MS);
  }

  // reveal on scroll
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });

    var targets = '.section-head, .bento__cell, .product, .project-row, .persona, .odd, .academy__row, .timeline__node, .pasture, .greenhouse, .tractor-stage, .climate, .weather, .dash-card, .field-stage, .market-stage, details';
    document.querySelectorAll(targets).forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  // Leaflet map — real OSM tiles + KijaniLab markers
  function initLeafletMap() {
    var host = document.getElementById('leaflet-map');
    if (!host) return;
    if (typeof L === 'undefined') {
      // Leaflet not loaded yet — retry in 200ms (defer-loaded script)
      setTimeout(initLeafletMap, 200);
      return;
    }
    if (host.dataset.kjInit === 'true') return;
    host.dataset.kjInit = 'true';

    var map = L.map(host, {
      center: [10.5, -3],
      zoom: 5,
      minZoom: 4,
      maxZoom: 8,
      scrollWheelZoom: false,
      worldCopyJump: false,
      attributionControl: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 18,
    }).addTo(map);

    var sites = [
      { lat: 6.3703,  lng: 2.3912,  name: 'Cotonou · HQ',    meta: 'Bureau principal · 12 projets',     hq: true },
      { lat: 9.3372,  lng: 2.6303,  name: 'Parakou',         meta: 'Coopératives coton · 4 projets' },
      { lat: 6.1725,  lng: 1.2314,  name: 'Lomé',            meta: 'Filière soja · 2 projets' },
      { lat: 5.6037,  lng: -0.1870, name: 'Accra',           meta: 'Marketplaces filière · 3 projets' },
      { lat: 5.3600,  lng: -4.0083, name: 'Abidjan',         meta: 'Anacarde · 5 projets' },
      { lat: 6.5244,  lng: 3.3792,  name: 'Lagos',           meta: 'Agroalimentaire · 6 projets' },
      { lat: 13.5117, lng: 2.1251,  name: 'Niamey',          meta: 'Programmes développement · 3' },
      { lat: 12.3714, lng: -1.5197, name: 'Ouagadougou',     meta: 'ONG · résilience climat · 4' },
      { lat: 12.6392, lng: -8.0029, name: 'Bamako',          meta: 'Karité · 2 projets' },
      { lat: 12.0022, lng: 8.5920,  name: 'Kano',            meta: 'Capteurs IoT pilote · 1' },
      { lat: 9.6412,  lng: -13.5784,name: 'Conakry',         meta: 'Maps géospatiales · 2' },
      { lat: 14.6928, lng: -17.4467,name: 'Dakar',           meta: 'Agroéconomie · 3 projets' },
    ];

    sites.forEach(function (s) {
      var icon = L.divIcon({
        className: 'kj-marker' + (s.hq ? ' kj-marker--hq' : ''),
        iconSize: s.hq ? [20, 20] : [16, 16],
        iconAnchor: s.hq ? [10, 10]  : [8, 8],
      });
      var marker = L.marker([s.lat, s.lng], { icon: icon }).addTo(map);
      marker.bindPopup('<b>' + s.name + '</b><small>' + s.meta + '</small>');
    });

    var bounds = L.latLngBounds(sites.map(function (s) { return [s.lat, s.lng]; }));
    map.fitBounds(bounds, { padding: [40, 40] });
  }

  // map tooltip - shows city name + meta on hover/touch over a node-group
  function initMapTooltip() {
    var tooltip = document.getElementById('map-tooltip');
    if (!tooltip) return;
    var cityEl = document.getElementById('map-tooltip-city');
    var metaEl = document.getElementById('map-tooltip-meta');
    var map = tooltip.parentElement; // the .map container (positioned)
    if (!map) return;

    var groups = document.querySelectorAll('.map__svg .node-group');
    if (!groups.length) return;

    function show(g) {
      var city = g.getAttribute('data-city');
      var meta = g.getAttribute('data-meta');
      var cx = parseFloat(g.getAttribute('data-cx')) || 0;
      var cy = parseFloat(g.getAttribute('data-cy')) || 0;
      if (cityEl) cityEl.textContent = city || '';
      if (metaEl) metaEl.textContent = meta || '';
      // SVG viewBox is 600 x 600 - translate to container px
      var rect = map.getBoundingClientRect();
      var svg = map.querySelector('.map__svg');
      var svgRect = svg ? svg.getBoundingClientRect() : rect;
      var sx = (cx / 600) * svgRect.width  + (svgRect.left - rect.left);
      var sy = (cy / 600) * svgRect.height + (svgRect.top  - rect.top);
      tooltip.style.left = sx + 'px';
      tooltip.style.top  = sy + 'px';
      tooltip.classList.add('show');
    }
    function hide() { tooltip.classList.remove('show'); }

    groups.forEach(function (g) {
      g.addEventListener('mouseenter', function () { show(g); });
      g.addEventListener('mouseleave', hide);
      g.addEventListener('focus',      function () { show(g); });
      g.addEventListener('blur',       hide);
      g.addEventListener('touchstart', function () { show(g); }, { passive: true });
      g.setAttribute('tabindex', '0');
    });
  }

  // drone scene — mouse-follow parallax tilt
  function initSceneTilt() {
    var scene = document.querySelector('.scene');
    if (!scene) return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
    var ticking = false;
    var pendingX = 0, pendingY = 0;
    function onMove(e) {
      var rect = scene.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top  + rect.height / 2;
      var nx = (e.clientX - cx) / (rect.width / 2);
      var ny = (e.clientY - cy) / (rect.height / 2);
      pendingX = Math.max(-1, Math.min(1, nx));
      pendingY = Math.max(-1, Math.min(1, ny));
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          scene.style.setProperty('--tilt-x', (pendingX * 6) + 'deg');
          scene.style.setProperty('--tilt-y', (-pendingY * 6) + 'deg');
          scene.setAttribute('data-tilt-x', '');
          ticking = false;
        });
      }
    }
    function onLeave() {
      scene.style.setProperty('--tilt-x', '0deg');
      scene.style.setProperty('--tilt-y', '0deg');
    }
    scene.addEventListener('mousemove', onMove);
    scene.addEventListener('mouseleave', onLeave);
  }

  // animated number counters — count from 0 to data-target on viewport entry
  function initCounters() {
    var counters = document.querySelectorAll('[data-counter-to]');
    if (!counters.length || !('IntersectionObserver' in window)) return;
    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.getAttribute('data-counter-to'));
        var prefix = el.getAttribute('data-counter-prefix') || '';
        var suffix = el.getAttribute('data-counter-suffix') || '';
        var duration = parseInt(el.getAttribute('data-counter-duration') || '1400', 10);
        var startedAt = null;
        function tick(now) {
          if (!startedAt) startedAt = now;
          var p = Math.min(1, (now - startedAt) / duration);
          var v = Math.round(target * easeOutQuart(p));
          el.textContent = prefix + v.toLocaleString('fr-FR') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
  }

  // boot
  function boot() {
    initTheme();
    initLang();
    initNav();
    initLoader();
    initReveal();
    initBackToTop();
    initLeafletMap();
    initMapTooltip();
    initScrollProgress();
    initSectionNumerals();
    initMagneticCta();
    initSceneTilt();
    initCounters();

    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    document.querySelectorAll('.nav__lang button').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();



