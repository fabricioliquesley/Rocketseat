import styled from "styled-components";

import cup from "../../assets/introduction_background.svg";

export const IntroductionSession = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9.4rem 16rem;
  background: url(${cup});
  background-repeat: no-repeat;
  background-size: cover;

  & > div {
    max-width: 58.8rem;

    > h2 {
      color: ${(props) => props.theme["base-title"]};
      font-family: "baloo 2";
      font-size: 4.8rem;
      line-height: 130%;
    }

    > p {
      color: ${(props) => props.theme["base-subtitle"]};
      font-size: 2rem;
      line-height: 130%;
      margin-top: 1.6rem;
    }
  }

  @media (min-width: 1441px) {
    & {
      background-repeat: repeat;
      background-size: auto;
    }
  }
`;

const BG_COLORS = {
  "yellow-dark": "yellow-dark",
  yellow: "yellow",
  gray: "base-text",
  purple: "purple",
};

export const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 2rem;
  margin-top: 6.6rem;
`;

interface InfoItemProps {
  icon_bg: keyof typeof BG_COLORS;
}

export const InfoItem = styled.div<InfoItemProps>`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & > div {
    background: ${(props) => props.theme[BG_COLORS[props.icon_bg]]};
    color: ${(props) => props.theme["base-background"]};
    padding: 0.8rem;
    border-radius: 50%;
    line-height: 70%;
  }

  & > p {
    color: ${(props) => props.theme["base-text"]};
    font-size: 1.6rem;
    line-height: 130%;
  }
`;

export const CoffeeListSession = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5.4rem;
  padding: 3.2rem 16rem;

  & > h3 {
    color: ${(props) => props.theme["base-subtitle"]};
    font-family: "Baloo 2";
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 130%;
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 4rem;
  }
`;
