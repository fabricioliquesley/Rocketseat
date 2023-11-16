import state from "./state.js";
import * as timer from "./timer.js";

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
    console.log("set");
}

export function toggleMusic () {
    state.isMute = document.documentElement.classList.toggle('music-on');
}