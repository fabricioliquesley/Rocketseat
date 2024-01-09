import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: fit-content;
    background: ${({ theme, $isNew }) => $isNew ? "transparent" : theme.COLORS.BACKGROUND_700};
    border: 2px dashed ${({ theme, $isNew }) => $isNew ? theme.COLORS.BEGE : "none"};
    border-radius: 1rem;
    padding: 0 1.6rem;
    
    &:has(input:focus){
        border: 2px dashed ${({ theme }) => theme.COLORS.WHITE};
    }
    
    > input {
        background: transparent;
        color: ${({ theme, $isNew }) => $isNew ? theme.COLORS.BEGE : theme.COLORS.WHITE};
        font-family: var(--Roboto);
        font-size: 1.6rem;
        font-weight: 400;
        padding: 1.6rem 0;
        border: none;
        outline: none;
    }

    > button {
        display: grid;
        place-items: center;
        background: transparent;
        border: none;

        svg {
            font-size: 2rem;
            color: ${({ theme }) => theme.COLORS.PINK};
        }
    }
`;