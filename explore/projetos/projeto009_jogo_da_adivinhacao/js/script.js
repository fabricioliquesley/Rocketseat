let screen1 = document.querySelector('.screen1');
let hunch = document.querySelector('#hunch');
let form = document.getElementById('form');

let screen2 = document.querySelector('.screen2');
let endGameMessage = document.querySelector('#endGameMessage');
let tryAgainButton = document.querySelector('.tryAgain');

let attempts = 1;
let randomNumber = Math.round(Math.random() * 10);
console.log(randomNumber)

form.addEventListener('submit', startGame);

tryAgainButton.addEventListener('click', restartGame)

document.addEventListener('keydown', (e) => {
    if(e.key == 'Enter' && screen1.classList.contains('hide')){
        restartGame();
    }
})

function startGame(event){
    event.preventDefault();
    
    let message = `Acertou em ${attempts} tentativa!`

    if(hunch.value != randomNumber){
        attempts++;
        return hunch.value = '';
    } else if(attempts == 1){
        changeScreen();
        return endGameMessage.textContent = message;
    } else {
        changeScreen();
        return endGameMessage.textContent = message;
    }
}

function restartGame(){
    changeScreen();

    return hunch.value = '',
    attempts = 1,
    randomNumber = Math.round(Math.random() * 10);
}

function changeScreen(){
    return screen1.classList.toggle('hide'), 
    screen2.classList.toggle('hide');
}
