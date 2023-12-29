import {styled} from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-rows: max-content auto;
    grid-template-areas: 
        "header"
        "content";
    width: 100%;
    height: 100vh;
`;

export const Main = styled.main`
    grid-area: content;
    text-align: center;
`;