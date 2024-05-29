import styles from "./Checkbox.module.css";

export function CheckBox() {
  return (
    <div className={styles.check_box_wrapper}>
      <input type="checkbox" className={styles.check_box} />
      <div className={styles.check_box_label}></div>
    </div>
  );
}
