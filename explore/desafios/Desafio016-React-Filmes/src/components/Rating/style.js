import {styled} from "styled-components";

export const Container = styled.ul`
    display: flex;
    align-items: center;
    gap: .5rem;
    color: ${({theme}) => theme.COLORS.PINK}
`;