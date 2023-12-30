import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
display: block;
    width: max-content;
    color: #FF859B;
    font-family: var(--Roboto-Slab);
    
    > h1 {
        font-size: 2.4rem;
        font-weight: 700;
    }
    
    > div {
        display: flex;
        align-items: center;
        gap: .8rem;

        p {
            font-size: 1.6rem;
            font-weight: 400;
        }
    }
`;