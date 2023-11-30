import "./FocusTimer/sound.js";
import { forestAudio, rainAudio } from "./FocusTimer/sound.js";
import state from "./FocusTimer/state.js"

let themes = document.getElementsByName('themes');

for (let theme of themes) {
        theme.addEventListener('click', (e) => {
        let value = e.target.value;
        
        // Adiciona a classe 'active' apenas para o tema clicado
        e.target.parentNode.classList.add('active');

        for (let i = 0; i < themes.length; i++) {
            if (themes[i] !== e.target) {
                // Remove a classe 'active' dos outros temas marcados
                themes[i].parentNode.classList.remove('active');
            }
        }

        switch (value) {
            case 'forest':
                changeThemes(value);
                break;
            case 'rain':
                changeThemes(value);
                break;
            case 'coffeShop':
                changeThemes(value);
                break;
            case 'fireplace':
                changeThemes(value);
                break;
            default:
                console.error('Valor invalido, não foi possivel encontrar o tema selecionado.')
                break;
        }
    });
}

function changeThemes(theme) {
    if (state.previousTheme == null) {
        state.previousTheme = theme;

        document.body.classList.add(theme);
        return console.log(state.previousTheme);
    }

    document.body.classList.remove(state.previousTheme);
    document.body.classList.add(theme)
    state.previousTheme = theme;
    return console.log(state.previousTheme);
}