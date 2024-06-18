import { InputHTMLAttributes } from "react";
import { InputContainer, InputElement } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  variant?: "optional" | false;
}

export function Input({ placeholder, variant, ...res }: InputProps) {
  return (
    <InputContainer>
      <InputElement placeholder={placeholder} {...res} />
      {variant ? <p className="optional">opcional</p> : null}
    </InputContainer>
  );
}
