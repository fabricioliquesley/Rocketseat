import state from "./state.js";
import * as timer from "./timer.js";

export function toggleRunning () {
    state.isRunning = document.documentElement.classList.toggle('running');

    timer.countdown();
}

export function reset () {
    console.log('reset');
}

export function incrementFive () {
    console.log('incrementFive');
}

export function decrementFive () {
    console.log('decrementFive');
}