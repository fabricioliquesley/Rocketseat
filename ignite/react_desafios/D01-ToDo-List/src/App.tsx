import "./globals.css";
import styles from "./App.module.css";
import { Logo } from "./components/Logo";
import { Input } from "./components/Input";
import { SubmitButton } from "./components/SubmitButton";
import { Task } from "./components/Task";
import TaskController from "../src/utils/Tasks";
import { useState, useReducer } from "react";

const forceUpdateReducer = (x: number) => x + 1;

function App() {
  const [tasks, setTasks] = useState(TaskController.tasks);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [, forceUpdate] = useReducer(forceUpdateReducer, 0);

  function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault();

    if (newTaskContent === "") return;

    TaskController.createTask(newTaskContent);
    setTasks(TaskController.tasks);
    setNewTaskContent("");
  }

  function handleNewTaskContentChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNewTaskContent(event.target.value);
  }

  function handleDeleteTask() {
    setTasks(TaskController.tasks);
  }

  function handleChangeStatusTask() {
    forceUpdate();
  }

  function getQuantityTasksCompleted() {
    if (tasks.length === 0) return "0";

    return `${String(
      tasks.filter((task) => task.status === "completed").length
    )} de ${tasks.length}`;
  }

  return (
    <div className={styles.wrapper}>
      <Logo />
      <form className={styles.formWrapper} onSubmit={handleSubmitForm}>
        <Input
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskContentChange}
          value={newTaskContent}
        />
        <SubmitButton />
      </form>
      <div className={styles.tasks_wrapper}>
        <div className={styles.tasks_wrapper_header}>
          <div>
            <span className={styles.created_tasks}>Tarefas criadas</span>
            <span className={styles.amount}>{tasks.length}</span>
          </div>
          <div>
            <span className={styles.ready_tasks}>Concluídas</span>
            <span className={styles.amount}>{getQuantityTasksCompleted()}</span>
          </div>
        </div>
        <div className={styles.tasks}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                removeTask={handleDeleteTask}
                changeTask={handleChangeStatusTask}
              />
            ))
          ) : (
            <div className={styles.empty_tasks}>
              <img src="/Clipboard.png" alt="" />
              <p>
                Você ainda não tem tarefas cadastradas <br />{" "}
                <b>Crie tarefas e organize seus itens a fazer</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
