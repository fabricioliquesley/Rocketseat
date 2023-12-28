import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: ${({theme, isNew}) => isNew ? "transparent" : theme.COLORS.BACKGROUND_900};
    padding: 2rem;
    border: 2PX dashed ${({ theme, isNew }) => isNew ? theme.COLORS.GRAY_300: "none"};
    border-radius: 1rem;

    > input {
        width: 100%;
        background: transparent;
        color: ${({theme}) => theme.COLORS.WHITE};
        border: none;
        outline: none;
    }

    > button {
        display: grid;
        place-content: center;
        background: transparent;
        border: none;
        color: ${({theme, isNew}) => isNew ? theme.COLORS.ORANGE : theme.COLORS.RED};
        font-size: 2.2rem;
    }

    &:has(input:focus) {
        border: 2PX dashed ${({ theme, isNew }) => isNew ? theme.COLORS.WHITE : "none"};
    }
`;