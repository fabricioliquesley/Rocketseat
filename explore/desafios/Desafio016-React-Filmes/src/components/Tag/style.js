import { styled } from "styled-components";

export const Container = styled.li`
    width: fit-content;
    background: ${({theme}) => theme.COLORS.PURPLE_200};
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-family: var(--Roboto);
    font-size: 1.2rem;
    font-weight: 400;
    padding: .5rem 1.6rem;
    border-radius: .8rem;
`;