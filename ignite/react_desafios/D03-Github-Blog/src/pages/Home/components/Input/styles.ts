import styled from "styled-components";

export const InputContainer = styled.input`
  width: 100%;
  background: ${(props) => props.theme["base-input"]};
  border: 1px solid ${(props) => props.theme["base-border"]};
  border-radius: 0.6rem;
  padding: 1.2rem 1.6rem;
  outline: none;

  &,
  &::placeholder {
    color: ${(props) => props.theme["base-label"]};
    line-height: 160%;
  }

  &:focus {
    border-color: ${(props) => props.theme.blue};

    &,
    &::placeholder {
      color: ${(props) => props.theme["base-text"]};
    }
  }
`;
