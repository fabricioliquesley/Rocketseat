import styled from "styled-components";

export const CodeContainer = styled.div`
  background: ${props => props.theme["base-post"]};
  padding: 1.6rem;
  border-radius: .6rem;

  p {
    color: ${props => props.theme["base-title"]};
    line-height: 160%;
  }
`