import "./globals.css";
import styles from "./App.module.css";
import { Logo } from "./components/Logo";
import { Input } from "./components/Input";
import { SubmitButton } from "./components/SubmitButton";
import { Task } from "./components/Task";

function App() {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <form className={styles.formWrapper}>
        <Input placeholder="Adicione uma nova tarefa" />
        <SubmitButton />
      </form>
      <Task />
    </div>
  );
}

export default App;
