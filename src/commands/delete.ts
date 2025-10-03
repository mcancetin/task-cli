import { getTasks, writeTasks } from "../utils/file.ts";

export async function run(id?: string | number) {
  if (!id) {
    console.log("Please provide a task ID.");
    return;
  }

  const tasks = await getTasks();
  const taskId = Number(id);
  const newTasks = tasks.filter((t) => t.id !== taskId);

  await writeTasks(newTasks);

  console.log("Task deleted successfully.");
}
