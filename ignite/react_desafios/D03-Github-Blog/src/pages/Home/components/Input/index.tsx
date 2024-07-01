import { InputHTMLAttributes } from "react";
import { InputContainer } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export function Input({ placeholder, ...rest }: InputProps) {
  return <InputContainer placeholder={placeholder} {...rest} />;
}
