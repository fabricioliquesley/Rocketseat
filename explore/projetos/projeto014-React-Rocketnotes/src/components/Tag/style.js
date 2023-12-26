import styled from "styled-components";

export const Container = styled.li`
    width: fit-content;
    background: ${({theme}) => theme.COLORS.ORANGE};
    border-radius: .5rem;
    padding: .5rem 1rem;

    > p {
        color: ${({theme}) => theme.COLORS.BACKGROUND_900};
        text-align: center;
        font-size: 1.2rem;
        font-weight: 400;
    }
`;