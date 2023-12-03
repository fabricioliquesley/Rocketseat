let numberOne = Number(prompt("Digite o primeiro número"))
let numberTwo = Number(prompt("Digite o segundo número"))

function sub(numberOne, numberTwo){
    let result = `A subtração entre os números é ${numberOne - numberTwo}`

    return alert(result)
}

sub(numberOne, numberTwo)