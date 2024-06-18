import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem;

  & > .info {
    display: flex;
    gap: 2rem;

    > img {
      width: 6.4rem;
    }

    > div > p {
      color: ${(props) => props.theme["base-subtitle"]};
      font-size: 1.6rem;
      line-height: 130%;
    }

    > div > div {
      display: flex;
      gap: 0.8rem;

      button {
        border: none;
        line-height: 70%;
        cursor: pointer;
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
        display: flex;
        align-items: center;
        gap: 0.4rem;
        background: ${(props) => props.theme["base-button"]};
        padding: 0.8rem;
        border-radius: 0.6rem;

        color: ${(props) => props.theme["base-text"]};
        font-size: 1.2rem;
        line-height: 160%;
        text-transform: uppercase;

        > svg {
          color: ${(props) => props.theme["purple"]};
        }
      }

      > button:hover {
        filter: brightness(0.9);
      }
    }
  }

  & > p {
    color: ${(props) => props.theme["base-subtitle"]};
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 130%;
  }
`;
