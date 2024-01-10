import { styled } from "styled-components";
import { Link } from "react-router-dom";

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
    width: 100%;
    max-width: 100rem;
    margin: 0 auto;
    padding: 5rem 6rem;

    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h1 {
            color: ${({ theme }) => theme.COLORS.WHITE};
            font-family: var(--Roboto-Slab);
            font-size: 3.2rem;
            font-weight: 400;
        }
    }

    overflow: auto;

    &::-webkit-scrollbar {
        width: 8px;
        background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    }
    
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.COLORS.PINK};
        border-radius: .8rem;
    }
`;

export const CreateMovieButton = styled(Link)`
    display: flex;
    align-items: center;
    gap: .25rem;
    background: ${({ theme }) => theme.COLORS.PINK};
    padding: 1rem 2rem;
    border: none;
    border-radius: .8rem;

    > svg {
        color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        font-size: 2rem;
    }

    > p {
        color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        font-family: var(--Roboto-Slab);
        font-size: 1.6rem;
        font-weight: 400;
    }
`;

export const MovieCardsContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    width: 100%;
    margin-top: 3.7rem;
`;