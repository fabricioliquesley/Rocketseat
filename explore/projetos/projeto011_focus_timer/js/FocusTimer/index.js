import state from "./state.js";
import * as events from "./events.js";

export function start(minutos, segundos) {
    state.minutes = minutos;
    state.seconds = segundos;

    events.registerControls();
}

