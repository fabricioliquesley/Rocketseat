import { MapPin, ShoppingCart } from "@phosphor-icons/react";
import { CartLink, HeaderContainer, LocationTag } from "./styles";

import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <Link to={"/"}>
        <img
          src={Logo}
          alt="Copo de café com um foguete decolando. Logo do Coffee Delivery"
        />
      </Link>
      <div>
        <LocationTag>
          <MapPin weight="fill" size={22} />
          <span>Mariana, Mg</span>
        </LocationTag>
        <CartLink to={"/checkout"}>
          <ShoppingCart weight="fill" size={22} />
          <div className="counter">
            <span>3</span>
          </div>
        </CartLink>
      </div>
    </HeaderContainer>
  );
}
