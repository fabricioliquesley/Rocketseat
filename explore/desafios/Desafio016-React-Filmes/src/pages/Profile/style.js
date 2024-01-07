import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
`;

export const Header = styled.header`
    width: 100%;
    background: ${({theme}) => theme.COLORS.LIGHT_PINK};
    padding: 6.4rem 14.4rem;

    button {
        display: grid;
        place-content: center;
        background: transparent;
        border: none;

        > svg {
            color: ${({theme}) => theme.COLORS.GRAY_300};
            font-size: 2.5rem;
        }
    }
`;

export const Avatar = styled.div`
    width: 18.6rem;
    height: 18.6rem;
    border-radius: 50%;
    margin: -84px auto 0;
    position: relative;

    > img {
        width: 18.6rem;
        height: 18.6rem;
        border-radius: 50%;
        object-fit: cover;
    }

    > div {
        position: absolute;
        right: .7rem;
        bottom: .7rem;
        display: grid;
        place-items: center;
        width: 4.8rem;
        height: 4.8rem;
        background: ${({theme}) => theme.COLORS.PINK};
        border-radius: 50%;
        cursor: pointer;

        input {
            position: absolute;
            height: 100%;
            width: 100%;
            opacity: 0;
            cursor: pointer;
        } 

        svg {
            color: ${({theme}) => theme.COLORS.PURPLE_200};
            font-size: 2rem;
        }
    }
`;

export const Form = styled.form`
    display: grid;
    gap: 2.4rem;
    width: 100%;
    max-width: 34rem;
    margin: 6.4rem auto;

    > fieldset {
        display: grid;
        gap: 0.8rem;
        border: none;
    }
`;