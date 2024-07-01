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
    color: ${props => props.theme["base-text"]};
  }
  
  body, input, button {
    font-family: "Nunito", sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;