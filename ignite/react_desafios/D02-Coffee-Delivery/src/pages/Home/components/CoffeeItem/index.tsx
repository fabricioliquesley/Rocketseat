import { Badge, BadgeList, ContentContainer, Controls } from "./styles";

import { Minus, Plus, ShoppingCart } from "@phosphor-icons/react";

export type coffeeProps = {
  id: string;
  imgURL: string;
  tags: string[];
  title: string;
  description: string;
  price: number;
};

interface CoffeeItemProps {
  coffeeData: coffeeProps;
}

export function CoffeeItem({ coffeeData }: CoffeeItemProps) {
  return (
    <ContentContainer>
      <img src={coffeeData.imgURL} alt="Imagem ilustrativa do café" />
      <BadgeList>
        {coffeeData.tags.map(tag => <Badge>{tag}</Badge>)}
      </BadgeList>
      <h3>{coffeeData.title}</h3>
      <p>{coffeeData.description}</p>
      <Controls>
        <h4>
          <b>R$ </b>
          {coffeeData.price.toString().replace(".", ",")}
        </h4>
        <div>
          <div>
            <button>
              <Minus />
            </button>
            <span>1</span>
            <button>
              <Plus />
            </button>
          </div>
          <button>
            <ShoppingCart weight="fill" size={22} />
          </button>
        </div>
      </Controls>
    </ContentContainer>
  );
}
