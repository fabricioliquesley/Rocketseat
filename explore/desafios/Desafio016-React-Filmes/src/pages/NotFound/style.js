import { styled } from "styled-components";

export const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    height: 100vh;
    font-family: var(--Roboto);

    > h1 {
        font-size: 3.5rem;

        span {
            color: ${({theme}) => theme.COLORS.PINK};
        }
    }

    > p {
        font-size: 1.8rem;

        a {
            color: ${({theme}) => theme.COLORS.PINK};
            margin-left: 5px;
        }
    }
`;