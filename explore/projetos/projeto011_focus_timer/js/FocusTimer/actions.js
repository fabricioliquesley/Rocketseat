import state from "./state.js";

export function toggleRunning () {
    /* O metodo toggle quando adicona a class retona true, quando remove retorna false */
    state.isRunning = document.documentElement.classList.toggle('running');
}

export function reset () {
    state.isMute = false;
    document.documentElement.classList.remove("running");
}

export function set () {
    console.log("set");
}

export function toggleMusic () {
    state.isMute = document.documentElement.classList.toggle('music-on');
}