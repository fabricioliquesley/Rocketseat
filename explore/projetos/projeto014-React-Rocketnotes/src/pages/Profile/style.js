import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    > header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 14.4rem;
        background: ${({theme}) => theme.COLORS.BACKGROUND_900};
        padding: 4rem;

        svg {
            color: ${({theme}) => theme.COLORS.GRAY_100};
        }
    }
`;

export const ImageProfile = styled.div`
    position: relative;
    margin: -100px 0;

    > img {
        width: 18.6rem;
        height: 18.6rem;
        border-radius: 50%;
    }

    > div {
        position: absolute;
        display: grid;
        place-content: center;
        bottom: 5px;
        right: 5px;
        width: 4.8rem;
        height: 4.8rem;
        background: ${({theme}) => theme.COLORS.ORANGE};
        font-size: 2rem;
        border-radius: 50%;
        border: none;
        
        svg {
            color: ${({theme}) => theme.COLORS.BACKGROUND_800};
        }
        
        input {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    width: 100%;
    max-width: 34rem;
    margin-top: 160px;

    > fieldset {
        display: grid;
        gap: .8rem;
        border: none;
    }

    > button {
        margin: 0;
    }
`;