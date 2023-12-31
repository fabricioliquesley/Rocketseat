import { styled } from "styled-components";

export const Container = styled.form`
    display: grid;
    place-content: center;
    gap: 4.8rem;
    padding: 6rem;

    > h2 {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-family: var(--Roboto-Slab);
        font-size: 2.4rem;
        font-weight: 500;
    }

    > .inputContainer {
        display: flex;
        flex-direction: column;
        gap: 2.4rem;

        fieldset {
            display: inherit;
            flex-direction: column;
            gap: 0.8rem;
            border: none;
        }
    }

    > a {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        color: ${({theme}) => theme.COLORS.PINK};
        font-family: var(--Roboto-Slab);
        font-size: 1.6rem;
        font-weight: 400;
        margin: 0 auto;
    }
`;

export const Title = styled.div`
    > h1 {
        color: ${({theme}) => theme.COLORS.PINK};
        font-family: var(--Roboto-Slab);
        font-size: 4.8rem;
        font-weight: 700;
    }

    > span {
        color: ${({theme}) => theme.COLORS.GRAY_100};
        font-family: var(--Roboto-Slab);
        font-size: 1.4rem;
        font-weight: 400;
    }
`;