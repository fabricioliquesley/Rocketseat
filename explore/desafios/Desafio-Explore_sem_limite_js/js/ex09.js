let number = Number(prompt("Digite um número para saber se é par ou não"))

let itsAEvenNumber = number % 2 == 0

if(itsAEvenNumber){
    alert("É um número par")
} else {
    alert("Não é um número par")
}