import { CheckBox } from "../CheckBox";
import { DeleteButton } from "../DeleteButton";
import styles from "./Task.module.css";

export function Task() {
  return (
    <div className={styles.wrapper}>
      <CheckBox />
      <p>
        Integer urna interdum massa libero auctor neque turpis turpis semper.
        Duis vel sed fames integer. Integer urna interdum massa libero auctor
        neque turpis turpis semper. Duis vel sed fames integer.
      </p>
      <DeleteButton />
    </div>
  );
}
