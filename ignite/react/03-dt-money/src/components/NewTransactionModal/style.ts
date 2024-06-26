import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  min-width: 32rem;
  background: ${(props) => props.theme["gray-800"]};
  border-radius: 6px;
  padding: 2.5rem 3rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin-top: 2rem;

    input {
      background: ${(props) => props.theme["gray-900"]};
      padding: 1rem;
      border: 0;
      border-radius: 6px;

      color: ${(props) => props.theme["gray-300"]};

      &::placeholder {
        color: ${(props) => props.theme["green-500"]};
      }
    }

    button[type="submit"] {
      background: ${(props) => props.theme["green-500"]};
      height: 58px;
      border: 0;
      border-radius: 6px;
      padding: 0 1.25rem;
      margin-top: 1.5rem;

      color: ${(props) => props.theme.white};
      font-weight: bold;

      &:hover {
        background: ${(props) => props.theme["green-700"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`;

interface TypeButtonProps {
  variant: "income" | "outcome";
}

export const TransactionTypeButton = styled(RadioGroup.Item)<TypeButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${(props) => props.theme["gray-700"]};
  padding: 1rem;
  border: 0;
  border-radius: 6px;

  color: ${(props) => props.theme["gray-300"]};

  svg {
    color: ${(props) =>
      props.variant === "income"
        ? props.theme["green-300"]
        : props.theme["red-300"]};
  }

  &[data-state="checked"] {
    &,
    svg {
      color: ${(props) => props.theme.white};
    }

    background: ${(props) =>
      props.variant === "income"
        ? props.theme["green-300"]
        : props.theme["red-300"]};
  }

  &[data-state="unchecked"]:hover {
    background: ${(props) => props.theme["gray-600"]};
    transition: background-color 0.2s;
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: 0;

  color: ${(props) => props.theme["gray-500"]};
  line-height: 0;
`;
