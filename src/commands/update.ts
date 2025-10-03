import { getTasks, writeTasks } from "../utils/file.ts";
import { Task } from "../types/task.ts";

export async function run(id?: string | number, newDescription?: string) {
  if (!id) {
    console.log("Please provide a task ID.");
    return;
  }

  if (!newDescription) {
    console.log("Please provide a new task description.");
    return;
  }

  const tasks = await getTasks();
  const taskId = Number(id);
  const taskToUpdate = tasks.find((t) => t.id === taskId);

  if (!taskToUpdate) {
    console.log("Task to update not found.");
    return;
  }

  const updatedTask: Task = {
    ...taskToUpdate,
    description: newDescription,
    updatedAt: new Date(),
  };

  const newTasks = tasks.map((t) => (t.id === taskId ? updatedTask : t));
  await writeTasks(newTasks);

  console.log("Task updated successfully.");
}
