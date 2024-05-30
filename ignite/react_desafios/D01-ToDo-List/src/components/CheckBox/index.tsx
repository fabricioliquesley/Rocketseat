import { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function CheckBox({...props}: CheckboxProps) {
  return (
    <div className={styles.check_box_wrapper}>
      <input type="checkbox" className={styles.check_box} {...props}/>
      <div className={styles.check_box_label}></div>
    </div>
  );
}
