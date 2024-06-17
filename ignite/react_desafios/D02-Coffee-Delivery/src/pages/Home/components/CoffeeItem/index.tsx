import { Badge, BadgeList, ContentContainer, Controls } from "./styles";

import ilustrativeCoffe from "../../../../assets/coffe1.png";
import { Minus, Plus, ShoppingCart } from "@phosphor-icons/react";

export function CoffeeItem() {
  return (
    <ContentContainer>
      <img src={ilustrativeCoffe} alt="Imagem ilustrativa do café" />
      <BadgeList>
        <Badge>tradicional</Badge>
      </BadgeList>
      <h3>Expresso Tradicional</h3>
      <p>O tradicional café feito com água quente e grãos moídos</p>
      <Controls>
        <h4>
          <b>R$ </b>
          9,90
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
