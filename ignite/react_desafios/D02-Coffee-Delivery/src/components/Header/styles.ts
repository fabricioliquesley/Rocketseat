import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem 16rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 1.3rem;
  }
`;

export const LocationTag = styled.div`
  display: flex;
  align-items: center;
  gap: .4rem;
  background: ${props => props.theme["purple-light"]};
  padding: 0.8rem;
  border-radius: .6rem;

  & > svg {
    color: ${props => props.theme["purple"]};
  }

  & > span {
    color: ${props => props.theme["purple-dark"]};
    font-size: 1.4rem;
    line-height: 130%;
  }
`;

export const CartLink = styled(Link)`
  background: ${props => props.theme["yellow-light"]};
  padding: 0.8rem;
  border-radius: 0.6rem;
  line-height: 70%;
  transition: all .2s;

  &:hover {
    filter: brightness(0.9);
  }

  & > svg {
    color: ${props => props.theme["yellow-dark"]}
  }
`