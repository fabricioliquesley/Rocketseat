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
        background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color: ${({ theme }) => theme.COLORS.WHITE};
        font-size: 1.6rem;

        -webkit-font-smoothing: antialiased;
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }

    ul {
        list-style: none;
    }
`;