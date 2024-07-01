import styled from "styled-components";

export const PostContainer = styled.main`
  max-width: 86.4rem;
  margin: -8.8rem auto 0;
`;

export const PostContent = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 4rem 3.2rem 5rem;

  & > p {
    color: ${(props) => props.theme["base-text"]};
    line-height: 160%;
  }

  & > a {
    color: ${props => props.theme["blue"]};
    line-height: 160%;
    text-decoration: underline;
  }
`;
