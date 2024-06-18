import styled from "styled-components";

export const CheckoutContainer = styled.main`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  padding: 0 16rem;

  & > section > h3 {
    color: ${(props) => props.theme["base-subtitle"]};
    font-family: "Baloo 2";
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 130%;
  }
`;

export const DeliveryFormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background: ${(props) => props.theme["base-card"]};
  padding: 4rem;
  margin-top: 1.5rem;
  border-radius: 0.6rem;

  & > form {
    display: grid;
    row-gap: 1.6rem;
    column-gap: 1.2rem;
    grid-template-columns: 20rem 27.6rem 6rem;

    > div:nth-of-type(1) {
      grid-column: 1;
      grid-row: 1;
    }

    > div:nth-of-type(2) {
      grid-column: 1/4;
      grid-row: 2;
    }

    > div:nth-of-type(3) {
      grid-column: 1;
      grid-row: 3;
    }

    > div:nth-of-type(4) {
      grid-column: 2/4;
      grid-row: 3;
    }

    > div:nth-of-type(5) {
      grid-column: 1;
      grid-row: 4;
    }

    > div:nth-of-type(6) {
      grid-column: 2;
      grid-row: 4;
    }

    > div:nth-of-type(7) {
      grid-column: 3;
      grid-row: 4;
    }
  }
`;

interface CardDescriptionProps {
  icon_color: "yellow" | "purple";
}

const COLORS = {
  yellow: "yellow-dark",
  purple: "purple",
};

export const CardDescription = styled.div<CardDescriptionProps>`
  & {
    display: flex;
    gap: 0.8rem;

    > svg {
      color: ${(props) => props.theme[COLORS[props.icon_color]]};
    }

    > div p {
      color: ${(props) => props.theme["base-subtitle"]};
      font-size: 1.6rem;
      line-height: 130%;
    }

    > div span {
      color: ${(props) => props.theme["base-text"]};
      font-size: 1.4rem;
      line-height: 130%;
    }
  }
`;

export const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background: ${(props) => props.theme["base-card"]};
  padding: 4rem;
  margin-top: 1.2rem;
  border-radius: 0.6rem;

  & > .paymentMethodOptions {
    display: flex;
    gap: 1.2rem;
  }
`;

export const PaymentMethod = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem;
  border-radius: 0.6rem;
  background: transparent;

  & > svg {
    color: ${(props) => props.theme["purple"]};
    line-height: 70%;
    z-index: 1;
  }

  & > p {
    color: ${(props) => props.theme["base-text"]};
    font-size: 1.2rem;
    text-transform: uppercase;
    z-index: 1;
  }

  & > .whenChecked {
    top: 0;
    right: 0;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme["base-button"]};
    outline: 1px solid ${(props) => props.theme["base-button"]};
    border-radius: 0.6rem;
  }

  & > input[type="radio"] {
    top: 0;
    left: 0;
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    appearance: none;
    cursor: pointer;
  }

  & > input[type="radio"]:checked + svg + p + .whenChecked {
    outline: 1px solid ${(props) => props.theme["purple"]};
    background: ${(props) => props.theme["purple-light"]};
  }
`;

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 44.8rem;
  background: ${(props) => props.theme["base-card"]};
  padding: 4rem;
  margin-top: 1.5rem;
  border-radius: 0.6rem 4.4rem;

  & > .values {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > p,
      span {
        color: ${(props) => props.theme["base-text"]};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 130%;
      }

      > span {
        font-size: 1.6rem;
      }

      > h3 {
        color: ${(props) => props.theme["base-subtitle"]};
        font-size: 2rem;
        font-weight: 700;
        line-height: 130%;
      }
    }
  }

  & > button {
    background: ${(props) => props.theme["yellow"]};
    padding: 1.2rem 0.8rem;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;

    color: ${(props) => props.theme["base-white"]};
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 160%;
  }

  & > button:hover {
    filter: brightness(.9);
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme["base-button"]};
`;
