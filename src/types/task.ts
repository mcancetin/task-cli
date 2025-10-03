export type Task = {
  id?: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt?: Date;
  updatedAt?: Date;
};
