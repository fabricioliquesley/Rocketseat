/*

  Faça um programa que tenha um menu e apresente a seguinte mensagem:
  
  Olá usuário! Digite o número da opção desejada

    1. Cadastrar um item na lista
    2. Mostrar itens cadastrados
    3. Sair do programa
  
  --- 
  O programa deverá capturar o número digitado pelo usuário e mostrar o seguintes cenários:

  Caso o usuário digite 1, ele poderá cadastrar um item em uma lista
  Caso o usuário digite 2, ele poderá ver os itens cadastrados
    Se não houver nenhum item cadastrado, mostrar a mensagem: 
      "Não existem itens cadastrados"
  Caso o usuário digite 3, a aplicação deverá ser encerrada.

*/
let bootFlag = true;
let itemsList = [];

while(bootFlag){
    let chosenOption = prompt(`Olá usuário! Digite o número da opção desejada

    1. Cadastrar um item na lista
    2. Mostrar itens cadastrados
    3. Sair do programa
    `);

    switch (chosenOption) {
        case '1':
            let item = prompt("Qual item deseja cadastrar?");
            itemsList.push(item);
            alert(item + ' cadastrado com sucesso');

            break;
        case '2':
            if(itemsList.length == 0){
                alert("Não existem itens cadastrados");
            } else {
                alert(`Sua lista tem ${itemsList.join(", ")}`);
            };
            break;
        case '3':
            bootFlag = false;
            alert("Até mais 🖐");

            break;
        default:
            alert('Opção invalida! Escolha entre as 3 disponíveis');

            break;
    };
};