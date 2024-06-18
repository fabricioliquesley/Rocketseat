import { ContentContainer } from "./styles";

import coffeeCup from "../../../../assets/coffe1.png";
import { Minus, Plus, Trash } from "@phosphor-icons/react";

export function CoffeeItem() {
  return (
    <ContentContainer>
      <div className="info">
        <img src={coffeeCup} />
        <div>
          <p>Expresso Tradicional</p>
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
              <Trash size={16}/>
              Remover
            </button>
          </div>
        </div>
      </div>
      <p>R$ 9,90</p>
    </ContentContainer>
  );
}
