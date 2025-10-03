import { getTasks } from "../utils/file.ts";
import { printTasks } from "../utils/print.ts";

export async function run(progressFilter?: string | number) {
  const tasks = await getTasks();
  const filteredTasks = progressFilter
    ? tasks.filter((t) => t.status === progressFilter)
    : tasks;

  if (filteredTasks.length === 0) {
    console.log("No tasks found to display.");
    return;
  }

  printTasks(filteredTasks);
}
