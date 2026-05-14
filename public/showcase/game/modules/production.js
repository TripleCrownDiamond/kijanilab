// production.js — adds resources. Pure functions, easy to wrap in a reducer.

export function produceCrops(state)  { return { ...state, crops:   state.crops + 1   }; }
export function produceAnimals(state){ return { ...state, animals: state.animals + 1 }; }
export function produceFish(state)   { return { ...state, fish:    state.fish + 1    }; }
