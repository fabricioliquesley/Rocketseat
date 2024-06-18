import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  & > .optional {
    position: absolute;
    right: 1.2rem;
    color: ${(props) => props.theme["base-label"]};
    font-size: 1.2rem;
    font-style: italic;
    line-height: 130%;
  }
`;

export const InputElement = styled.input`
  width: 100%;
  background: ${(props) => props.theme["base-input"]};
  border: 1px solid ${(props) => props.theme["base-button"]};
  border-radius: .6rem;
  padding: 1.2rem;
  outline: none;

  color: ${(props) => props.theme["base-label"]};
  font-size: 1.4rem;
  line-height: 130%;

  &:focus {
    border-color: ${(props) => props.theme["yellow-dark"]};
  }

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  .box2 {
    grid-column-start: 2;
    grid-column-end: 3;
  }
`;
