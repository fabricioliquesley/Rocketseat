import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    background: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    padding: 2rem 1.6rem;
    border: none;
    border-radius: 1rem;
    
    > input {
        width: 100%;
        background: transparent;
        color: ${({ theme }) => theme.COLORS.GRAY_300};
        font-size: 1.4rem;
        font-weight: 400;
        border: none;
        outline: none;

        &:placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_300};
        }
    }

    > svg {
        color: ${({ theme }) => theme.COLORS.GRAY_300};
    }

    &:has(input:focus){
        outline: 1px solid white;
    }
`;