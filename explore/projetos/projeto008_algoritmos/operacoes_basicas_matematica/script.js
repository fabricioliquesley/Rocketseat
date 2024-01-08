/*
    Capturar 2 números
    e fazer as 4 operações básicas da matemáticas.

    E para cada operação, mostrar um alert com o resulta
*/

alert("Esse algoritmo apresenta o resultado das 4 operações básicas da matemática, entre 2 números");

let numberOne = Number(prompt("Digite o primeiro número"));
let numberTwo = Number(prompt("Digite o segundo número"));

const sumResult = numberOne + numberTwo;
const subResult = numberOne - numberTwo;
const multiResult = numberOne * numberTwo
const divResult = numberOne / numberTwo

alert(`O resultado da soma é: ${sumResult}`);
alert(`O resultado da subtração é: ${subResult}`);
alert(`O resultado da multiplicação é: ${multiResult}`);
alert(`O resultado da divisão é: ${divResult}`);

// let results = [
//     {
//         operation: "soma",
//         result: numberOne + numberTwo
//     },
//     {
//         operation: "subtração",
//         result: numberOne - numberTwo
//     },
//     {
//         operation: "multiplicação",
//         result: numberOne * numberTwo
//     },
//     {
//         operation: "divisão",
//         result: numberOne / numberTwo}
// ];

// for (let item in results){
//     alert(`O resultado da ${results[item].operation} é: ${results[item].result}`);
// };