/* 
  Crie uma lista de pacientes

  Cada paciente dentro da lista, deverá conter
    nome
    idade
    peso
    altura

  Escreva uma lista contendo o nome dos pacientes
*/

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

let patientInfos = [];

for (let paciente of pacientes){
    patientInfos.push(`${paciente.nome} tem ${paciente.idade} anos pesa ${paciente.peso}Kg e mede ${paciente.altura}cm`);
};

for (let patientInfo in patientInfos){
    console.log(patientInfos[patientInfo]);
};