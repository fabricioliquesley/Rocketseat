import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-rows: max-content auto;
    grid-template-areas: 
    "header"
    "main";
    width: 100%;
    height: 100vh;
`;

export const Main = styled.main`
    grid-area: main;
    width: 100%;
    padding: 3.8rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
        background: ${({theme}) => theme.COLORS.BACKGROUND_800};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.COLORS.BACKGROUND_900};
    }
`;

export const Content = styled.div`
    max-width: 55rem;
    width: 100%;
    margin: 0 auto;

    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        > a {
            color: ${({theme}) => theme.COLORS.GRAY_100};
            font-size: 2rem;
            font-weight: 400;
        }
    }

    > fieldset {
        display: grid;
        gap: 1.6rem;
        margin-top: 3.6rem;
        border: none;

        textarea {
            width: 100%;
            height: 15rem;
            background: ${({theme}) => theme.COLORS.BACKGROUND_900};
            color: ${({theme}) => theme.COLORS.GRAY_300};
            font-size: 1.6rem;
            font-weight: 400;
            border: none;
            border-radius: 1rem;
            padding: 2rem;
        }
    }

    > section {
        margin-top: 3.4rem;

        > ul {
            display: grid;
            gap: 1.9rem;
            margin-bottom: 1.9rem;
        }

        .tagsContainer {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.9rem;
        }
    }

    > button {
        margin-top: 3.4rem;
    }
`;

export const Textarea = styled.textarea`
    resize: none;
`;