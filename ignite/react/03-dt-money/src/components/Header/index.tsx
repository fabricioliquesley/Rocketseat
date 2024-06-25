import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoURL from "../../assets/logo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img
          src={logoURL}
          alt=""
        />
        <NewTransactionButton>
          Nova transação
        </NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
