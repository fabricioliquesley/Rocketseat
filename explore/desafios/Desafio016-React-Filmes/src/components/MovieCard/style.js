import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    background: ${({theme}) => theme.COLORS.LIGHT_PINK};
    border-radius: 1.6rem;
    padding: 3.2rem;
    cursor: pointer;
    
    > div {
        
        h2 {
            color: ${({theme}) => theme.COLORS.WHITE};
            font-family: var(--Roboto-Slab);
            font-size: 2.4rem;
            font-weight: 700;
            margin-bottom: .8rem;
        }
    }
    
    > p {
        color: ${({theme}) => theme.COLORS.GRAY_300};
        font-family: var(--Roboto);
        font-size: 1.6rem;
        font-weight: 400;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        gap: .8rem;
    }
`;