// market.js — converts inventory to money with the digital multipliers applied.

import { SELL_PER_UNIT } from './gameState.js';

// returns { state, gained } so the UI can animate the floating amount
export function sell(state) {
  const totalUnits = state.crops + state.animals + state.fish;
  if (totalUnits === 0) return { state, gained: 0 };

  let gained = totalUnits * SELL_PER_UNIT;
  if (state.smartphone) gained *= 2; // smartphone doubles gain
  if (state.ecommerce)  gained *= 2; // e-commerce multiplies profits ×2

  const next = {
    ...state,
    money: state.money + gained,
    crops:   0,
    animals: 0,
    fish:    0,
  };

  return { state: next, gained };
}
