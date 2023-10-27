/*
  Capture 10 items para compor a lista de um supermercado.
  
  Após capturar os 10 items, imprima-os, separando por vírgula.
*/

let list = [];

for (let i = 0; i < 10; i++) {
    let item = prompt("Qual item você quer adicionar na lista?");

    list[i] = item;
};

alert(`Sua lista de compras tem: ${list.join(', ')}.`);