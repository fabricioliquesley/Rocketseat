import { styled } from "styled-components";

export const Container = styled.button`
    width: 100%;
    background: ${({theme, $alternate}) => $alternate ? theme.COLORS.BACKGROUND_900 : theme.COLORS.PINK};
    color: ${({theme, $alternate}) => $alternate ? theme.COLORS.PINK : theme.COLORS.PURPLE_200};
    font-family: var(--Roboto-Slab);
    font-size: 1.6rem;
    font-weight: 500;
    border: none;
    border-radius: 1rem;
    padding: 1.4rem;
`;