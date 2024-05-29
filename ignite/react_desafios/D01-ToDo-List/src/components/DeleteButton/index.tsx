import styles from "./Delete.module.css"
import { Trash2 } from "lucide-react";

export function DeleteButton() {
  return (
    <button className={styles.deleteButton}>
      <Trash2 />
    </button>
  );
}
