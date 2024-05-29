import styles from "./Logo.module.css"

export function Logo() {
  return (
    <div className={styles.wrapper}>
      <img src="/logo.svg" alt="Rocket" />
      <h2>to<b>do</b></h2>
    </div>
  )
}