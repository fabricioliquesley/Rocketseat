import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* width: 100%; */
    gap: calc().5rem;
    padding: 1.5rem;
    border: 2PX dashed ${({ theme }) => theme.COLORS.GRAY_300};
    border-radius: 1rem;

    > input {
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        color: ${({ theme }) => theme.COLORS.GRAY_300};
        font-size: 1.6rem;
        font-weight: 400;
    }

    > button {
        background: transparent;
        font-size: 2rem;
        color: ${({ theme }) => theme.COLORS.ORANGE};
        border: none;
    }

    &:has(input:focus) {
        border: 2PX dashed ${({ theme }) => theme.COLORS.WHITE};
    }
`;