import TasksController, { TaskType } from "../../utils/Tasks";
import { CheckBox } from "../CheckBox";
import { DeleteButton } from "../DeleteButton";
import styles from "./Task.module.css";

interface TaskProps {
  task: TaskType;
  removeTask: () => void;
  changeTask: () => void;
}

export function Task({ task, removeTask, changeTask }: TaskProps) {
  function handleDeleteTask() {
    TasksController.deleteTask(task.id);
    removeTask();
  }

  function handleChangeStatus() {
    TasksController.changeStatusTask(task.id);
    changeTask();
  }

  function checkTaskStatus() {
    if (task.status == "completed") {
      return styles.completed;
    }

    return styles.toDo;
  }

  return (
    <div className={styles.wrapper}>
      <CheckBox onChange={handleChangeStatus} />
      <p className={checkTaskStatus()}>{task.content}</p>
      <DeleteButton onClick={handleDeleteTask} />
    </div>
  );
}
