import { styled } from "styled-components";

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
    display: grid;
    grid-area: content;
    gap: 4rem;
    width: 100%;
    max-width: 100rem;
    margin: 0 auto;
    padding: 4rem 6rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
            width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.COLORS.PINK};
        border-radius: 1rem;
    }

    > div {
        display: inherit;
        gap: 2.4rem;

        h1 {
            color: ${({theme}) => theme.COLORS.WHITE};
            font-family: var(--Roboto-Slab);
            font-size: 3.6rem;
            font-weight: 500;
        }
    }

    > fieldset {
        display: flex;
        gap: 4rem;
        width: 100%;
        border: none;

        div {
            max-width: 100%;
        }
    }

    > textarea {
        width: 100%;
        height: 220px;
        background: ${({theme}) => theme.COLORS.BACKGROUND_700};
        border-radius: 1rem;
        color: ${({theme}) => theme.COLORS.BEGE};
        font-family: var(--Roboto);
        font-size: 1.6rem;
        font-weight: 400;
        border: none;
        padding: 2rem 1.6rem;
        resize: none;

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background: ${({theme}) => theme.COLORS.PINK};
            border-radius: 1rem;
        }
    }

    .btnContainer {
        display: flex;
        gap: 4rem;
    }
`;

export const TagsContainer = styled.section`
    background: ${({theme}) => theme.COLORS.BACKGROUND_900};
    border-radius: 1rem;
    padding: 1.6rem;

    > h2 {
        color: ${({theme}) => theme.COLORS.GRAY_300};
        font-family: var(--Roboto-Slab);
        font-size: 2rem;
        font-weight: 400;
        margin-bottom: 2.4rem;
    }

    > div {
        display: flex;
        gap: 2.4rem;
        flex-wrap: wrap;
    }
`;