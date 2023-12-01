import state from "./state.js";
import * as timer from "./timer.js";

export function toggleRunning () {
    state.isRunning = document.documentElement.classList.toggle('running');

    timer.countdown();
}

export function reset () {
    timer.updateDisplay();
    state.isRunning = false;

    document.documentElement.classList.remove('running');
}

export function incrementFive () {
    if (state.minutes == 60 || state.isRunning) return;
    
    state.minutes += 5;
    timer.updateDisplay(state.minutes, state.seconds);
}

export function decrementFive () {
    if (state.minutes == 0 || state.isRunning) return;

    state.minutes -= 5;
    timer.updateDisplay(state.minutes, state.seconds);
}