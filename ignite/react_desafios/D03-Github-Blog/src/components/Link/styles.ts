import styled from "styled-components";

export const LinkContainer = styled.a`
  display: flex;
  align-items: center;
  gap: .8rem;
  width: fit-content;
  border-bottom: 1px solid transparent;

  color: ${props => props.theme.blue};
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 160%;

  &:hover {
    border-bottom-color: ${props => props.theme.blue};
  }
`;