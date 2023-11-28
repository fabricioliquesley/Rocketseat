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

        console.log(value)
    });
}