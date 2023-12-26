import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    > img {
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
    }

    > span {
        color: ${({theme}) => theme.COLORS.GRAY_100};
        font-size: 1.4rem;
        font-weight: 400;
    }

    > div > strong {
        display: block;
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 1.8rem;
        font-weight: 700;
    }
`;