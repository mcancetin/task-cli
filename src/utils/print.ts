import { Task } from "../types/task.ts";

export function printTasks(tasks: Task[]) {
  console.table(tasks.map((t) => ({
    ID: t.id ?? "-",
    Description: t.description,
    Status: t.status,
    Created: t.createdAt?.toLocaleString() ?? "-",
    Updated: t.updatedAt?.toLocaleString() ?? "-",
  })));
}
