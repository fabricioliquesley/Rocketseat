let openCookie = document.querySelector('#openCookie');
let CookieMessage = document.querySelector('#CookieMessage');
let openNewCookie = document.querySelector('.openNewCookie');
let screen1 = document.querySelector('.screen1');
let screen2 = document.querySelector('.screen2');

function generateRandomMessage(){
    let randomNumber = Math.round(Math.random() * 10);

    let messageList = [
        "Se alguém está tão cansado que não possa te dar um sorriso, deixa-lhe o teu.",
        "A vida trará coisas boas se tiver paciência.",
        "Não compense na ira o que lhe falta na razão.",
        "A maior de todas as torres começa no solo.",
        "Podemos escolher o que semear, mas somos obrigados a colher o que plantamos.",
        "Há três coisas que jamais voltam; a flecha lançada, a palavra dita e a oportunidade perdida.",
        "Siga os bons e aprenda com eles.",
        "Não importa o tamanho da montanha, ela não pode tapar o sol.",
        "O riso é a menor distância entre duas pessoas.",
        "Faça pequenas coisas hoje e coisas maiores lhe serão confiadas amanhã.",
        "A sua visão se tornará mais clara apenas quando conseguir olhar para dentro do seu coração."
    ]

    CookieMessage.textContent = messageList[randomNumber];
    changeScreen();
}

function changeScreen(){
    screen1.classList.toggle("hide");
    screen2.classList.toggle("hide");
}

openCookie.addEventListener("click", generateRandomMessage)
openNewCookie.addEventListener("click", changeScreen)