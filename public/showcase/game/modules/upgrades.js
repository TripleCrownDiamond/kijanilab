// upgrades.js — purchase logic for digital tools.

import { PRICES } from './gameState.js';

// returns { state, ok, reason } — ok=false if not affordable or already owned.
export function buySmartphone(state) {
  if (state.smartphone) return { state, ok: false, reason: 'owned' };
  if (state.money < PRICES.smartphone) return { state, ok: false, reason: 'poor' };
  return {
    state: { ...state, money: state.money - PRICES.smartphone, smartphone: true },
    ok: true,
  };
}

export function buyEcommerce(state) {
  if (state.ecommerce) return { state, ok: false, reason: 'owned' };
  if (state.money < PRICES.ecommerce) return { state, ok: false, reason: 'poor' };
  return {
    state: { ...state, money: state.money - PRICES.ecommerce, ecommerce: true },
    ok: true,
  };
}
