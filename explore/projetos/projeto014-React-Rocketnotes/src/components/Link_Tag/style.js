import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: ${({theme}) => theme.COLORS.BACKGROUND_900};
    padding: 2rem;
    border-radius: 1rem;
    
    > a {
        color: ${({theme}) => theme.COLORS.WHITE};
    }

    > button {
        display: grid;
        place-content: center;
        background: transparent;
        border: none;
        color: ${({theme}) => theme.COLORS.RED};
        font-size: 2.2rem;
    }
`;