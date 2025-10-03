import { Task } from "../types/task.ts";
import { getTasks, writeTasks } from "../utils/file.ts";

export async function run(description?: string) {
  if (!description) {
    console.log("Please provide a task description.");
    return;
  }

  const tasks = await getTasks();
  const lastTask = tasks.at(-1);

  const newTask: Task = {
    description,
    status: "todo",
    id: lastTask?.id ? lastTask.id + 1 : 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  console.log(`Task added successfully (ID: ${newTask.id})`);
}
