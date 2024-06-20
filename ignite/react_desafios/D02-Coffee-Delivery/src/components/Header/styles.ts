import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme["base-background"]};
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
  gap: 0.4rem;
  background: ${(props) => props.theme["purple-light"]};
  padding: 0.8rem;
  border-radius: 0.6rem;

  & > svg {
    color: ${(props) => props.theme["purple"]};
  }

  & > span {
    color: ${(props) => props.theme["purple-dark"]};
    font-size: 1.4rem;
    line-height: 130%;
  }
`;

export const CartLink = styled(Link)`
  position: relative;
  background: ${(props) => props.theme["yellow-light"]};
  padding: 0.8rem;
  border-radius: 0.6rem;
  line-height: 70%;
  transition: all 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  & > svg {
    color: ${(props) => props.theme["yellow-dark"]};
  }

  > .counter {
    position: absolute;
    top: -.8rem;
    right: -.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: ${(props) => props.theme["yellow-dark"]};
    border-radius: 50%;

    > span {
      color: ${props => props.theme["base-background"]};
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 70%;
      letter-spacing: -0.072rem;
    }
  }
`;
