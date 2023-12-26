import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-area: header;
    padding: 1.6rem 4.5rem;
    border-bottom: 1px solid ${({theme}) => theme.COLORS.BACKGROUND_700};

    > a {
        color: ${({theme}) => theme.COLORS.GRAY_100};
        font-size: 3.6rem;
        cursor: pointer;

        &:hover {
            opacity: 0.6;
        }
    }
`;