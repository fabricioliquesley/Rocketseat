import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardContainer = styled.div`
  background: ${(props) => props.theme["base-profile"]};
  padding: 3.2rem;
  border-radius: 1rem;

  & > .header {
    display: flex;
    justify-content: space-between;
  }

  & > h2 {
    margin-top: 2rem;
    color: ${props => props.theme["base-title"]};
    font-size: 2.4rem;
    line-height: 130%;
  }

  & > .postDetails {
    display: flex;
    align-items: center;
    gap: 3.2rem;
    margin-top: .8rem;

    div {
      display: inherit;
      align-items: center;
      gap: .8rem;

      svg {
        width: 1.8rem;
        height: 1.8rem;
        color: ${props => props.theme["base-label"]};
      }

      span {
        color: ${props => props.theme["base-span"]};
        line-height: 160%;
      }
    }
  }
`;

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: .8rem;

  color: ${props => props.theme.blue};
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
`
