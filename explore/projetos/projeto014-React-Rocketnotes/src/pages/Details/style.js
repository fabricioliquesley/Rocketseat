import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-rows: max-content auto;
    grid-template-areas:
    "header"
    "content";
    width: 100%;
    height: 100vh;

    > main {
        padding: 6.4rem 0;
        overflow-y: auto;
    }

    > main::-webkit-scrollbar {
        width: 5px;
        background: ${({theme}) => theme.COLORS.BACKGROUND_800};
    }

    > main::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.COLORS.BACKGROUND_900};
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: content;
    max-width: 55rem;
    width: 100%;
    margin: 0 auto;

    > section + section {
        margin: 2.8rem 0 0 0;
    }

    > button:last-child {
        margin-top: 13rem;
    }
`;

export const Note = styled.div`
    > h2 {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 3.6rem;
        font-weight: 500;
        margin-top: 6.4rem;
    }

    > p {
        color: ${({theme}) => theme.COLORS.WHITE};
        text-align: justify;
        font-size: 1.6rem;
        font-weight: 400;
        margin-top: 1.6rem;
    }
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