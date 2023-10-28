let changeThemeBtnIcon = document.querySelector('#changeThemeBtnIcon');
let body = document.querySelector('body');

export function changeTheme() {
    body.classList.toggle('dark');

    changeThemeBtnIcon.classList.toggle('ph-moon');
    changeThemeBtnIcon.classList.toggle('ph-sun');
}