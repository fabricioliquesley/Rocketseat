import state from "./state.js";

export function start(minutos, segundos) {
    state.minutes = minutos;
    state.seconds = segundos;
}

