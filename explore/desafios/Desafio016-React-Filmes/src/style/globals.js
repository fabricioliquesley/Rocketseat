import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        font-size: 62.5%;

        --Roboto: 'Roboto', sans-serif;
        --Roboto-Slab: 'Roboto Slab', serif;
    }

    body {
        font-size: 1.6rem;
    }
`;