import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-rows: max-content auto;
    grid-template-areas:
    "header"
    "content";
    width: 100%;
    height: 100vh;
`;

export const Links = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    > li a{
        color: ${({ theme }) => theme.COLORS.WHITE};
        font-size: 1.6rem;
        font-weight: 400;
    }
`;

export const Tags = styled.ul`
    display: flex;
    gap: .6rem;
    flex-wrap: wrap;
`;