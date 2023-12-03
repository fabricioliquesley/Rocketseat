let number = Number(prompt("Digite um número para saber se é par ou não"))

let itsAOddNumber = number % 2 != 0

if(itsAOddNumber){
    alert("É um número impar")
} else {
    alert("Não é um número impar")
}