// main.js — wires modules to DOM. Equivalent to a React <GameContainer /> root.

import { load, save, reset, isFullyDigital } from './modules/gameState.js';
import { produceCrops, produceAnimals, produceFish } from './modules/production.js';
import { sell } from './modules/market.js';
import { buySmartphone, buyEcommerce } from './modules/upgrades.js';
import { render, pulse, floatAt, celebrate } from './modules/ui.js';

let state = load();

function set(next, opts = {}) {
  const wasDigital = isFullyDigital(state);
  state = next;
  save(state);
  render(state);
  if (!wasDigital && isFullyDigital(state)) celebrate();
  if (opts.pulse) pulse(opts.pulse);
  if (opts.floatText && opts.floatTarget) floatAt(opts.floatTarget, opts.floatText);
}

document.addEventListener('DOMContentLoaded', () => {
  // initial paint
  render(state);

  // production
  document.getElementById('btn-crops').addEventListener('click', () => {
    set(produceCrops(state), { pulse: '#btn-crops', floatTarget: '#btn-crops', floatText: '+1' });
  });
  document.getElementById('btn-animals').addEventListener('click', () => {
    set(produceAnimals(state), { pulse: '#btn-animals', floatTarget: '#btn-animals', floatText: '+1' });
  });
  document.getElementById('btn-fish').addEventListener('click', () => {
    set(produceFish(state), { pulse: '#btn-fish', floatTarget: '#btn-fish', floatText: '+1' });
  });

  // sell
  document.getElementById('btn-sell').addEventListener('click', () => {
    const { state: next, gained } = sell(state);
    if (gained === 0) return;
    set(next, { pulse: '#btn-sell', floatTarget: '#btn-sell', floatText: `+${gained.toLocaleString('fr-FR')} FCFA` });
  });

  // upgrades
  document.getElementById('btn-smartphone').addEventListener('click', () => {
    const { state: next, ok } = buySmartphone(state);
    if (!ok) return;
    set(next, { pulse: '#card-smartphone' });
  });
  document.getElementById('btn-ecommerce').addEventListener('click', () => {
    const { state: next, ok } = buyEcommerce(state);
    if (!ok) return;
    set(next, { pulse: '#card-ecommerce' });
  });

  // reset
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (!confirm('Recommencer la partie ? Le compteur, les ressources et les améliorations seront effacés.')) return;
    state = reset();
    render(state);
  });
});
