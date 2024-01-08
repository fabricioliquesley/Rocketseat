import { controls } from "./elements.js";
import * as actions from "./actions.js";
import * as el from "./elements.js";
import state from "./state.js";
import { updateDisplay } from "./timer.js";
import * as sounds from "./sounds.js";

export function registerControls(){
    controls.addEventListener('click', (event) => {
        const action = event.target.dataset.action;

        if (typeof actions[action] != "function") {
            return;
        }

        sounds.buttonPressAudio.play();
        actions[action]();
    })
}

export function setMinutes () {
    el.minutes.addEventListener('focus', () => {
        el.minutes.textContent = "";
    })

    el.minutes.onkeypress = (event) => /\d/.test(event.key);

    el.minutes.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent;
        time = time > 60 ? 60 : time;

        state.minutes = time;
        state.seconds = 0;

        el.minutes.removeAttribute('contenteditable');

        updateDisplay();
    })
}