/*
  ** Jogo da adivinhação **

  Apresente a mensagem ao usuário:
  "Adivinhe o número que estou pensando? Está entre 0 e 10"

  Crie um lógica para gerar um número aleatório 
  e verificar se o número digitado é o mesmo que o aleatório gerado pelo sistema.

  Enquanto o usuário não adivinhar o número, mostrar a mensagem:
  "Erro, tente novamente:"

  Caso o usuário acerte o número, apresentar a mensagem:
  "Parabéns! Você adivinhou o número em x tentativas"

  Substitua o "x" da mensagem, pelo número de tentativas
*/

let guess = Number(prompt("Você consegue adivinhar o número que estou pensando? Está entre 0 e 10"))

const randomNumber = Math.round(Math.random() * 10)

let attempts = 1

while(guess != randomNumber){
    guess = prompt("Tente novamente, aquele não era meu número.")

    attempts++
}

if(attempts == 1){
    alert(`Parabéns! Você adivinhou o número em ${attempts} tentativa.`)
}

alert(`Parabéns! Você adivinhou o número em ${attempts} tentativas.`)