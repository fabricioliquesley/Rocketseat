import styled from "styled-components";

export const Container = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 0 13.6rem;

    > div {
        display: grid;
        gap: 4.8rem;

        > div {
            > h1 {
                color: ${({theme}) => theme.COLORS.ORANGE};
                font-size: 4.8rem;
                font-weight: 700;
            }

            > p {
                color: ${({theme}) => theme.COLORS.GRAY_100};
                font-size: 1.4rem;
                font-weight: 400;
            }
        }

        > h2 {
            color: ${({theme}) => theme.COLORS.WHITE};
            font-size: 2.4rem;
            font-weight: 500;
        }

        > fieldset {
            display: grid;
            gap: .8rem;
            border: none;
        }
    }

    > a {
        color: ${({theme}) => theme.COLORS.ORANGE};
        margin-top: 12.4rem;
    }
`;