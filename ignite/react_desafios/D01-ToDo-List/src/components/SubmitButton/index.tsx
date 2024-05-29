import "./Submit.module.css"
import { CirclePlus } from "lucide-react";

export function SubmitButton() {
  return (
    <button type="submit">
      Criar
      <CirclePlus />
    </button>
  );
}
