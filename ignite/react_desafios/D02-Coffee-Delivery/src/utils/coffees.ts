import coffee1 from "../assets/coffee1.png";
import coffee2 from "../assets/coffee2.png";
import coffee3 from "../assets/coffee3.png";
import coffee4 from "../assets/coffee4.png";
import coffee5 from "../assets/coffee5.png";

import { coffeeProps } from "../pages/Home/components/CoffeeItem";

export const coffees: coffeeProps[] = [
  {
    id: "xx01",
    imgURL: coffee1,
    tags: ["tradicional"],
    title: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 9.45,
  },
  {
    id: "xx02",
    imgURL: coffee2,
    tags: ["gelado", "refrescante"],
    title: "Café Gelado",
    description: "Um café gelado perfeito para dias quentes",
    price: 12.00,
  },
  {
    id: "xx03",
    imgURL: coffee3,
    tags: ["especial", "forte"],
    title: "Café Turco",
    description: "Café forte e aromático preparado no estilo turco",
    price: 15.30,
  },
  {
    id: "xx04",
    imgURL: coffee4,
    tags: ["doce", "especial"],
    title: "Café Caramelo",
    description: "Delicioso café com um toque de caramelo",
    price: 13.75,
  },
  {
    id: "xx05",
    imgURL: coffee5,
    tags: ["tradicional", "amargo"],
    title: "Café Americano",
    description: "Café simples e forte, feito com mais água",
    price: 8.20,
  },
  {
    id: "xx06",
    imgURL: coffee1,
    tags: ["doce", "refrescante", "gelado"],
    title: "Café Mocha Gelado",
    description: "Café gelado com chocolate e leite",
    price: 14.50,
  },
  {
    id: "xx07",
    imgURL: coffee2,
    tags: ["tradicional", "leve"],
    title: "Café com Leite",
    description: "Clássica combinação de café com leite",
    price: 10.00,
  },
  {
    id: "xx08",
    imgURL: coffee3,
    tags: ["doce", "especial"],
    title: "Café de Baunilha",
    description: "Café aromatizado com um toque de baunilha",
    price: 13.50,
  },
  {
    id: "xx09",
    imgURL: coffee4,
    tags: ["forte", "especial"],
    title: "Café Expresso Duplo",
    description: "Dose dupla do clássico expresso",
    price: 16.00,
  },
  {
    id: "xx10",
    imgURL: coffee5,
    tags: ["doce", "especial", "gelado"],
    title: "Café com Leite Condensado Gelado",
    description: "Café gelado adoçado com leite condensado",
    price: 12.75,
  },
  {
    id: "xx11",
    imgURL: coffee1,
    tags: ["tradicional", "forte"],
    title: "Café Italiano",
    description: "Café preparado com método italiano para um sabor intenso",
    price: 11.80,
  },
];
