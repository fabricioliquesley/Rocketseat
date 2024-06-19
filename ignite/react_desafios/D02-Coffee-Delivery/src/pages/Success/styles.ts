import styled from "styled-components";

export const ContentContainer = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 8rem 16rem;
`;

export const OrderDetails = styled.section`
  & > h2 {
    color: ${(props) => props.theme["yellow-dark"]};
    font-family: "Baloo 2";
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 130%;
  }

  & > p {
    color: ${(props) => props.theme["base-subtitle"]};
    font-size: 2rem;
    font-weight: 400;
    line-height: 130%;
  }

  & > .gradient {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52.6rem;
    height: 25.5rem;
    background: linear-gradient(90deg, #dbac2c, #8047f8);
    border-radius: 0.6rem 3.6rem;
    margin-top: 4rem;

    > div {
      display: flex;
      flex-direction: column;
      gap: 3.2rem;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      padding: 4rem;
      background: ${(props) => props.theme["base-background"]};
      border-radius: 0.4rem 3.4rem;
    }
  }
`;

const BoxBase = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  > div {
    line-height: 70%;
    padding: 0.8rem;
    border-radius: 50%;

    > svg {
      color: ${(props) => props.theme["base-background"]};
    }
  }

  > p {
    color: ${(props) => props.theme["base-text"]};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 130%;

    > b {
      font-weight: 700;
    }
  }
`;

export const LocationBox = styled(BoxBase)`
  > div {
    background: ${(props) => props.theme["purple"]};
  }

  > p {
    max-width: 31rem;
  }
`;

export const DeliveryForecastBox = styled(BoxBase)`
  > div {
    background: ${(props) => props.theme["yellow"]};
  }

  > p {
    max-width: 14.1rem;
  }
`;

export const PaymentMethodBox = styled(BoxBase)`
  > div {
    background: ${(props) => props.theme["yellow-dark"]};
  }

  > p {
    max-width: 16.2rem;
  }
`;
