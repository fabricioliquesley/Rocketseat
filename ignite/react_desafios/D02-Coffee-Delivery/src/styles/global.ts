import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: 62.5%;
  }

  body {
    background: ${props => props.theme["base-background"]};
    font-size: 1.6rem;
  }

  body, input, button {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    padding: 0 16rem;
  }
`;
