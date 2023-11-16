import state from "./state.js";
import * as events from "./events.js";
import * as timer from "./timer.js";

export function start(minutos, segundos) {
    state.minutes = minutos;
    state.seconds = segundos;

    timer.updateDisplay(4, 4)

    events.registerControls();
}

