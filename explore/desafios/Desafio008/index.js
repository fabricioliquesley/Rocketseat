/* 
    Bora praticar e rever tudo o que foi ensinado na aula? 💜
    Nesse desafio, você irá solicitar ao usuário que ele insira dois números e, a partir daí, calcular:

    - [X]  A soma dos dois números;
    - [X]  A subtração dos dois números;
    - [X]  A multiplicação dos dois números;
    - [X]  A divisão dos dois números;
    - [X]  O resto da divisão dos dois números;

    Fácil até aqui, né? Bora se desafiar? 👀 🧑‍🚀

    - [X]  Verifique se a soma dos dois números é par(ou ímpar);
    - [X]  Verifique se os dois números inseridos são iguais (ou diferentes).
*/

const numberOne = Number(prompt("Qual o primeiro número?"));
const numberTwo = Number(prompt("Qual o segundo número?"));

let operations = [
    {
        operationName: 'soma',
        result: numberOne + numberTwo
    },
    {
        operationName: 'subtração',
        result: numberOne - numberTwo
    },
    {
        operationName: 'multiplicação',
        result: numberOne * numberTwo
    },
    {
        operationName: 'divisão',
        result: (numberOne / numberTwo).toFixed(2)
    },
    {
        operationName: 'resto de divisão',
        result: numberOne % numberTwo
    },
    function oddOrEven(soma){
        let result = soma % 2;
    
        if(result > 0) return 'ímpar';
    
        return 'par';
    },
    function isEqual(numberOne, numberTwo){
        let isEqual = numberOne == numberTwo;
    
        if(!isEqual) return 'diferentes.';
    
        return 'iguais.';
    }
];

for(let operation of operations){
    if(operations.indexOf(operation)  == 5){
        let sum = operations[0].result;
        let oddOrEven = operations[5](sum)

        alert(`A soma dos dois números é ${oddOrEven}: ${sum}.`);
        continue
    } else if(operations.indexOf(operation) == 6){
        let isEqual = operations[6](numberOne, numberTwo)

        alert(`Os números são ${isEqual}`);
        break
    }

    alert(`A ${operation.operationName} dos dois números é: ${operation.result}.`);
};