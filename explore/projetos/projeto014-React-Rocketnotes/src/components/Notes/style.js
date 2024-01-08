import styled from "styled-components";

export const Container = styled.div`
    background: ${({theme}) => theme.COLORS.BACKGROUND_700};
    padding: 1.6rem 2.2rem;
    border-radius: 1rem;
    cursor: pointer;

    > h2 {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 2.4rem;
        font-weight: 700;
        margin-bottom: 2.4rem;
    }

    > ul {
        display: flex;
        flex-wrap: wrap;
        gap: .6rem;
    }
`;