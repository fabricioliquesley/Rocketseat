import { ButtonHTMLAttributes } from "react";
import styles from "./Delete.module.css"
import { Trash2 } from "lucide-react";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function DeleteButton({...props}: DeleteButtonProps) {
  return (
    <button className={styles.deleteButton} {...props}>
      <Trash2 />
    </button>
  );
}
