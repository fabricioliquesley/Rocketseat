import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
    max-width: 63rem;
    background: ${({ theme }) => theme.COLORS.BACKGROUND_700};
    color: ${({ theme }) => theme.COLORS.BEGE};
    padding: 1.9rem 2.4rem;
    border-radius: 1rem;

    > input {
        width: 100%;
        background: transparent;
        color: ${({ theme }) => theme.COLORS.BEGE};
        font-family: var(--Roboto-Slab);
        font-size: 1.6rem;
        font-weight: 400;
        border: none;
        outline: none;

        &:placeholder {
            font-family: var(--Roboto-Slab);
            font-size: 1.6rem;
            font-weight: 400;
        }
    }

    &:has(input:focus){
        outline: 1px solid white;
    }
`;