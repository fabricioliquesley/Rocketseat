import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

const baseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  padding: 0 0.5rem;

  color: ${(props) => props.theme["gray-100"]};
  font-weight: bold;
  font-size: 1.125rem;

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["green-500"]};
  }
`;

export const TaskInput = styled(baseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(baseInput)`
  width: 4rem;
`;