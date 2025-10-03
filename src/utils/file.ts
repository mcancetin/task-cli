import { Task } from "../types/task.ts";

export async function getTasks(): Promise<Task[]> {
  try {
    const content = await Deno.readTextFile("tasks.json");
    const tasks: Task[] = JSON.parse(content).map((t: Task) => ({
      ...t,
      createdAt: t.createdAt ? new Date(t.createdAt) : undefined,
      updatedAt: t.updatedAt ? new Date(t.updatedAt) : undefined,
    }));
    return tasks;
  } catch {
    return [];
  }
}

export async function writeTasks(tasks: Task[]): Promise<void> {
  await Deno.writeTextFile("tasks.json", JSON.stringify(tasks, null, 2));
}

export async function checkJsonExists(): Promise<boolean> {
  try {
    await Deno.lstat("tasks.json");
    return true;
  } catch (_err) {
    return false;
  }
}
