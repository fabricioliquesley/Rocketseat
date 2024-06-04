import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 74rem;
  height: calc(100vh - 10rem);
  background: ${(props) => props.theme["gray-800"]};
  margin: 5rem auto;
  padding: 2.5rem;
  border-radius: 8px;
`;
