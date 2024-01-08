let numberOne = Number(prompt("Digite o primeiro número"))
let numberTwo = Number(prompt("Digite o segundo número"))

function multiplication(numberOne, numberTwo){
    let result = `A multiplicação entre os números é ${numberOne * numberTwo}`

    return alert(result)
}

multiplication(numberOne, numberTwo)