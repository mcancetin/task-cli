import { getTasks, writeTasks } from "../utils/file.ts";
import { Task } from "../types/task.ts";

export async function run(
  id?: string | number,
  progress?: "in-progress" | "done",
) {
  if (!id) {
    console.log("Please provide a task ID.");
    return;
  }

  if (!progress) {
    console.log("Progress type not specified.");
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
    status: progress,
    updatedAt: new Date(),
  };

  const newTasks = tasks.map((t) => (t.id === taskId ? updatedTask : t));
  await writeTasks(newTasks);

  console.log(`Task status updated to '${progress}'.`);
}
