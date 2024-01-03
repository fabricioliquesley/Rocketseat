import { styled } from "styled-components";

export const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    height: 100vh;

    > h1 {
        color: ${({theme}) => theme.COLORS.ORANGE};
        font-size: 5rem;
    }
    
    > p {
        width: 35rem;
        color: ${({theme}) => theme.COLORS.WHITE};
        word-break: break-all;
        font-size: 2rem;
        text-align: center;
    }

    > button {
        width: 30rem;
        background: ${({theme}) => theme.COLORS.ORANGE};
        padding: 1.6rem;
        border: none;
        border-radius: 1rem;
        margin-top: 2rem;

        font-size: 1.6rem;
        color: ${({theme}) => theme.COLORS.BACKGROUND_900};
    }
`;