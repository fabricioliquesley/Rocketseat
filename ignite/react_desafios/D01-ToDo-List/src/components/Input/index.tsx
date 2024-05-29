import { InputHTMLAttributes } from "react";
import "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export function Input({ placeholder, ...props }: InputProps) {
  return <input type="text" placeholder={placeholder} {...props} />;
}
