import state from "./state.js";
import * as timer from "./timer.js";
import * as el from "./elements.js";
import * as sounds from "./sounds.js";

export function toggleRunning () {
    /* O metodo toggle quando adicona a class retona true, quando remove retorna false */
    state.isRunning = document.documentElement.classList.toggle('running');

    timer.coutdown();
}

export function reset () {
    state.isMute = false;
    document.documentElement.classList.remove("running");
    timer.updateDisplay();
}

export function set () {
    el.minutes.setAttribute('contenteditable', true);
    el.minutes.focus()
}

export function toggleMusic () {
    state.isMute = document.documentElement.classList.toggle('music-on');
}