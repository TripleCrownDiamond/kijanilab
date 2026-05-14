// gameState.js — single source of truth.
// Mirrors a future React useState/useReducer slice exactly.

const STORAGE_KEY = 'kj-farm-game';

export const initialState = Object.freeze({
  money:       0,
  crops:       0,
  animals:     0,
  fish:        0,
  smartphone:  false,
  ecommerce:   false,
});

export const PRICES = Object.freeze({
  smartphone: 100,
  ecommerce:  250,
});

export const SELL_PER_UNIT = 10; // FCFA per resource

// ── load / persist
export function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...initialState };
    const parsed = JSON.parse(raw);
    return { ...initialState, ...parsed };
  } catch {
    return { ...initialState };
  }
}

export function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* quota or unavailable — fail silently */ }
}

export function reset() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  return { ...initialState };
}

// ── pure-ish helpers (these would be reducer actions in React)
export function digitalLevel(state) {
  return (state.smartphone ? 1 : 0) + (state.ecommerce ? 1 : 0);
}

export function digitalProgress(state) {
  return digitalLevel(state) / 2; // 0..1
}

export function isFullyDigital(state) {
  return state.smartphone && state.ecommerce;
}
