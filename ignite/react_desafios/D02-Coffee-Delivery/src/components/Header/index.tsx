import { MapPin, ShoppingCart } from "@phosphor-icons/react";
import { CartLink, HeaderContainer, LocationTag } from "./styles";

import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export function Header() {
  const { totalItems } = useContext(CartContext);

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
          <span>São Paulo, SP</span>
        </LocationTag>
        <CartLink to={"/checkout"}>
          <ShoppingCart weight="fill" size={22} />
          {totalItems > 0 && (
            <div className="counter">
              <span>{totalItems}</span>
            </div>
          )}
        </CartLink>
      </div>
    </HeaderContainer>
  );
}
