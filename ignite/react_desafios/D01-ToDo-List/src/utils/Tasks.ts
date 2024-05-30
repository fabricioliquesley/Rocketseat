export type TaskType = {
  id: number;
  content: string;
  status: "completed" | "to_do";
};

interface ITasks {
  tasks: TaskType[];
  createTask: (content: string) => void;
  deleteTask: (id: number) => void;
  changeStatusTask: (id: number) => void;
}

class Task implements ITasks {
  tasks: TaskType[] = [];
  private nextId: number = this.tasks.length;

  createTask(content: string): void {
    const newTask: TaskType = {
      id: this.nextId++,
      content: content,
      status: "to_do",
    };

    this.tasks.push(newTask);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id;
    });
  }

  changeStatusTask(id: number): void {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (this.tasks[index].status == "completed") {
      this.tasks[index].status = "to_do";
    } else {
      this.tasks[index].status = "completed";
    }
  }
}

export default new Task();
