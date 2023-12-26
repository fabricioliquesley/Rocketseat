import styled from "styled-components";

export const Container = styled.input`
    width: 100%;
    background: ${({theme}) => theme.COLORS.BACKGROUND_900};
    color: ${({theme}) => theme.COLORS.GRAY_300};
    font-size: 1.4rem;
    font-weight: 400;

    padding: 2rem 1.6rem;
    border: none;
    border-radius: 1rem;
`;