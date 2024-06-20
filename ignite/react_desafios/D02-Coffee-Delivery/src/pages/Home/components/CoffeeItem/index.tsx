import { useContext, useState } from "react";
import { Badge, BadgeList, ContentContainer, Controls } from "./styles";

import { Minus, Plus, ShoppingCart } from "@phosphor-icons/react";
import { CartContext } from "../../../../context/CartContext";
import { formatPrice } from "../../../../utils/formatPrice";

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
  const { addCoffee } = useContext(CartContext);
  const [coffeeQuantity, setCoffeeQuantity] = useState(1);

  function handleDecreaseQuantity() {
    if (coffeeQuantity === 0) return;

    setCoffeeQuantity((prev) => prev - 1);
  }

  function handleIncreaseQuantity() {
    setCoffeeQuantity((prev) => prev + 1);
  }

  function handleAddCoffee() {
    addCoffee(coffeeData.id, coffeeQuantity);
  }

  return (
    <ContentContainer>
      <img src={coffeeData.imgURL} alt="Imagem ilustrativa do café" />
      <BadgeList>
        {coffeeData.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </BadgeList>
      <h3>{coffeeData.title}</h3>
      <p>{coffeeData.description}</p>
      <Controls>
        <h4>
          <b>R$ </b>
          {formatPrice(coffeeData.price)}
        </h4>
        <div>
          <div>
            <button onClick={handleDecreaseQuantity}>
              <Minus />
            </button>
            <span>{coffeeQuantity}</span>
            <button onClick={handleIncreaseQuantity}>
              <Plus />
            </button>
          </div>
          <button onClick={handleAddCoffee}>
            <ShoppingCart weight="fill" size={22} />
          </button>
        </div>
      </Controls>
    </ContentContainer>
  );
}
