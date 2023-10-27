/*
  Solicitar o nome do aluno e as 3 notas
  do bimestre calcular a média daquele aluno.

  A média positiva deverá ser maior que 6

  Se o aluno passou no bimestre, dar os 
  parabéns.

  Se o aluno não passou no bimestre, 
  motivar o aluno a dar seu melhor na prova
  de recuperação.

  Em ambos os casos, mostre uma mensagem com o nome do aluno e a nota
*/

function calcularMedia(nome, exam1, exam2, exam3){
    let average = (exam1 + exam2 + exam3) / 3;

    let averageFormatted = average.toFixed(1).replace('.', ',');

    if (average > 6){
        alert(`Parabéns ${nome} sua media foi de ${averageFormatted}. Você passou nesse bimestre`);
    } else {
        alert(`Que triste ${nome}, sua media foi de ${averageFormatted}. Infelizmente não é o suficiente para passar no bimestre, mas não desanime ainda tem a prova de recuperação para você alcançar a media bimestral.`);
    };
};

let nome = prompt("Ola, qual o seu nome?");
let exam1 = Number(prompt("Qual nota você obteve na primeira prova?"));
let exam2 = Number(prompt("Qual nota você obteve na segunda prova?"));
let exam3 = Number(prompt("Qual nota você obteve na terceira prova?"));

calcularMedia(nome, exam1, exam2, exam3);