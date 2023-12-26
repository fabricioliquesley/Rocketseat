import styled from "styled-components";

export const Container = styled.button`
    align-self: flex-end;
    background: transparent;
    color: ${({theme}) => theme.COLORS.ORANGE};
    text-align: center;
    font-size: 1.6rem;
    font-weight: 400;
    border: none;
`;