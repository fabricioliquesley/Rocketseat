/* 
  Dada uma lista de pacientes, descubra o IMC de cada paciente e imprima

  "Paciente X possui o IMC de: Y"

  Onde X é o nome do paciente e Y é o IMC desse paciente

  Crie uma função para fazer o cálculo de IMC
*/

/* peso / (altura * altura) */

const pacientes = [
    {
        nome: 'Pedro',
        idade: 19,
        peso: 89.5,
        altura: 178
    },
    {
        nome: 'Maria',
        idade: 56,
        peso: 55.6,
        altura: 156
    },
    {
        nome: 'Antônio',
        idade: 36,
        peso: 90,
        altura: 187
    },
];

function calcIMC(peso, altura){
    return (peso / ((altura / 100) ** 2)).toFixed(2);
}

for (let paciente of pacientes){
    console.log(`Paciente ${paciente.nome} possui o IMC de: ${calcIMC(paciente.peso, paciente.altura)}`)
};