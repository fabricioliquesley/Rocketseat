import {
  InfoItem,
  IntroductionSession,
  ItemsContainer,
  CoffeeListSession,
} from "./styles";

import coffeeCup from "../../assets/coffe_cup.png";
import { Coffee, Package, ShoppingCart, Timer } from "@phosphor-icons/react";
import { CoffeeItem } from "./components/CoffeeItem";

export function Home() {
  return (
    <main>
      <IntroductionSession>
        <div>
          <h2>Encontre o café perfeito para qualquer hora do dia</h2>
          <p>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>
          <ItemsContainer>
            <InfoItem icon_bg={"yellow-dark"}>
              <div>
                <ShoppingCart size={16} weight="fill" />
              </div>
              <p>Compra simples e segura</p>
            </InfoItem>
            <InfoItem icon_bg={"gray"}>
              <div>
                <Package size={16} weight="fill" />
              </div>
              <p>Compra simples e segura</p>
            </InfoItem>
            <InfoItem icon_bg={"yellow"}>
              <div>
                <Timer size={16} weight="fill" />
              </div>
              <p>Compra simples e segura</p>
            </InfoItem>
            <InfoItem icon_bg={"purple"}>
              <div>
                <Coffee size={16} weight="fill" />
              </div>
              <p>Compra simples e segura</p>
            </InfoItem>
          </ItemsContainer>
        </div>
        <img
          src={coffeeCup}
          alt="Imagem ilustrativa da embalagem usada para servir o café"
        />
      </IntroductionSession>
      <CoffeeListSession>
        <h3>Nossos cafés</h3>
        <div>
          <CoffeeItem />
          <CoffeeItem />
          <CoffeeItem />
          <CoffeeItem />
        </div>
      </CoffeeListSession>
    </main>
  );
}
