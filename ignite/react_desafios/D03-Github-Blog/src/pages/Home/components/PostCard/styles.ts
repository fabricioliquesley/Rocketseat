import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-height: 26rem;
  background: ${(props) => props.theme["base-post"]};
  padding: 3.2rem;
  border: 2px solid ${(props) => props.theme["base-post"]};
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme["base-label"]};
  }

  & > header {
    display: flex;
    justify-content: space-between;

    > h3 {
      max-width: 28rem;
      color: ${(props) => props.theme["base-title"]};
      font-size: 2rem;
      font-weight: 700;
      line-height: 160%;
    }

    > span {
      min-width: fit-content;
    }
  }

  & > p {
    color: ${(props) => props.theme["base-text"]};
    line-height: 160%;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden; 
  }
`;
