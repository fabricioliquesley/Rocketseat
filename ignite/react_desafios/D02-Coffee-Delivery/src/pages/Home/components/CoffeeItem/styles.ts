import styled from "styled-components";

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25.6rem;
  background: ${(props) => props.theme["base-card"]};
  border-radius: 0.6rem 3.6rem;
  padding: 2rem;

  & > img {
    width: 12rem;
    margin-top: -4rem;
  }

  & > h3 {
    color: ${(props) => props.theme["base-subtitle"]};
    font-family: "Baloo 2";
    font-size: 2rem;
    font-weight: 700;
    line-height: 130%;
    margin-top: 1.6rem;
  }

  & > p {
    color: ${(props) => props.theme["base-label"]};
    text-align: center;
    font-size: 1.4rem;
    line-height: 130%;
    margin-top: 0.8rem;
  }
`;

export const BadgeList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.6rem;
`;

export const Badge = styled.span`
  background: ${(props) => props.theme["yellow-light"]};
  padding: 0.4rem 0.8rem;
  border-radius: 10rem;
  text-transform: uppercase;

  color: ${(props) => props.theme["yellow-dark"]};
  font-size: 1rem;
  font-weight: 700;
  line-height: 130%;
`;

export const Controls = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 3.3rem;

  & > h4 {
    color: ${(props) => props.theme["base-text"]};
    font-family: "Baloo 2";
    font-size: 2.4rem;
    font-weight: 800;
    line-height: 130%;

    > b {
      font-family: "Roboto";
      font-size: 1.4rem;
      font-weight: 400;
    }
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    & button {
      line-height: 70%;
      border: none;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: ${(props) => props.theme["base-button"]};
      padding: 0.8rem;
      border-radius: 0.6rem;

      > span {
        min-width: 2rem;
        color: ${(props) => props.theme["base-title"]};
        text-align: center;
        font-size: 1.6rem;
        line-height: 130%;
      }

      > button {
        background: none;
        color: ${(props) => props.theme["purple"]};
      }

      > button:hover {
        color: ${(props) => props.theme["purple-dark"]};
      }
    }

    > button {
      background: ${(props) => props.theme["purple-dark"]};
      color: ${(props) => props.theme["base-card"]};
      padding: 0.8rem;
      border-radius: 0.6rem;
      transition: all .2s;

      &:hover {
        background: ${(props) => props.theme["purple"]};
      }
    }
  }
`;
