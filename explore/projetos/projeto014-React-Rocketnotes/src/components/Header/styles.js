import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Container = styled.header`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    height: 100%;
    grid-area: header;
    padding: 1.6rem 4.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};
`;

export const Profile = styled(Link)`
    display: flex;
    align-items: center;
    gap: 1rem;

    > img {
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
        object-fit: cover;
    }

    > div {
        span {
            color: ${({ theme }) => theme.COLORS.GRAY_100};
            font-size: 1.4rem;
            font-weight: 400;
        }

        strong {
            display: block;
            color: ${({ theme }) => theme.COLORS.WHITE};
            font-size: 1.8rem;
            font-weight: 700;
        }
    }
`;

export const Logaut = styled.button`
    display: flex;
    cursor: pointer;
    border: none;
    background: transparent;
    cursor: pointer;

    > svg {
        color: ${({ theme }) => theme.COLORS.GRAY_100};
        font-size: 3.6rem;

        &:hover {
            opacity: 0.6;
        }
    }
`;