// ui.js — DOM bindings. The only module that touches the DOM.
// In a React migration this disappears entirely, replaced by JSX.

import { PRICES, digitalProgress, isFullyDigital } from './gameState.js';

const $ = (sel) => document.querySelector(sel);

export function render(state) {
  // header
  $('#money').textContent       = formatMoney(state.money);
  $('#digital-level').textContent = `${Math.round(digitalProgress(state) * 100)}%`;
  $('#digital-bar').style.width = `${digitalProgress(state) * 100}%`;

  // resources
  $('#crops').textContent   = state.crops;
  $('#animals').textContent = state.animals;
  $('#fish').textContent    = state.fish;

  // sell button enable/disable
  const total = state.crops + state.animals + state.fish;
  const sellBtn = $('#btn-sell');
  sellBtn.disabled = total === 0;
  sellBtn.classList.toggle('opacity-50', total === 0);
  sellBtn.classList.toggle('cursor-not-allowed', total === 0);

  // smartphone card
  const phoneBtn = $('#btn-smartphone');
  const phoneCard = $('#card-smartphone');
  if (state.smartphone) {
    phoneBtn.disabled = true;
    phoneBtn.textContent = '✓ Acquis';
    phoneCard.classList.add('upgrade--owned');
  } else {
    phoneBtn.disabled = state.money < PRICES.smartphone;
    phoneBtn.textContent = `Acheter — ${PRICES.smartphone} FCFA`;
    phoneCard.classList.remove('upgrade--owned');
  }

  // ecommerce card
  const ecomBtn = $('#btn-ecommerce');
  const ecomCard = $('#card-ecommerce');
  if (state.ecommerce) {
    ecomBtn.disabled = true;
    ecomBtn.textContent = '✓ Acquis';
    ecomCard.classList.add('upgrade--owned');
  } else {
    ecomBtn.disabled = state.money < PRICES.ecommerce;
    ecomBtn.textContent = `Acheter — ${PRICES.ecommerce} FCFA`;
    ecomCard.classList.remove('upgrade--owned');
  }

  // final message
  const winBox = $('#win-box');
  if (isFullyDigital(state)) {
    winBox.classList.remove('hidden');
    winBox.classList.add('flex');
  } else {
    winBox.classList.add('hidden');
    winBox.classList.remove('flex');
  }
}

export function pulse(elementOrSelector) {
  const el = typeof elementOrSelector === 'string' ? $(elementOrSelector) : elementOrSelector;
  if (!el) return;
  el.classList.remove('animate-press');
  // force reflow so the animation restarts
  void el.offsetWidth;
  el.classList.add('animate-press');
}

export function floatAt(targetSelector, text) {
  const target = $(targetSelector);
  if (!target) return;
  const ghost = document.createElement('span');
  ghost.textContent = text;
  ghost.className = 'pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 text-emerald-600 font-mono text-sm font-semibold animate-float';
  target.appendChild(ghost);
  setTimeout(() => ghost.remove(), 900);
}

export function celebrate() {
  const win = $('#win-box');
  if (!win) return;
  win.classList.add('animate-glow');
  setTimeout(() => win.classList.remove('animate-glow'), 1600);
}

// helper
function formatMoney(v) {
  return v.toLocaleString('fr-FR') + ' FCFA';
}
