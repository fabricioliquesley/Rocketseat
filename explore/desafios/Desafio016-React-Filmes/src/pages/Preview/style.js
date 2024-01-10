import { styled } from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-rows: max-content 1fr;
    grid-template-areas: 
        "header"
        "content";
        width: 100%;
        height: 100vh;
        `;

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    grid-area: content;
    gap: 4rem;
    width: 100%;
    max-width: 100rem;
    margin: 0 auto;
    overflow-y: auto;
    padding: 4rem 6rem;

    &::-webkit-scrollbar {
            width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.COLORS.PINK};
        border-radius: 1rem;
    }

    > div {
        display: grid;
        gap: 2.4rem;
    }

    > article {
        position: relative;

        p {
            color: ${({theme}) => theme.COLORS.WHITE};
            text-align: justify;
            font-family: var(--Roboto-Slab);
            font-size: 1.6rem;
            font-weight: 400;

            border: ${({theme, $editMode}) => $editMode ? "1px solid" + theme.COLORS.PINK : "none"};
            border-radius: 1rem;
            padding: ${({$editMode}) => $editMode ? "2rem" : "0"};

            &::before {
                display: ${({$editMode}) => $editMode ? "block" : "none"};
                position: absolute;
                top: -11px;
                content: 'Clique para editar';
                background: ${({theme}) => theme.COLORS.BACKGROUND_800};
                color: ${({theme}) => theme.COLORS.PINK};
                padding: 0 .7rem;
            }
        }
    }
`;

export const Controls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    > div {
        display: flex;
        align-items: center;
        gap: 1.6rem;

        > button {
            display: grid;
            place-content: center;
            background: transparent;
            border: none;
            font-size: 2rem;
            color: ${({theme}) => theme.COLORS.GRAY_300};

            &:first-child:hover {
                color: ${({theme}) => theme.COLORS.PINK}
            }

            &:last-child:hover {
                color: red;
            }
        }
    }
`;

export const MovieInfo = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    > h1 {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-family: var(--Roboto-Slab);
        font-size: 3.6rem;
        font-weight: 500;

        border: ${({theme, $editMode}) => $editMode ? "1px solid" + theme.COLORS.PINK : "none"};
        border-radius: 1rem;
        padding: ${({$editMode}) => $editMode ? "2rem" : "0"};

        &::before {
            display: ${({$editMode}) => $editMode ? "block" : "none"};
            position: absolute;
            top: -11px;
            content: 'Clique para editar';
            background: ${({theme}) => theme.COLORS.BACKGROUND_800};
            padding: 0 .7rem;
            color: ${({theme}) => theme.COLORS.PINK};
            font-size: 1.6rem;
            font-weight: normal;
        }
    }
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    > img {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
    }

    > p, 
    > div span {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-family: var(--Roboto);
        font-size: 1.6rem;
        font-weight: 400;
    }

    > div {
        display: flex;
        align-items: center;
        gap: 0.8rem;

        svg {
            color: ${({theme}) => theme.COLORS.PINK};
            font-size: 1.6rem;
        }
    }
`;

export const TagsContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
`;