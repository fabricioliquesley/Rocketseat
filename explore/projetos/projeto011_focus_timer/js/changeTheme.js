const changeThemeBtn = document.querySelector('#changeTheme');
const changeThemeBtnIcon = document.querySelector('#changeThemeBtnIcon');
const body = document.querySelector('body');
let darkMode = false;

changeThemeBtn.addEventListener('click', (event) => {
    const mode = darkMode ? 'Mudar para dark mode' : 'Mudar para light mode';

    event.currentTarget
        .querySelector('span').textContent = mode;

    body.classList.toggle('dark');

    changeThemeBtnIcon.classList.toggle('ph-moon');
    changeThemeBtnIcon.classList.toggle('ph-sun');

    darkMode = !darkMode;
})