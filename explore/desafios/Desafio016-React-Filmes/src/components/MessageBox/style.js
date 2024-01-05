import {styled} from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 2rem;
    width: fit-content;
    max-width: 40rem;
    background: ${({theme}) => theme.COLORS.WHITE};
    padding: 1rem;
    border-radius: 1rem;
    position: absolute;
    top: 2rem;
    right: 2rem;
    
    > div {

        h2 {
            color: ${({theme, $type}) => (
                $type === "error" ? theme.ALERT.RED : theme.ALERT.GREEN
            )};
            font-family: var(--Roboto);
        }

        p {
            color: ${({theme}) => theme.COLORS.BACKGROUND_800};
            font-family: var(--Roboto);
            margin-top: .5rem;
        }
    }

    &::before {
        position: absolute;
        left: 1rem;
        content: "";
        width: 1rem;
        height: 80%;
        background: ${({theme, $type}) => (
            $type === "error" ? theme.ALERT.RED : theme.ALERT.GREEN
            )};
        border-radius: 1rem;
    }

    > button {
        display: grid;
        place-content: center;
        align-self: flex-start;
        background: transparent;
        border: none;

        svg {
            font-size: 2.4rem;
        }
    }
`;

export const StatusBar = styled.div`

`;