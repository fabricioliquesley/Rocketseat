import { ContentContainer } from "./styles";

import { Minus, Plus, Trash } from "@phosphor-icons/react";
import { coffeeProps } from "../../../Home/components/CoffeeItem";
import { formatPrice } from "../../../../utils/formatPrice";
import { useContext } from "react";
import { CartContext } from "../../../../context/CartContext";

type coffeePropsWithQuantity = coffeeProps & {
  quantity: number;
};

interface CoffeeItemProps {
  coffeeData: coffeePropsWithQuantity;
}

export function CoffeeItem({ coffeeData }: CoffeeItemProps) {
  const { addCoffee, removeAUnityOfCoffee, removeCoffee } = useContext(CartContext);

  function handleIncreaseQuantity() {
    addCoffee(coffeeData.id, 1)
  }

  function handleDecreaseQuantity() {
    removeAUnityOfCoffee(coffeeData.id)
  }

  function handleRemoveCoffee() {
    removeCoffee(coffeeData.id);
  }

  return (
    <ContentContainer>
      <div className="info">
        <img src={coffeeData.imgURL} />
        <div>
          <p>{coffeeData.title}</p>
          <div>
            <div>
              <button onClick={handleDecreaseQuantity}>
                <Minus />
              </button>
              <span>{coffeeData.quantity}</span>
              <button onClick={handleIncreaseQuantity}>
                <Plus />
              </button>
            </div>
            <button onClick={handleRemoveCoffee}>
              <Trash size={16} />
              Remover
            </button>
          </div>
        </div>
      </div>
      <p>R$ {formatPrice(coffeeData.price)}</p>
    </ContentContainer>
  );
}
