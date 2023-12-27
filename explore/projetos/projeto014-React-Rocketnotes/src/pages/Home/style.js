import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    width: 100%;
    height: 100vh;
    grid-template-rows: max-content 1fr;
    grid-template-columns: max-content 1fr;
    grid-template-areas: 
        "menu header"
        "menu content";

    > header {
        grid-area: header;
    }
`;

export const Menu = styled.menu`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    grid-area: menu;
    background: ${({theme}) => theme.COLORS.BACKGROUND_900};

    > div > h1 {
        min-height: 10.3rem;
        border-bottom: 1px solid ${({theme}) => theme.COLORS.BACKGROUND_700};
        color: ${({theme}) => theme.COLORS.ORANGE};
        padding: 2.97rem 3rem;
    }

    div > nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.4rem;
        margin-top: 6.4rem;

        button {
            align-self: center;
        }
    }

    > button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .8rem;
        background: ${({ theme }) => theme.COLORS.ORANGE};
        width: 100%;
        padding: 2.7rem 0;
        color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        font-size: 2rem;
        font-weight: 400;
        border: none;
    }
`;

export const Main = styled.main`
    grid-area: content;
    padding: 6.4rem 4.5rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
        background: ${({theme}) => theme.COLORS.BACKGROUND_800};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.COLORS.BACKGROUND_900};
    }

    > section {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
    }
`;