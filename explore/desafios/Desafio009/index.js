/* 
    Bora praticar e rever tudo o que foi ensinado na aula? 💜

    Nesse desafio você irá criar uma lista de estudantes e, cada estudante dentro dessa lista, deverá conter os seguintes dados:

    - nome;
    - nota da primeira prova;
    - nota da segunda prova.

    Depois de criada a lista:

    - [X]  Crie uma função que irá calcular a média das notas de cada aluno;
    - [X]  Supondo que a média, para esse concurso é 7, verifique se cada aluno obteve sucesso ou não em entrar no concurso e mostre uma mensagem na tela.
*/

let students = [
    {
        name: 'Pedro',
        grades: {
            firstTestGrade: 7,
            secondTestGrade: 5
        }
    },
    {
        name: 'Maria',
        grades: {
            firstTestGrade: 8,
            secondTestGrade: 6
        }
    },
    {
        name: 'João',
        grades: {
            firstTestGrade: 6,
            secondTestGrade: 7
        }
    },
    {
        name: 'Ana',
        grades: {
            firstTestGrade: 9,
            secondTestGrade: 8
        }
    },
    {
        name: 'Luiz',
        grades: {
            firstTestGrade: 7,
            secondTestGrade: 7
        }
    },
    {
        name: 'Marta',
        grades: {
            firstTestGrade: 8,
            secondTestGrade: 9
        }
    },
    {
        name: 'Carlos',
        grades: {
            firstTestGrade: 6,
            secondTestGrade: 6
        }
    }
];

function calcAverage(firstTestGrade, secondTestGrade){
    let average = (firstTestGrade + secondTestGrade) / 2

    return average
}

for(let student of students){
    let average = calcAverage(student.grades.firstTestGrade, student.grades.secondTestGrade)
    let name = student.name

    const aprovado = `Parabéns, ${name}! Você foi aprovado(a) no concurso!`
    const reprovado = `Não foi dessa vez, ${name}! Tente novamente!`
    
    let message = average >= 7 ? aprovado : reprovado

    alert(`A média do(a) aluno(a) ${name} é: ${average}\n${message}`)
}