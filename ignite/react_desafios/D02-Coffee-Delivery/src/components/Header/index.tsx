import { MapPin, ShoppingCart } from "@phosphor-icons/react";
import { CartLink, HeaderContainer, LocationTag } from "./styles";

import Logo from "../../assets/Logo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <img
        src={Logo}
        alt="Copo de café com um foguete decolando. Logo do Coffee Delivery"
      />
      <div>
        <LocationTag>
          <MapPin weight="fill" size={22} />
          <span>Mariana, Mg</span>
        </LocationTag>
        <CartLink to={"/checkout"}>
          <ShoppingCart weight="fill" size={22} />
        </CartLink>
      </div>
    </HeaderContainer>
  );
}
