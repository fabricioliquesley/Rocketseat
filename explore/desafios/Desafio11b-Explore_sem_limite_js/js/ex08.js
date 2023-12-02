let numberOne = Number(prompt("Digite o primeiro número"))
let numberTwo = Number(prompt("Digite o segundo número"))

function division(numberOne, numberTwo){
    let result = `A divisão entre os números é ${numberOne / numberTwo}`

    return alert(result)
}

division(numberOne, numberTwo)