import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    width: 100%;
    padding: 2.4rem 6rem;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.PURPLE_100};
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: .9rem;

    > div {
        display: flex;
        flex-direction: column;
        align-items: end;
        width: max-content;

        > button {
            font-family: var(--Roboto-Slab);
            background: transparent;
            color: ${({ theme }) => theme.COLORS.BEGE};
            font-size: 1.4rem;
            font-weight: 400;
            border: none;
        }
    }
`;

export const Username = styled(Link)`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: var(--Roboto-Slab);
    font-size: 1.4rem;
    font-weight: 700;
`;

export const Avatar = styled(Link)`
    > img {
        width: 6.4rem;
        height: 6.4rem;
        border-radius: 50%;
    }
`;