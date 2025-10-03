import { parseArgs } from "@std/cli";
import * as addCommand from "./commands/add.ts";
import * as updateCommand from "./commands/update.ts";
import * as deleteCommand from "./commands/delete.ts";
import * as markCommand from "./commands/mark.ts";
import * as listCommand from "./commands/list.ts";

const commands = [
  "add",
  "update",
  "delete",
  "mark-in-progress",
  "mark-done",
  "list",
];
const { _: args } = parseArgs(Deno.args);
const [command, arg1, arg2] = args;

if (!commands.includes(String(command))) {
  console.log("Command not found. Please use one of the available commands.");
  Deno.exit();
}

switch (command) {
  case "add":
    await addCommand.run(String(arg1));
    break;
  case "update":
    await updateCommand.run(arg1, String(arg2));
    break;
  case "delete":
    await deleteCommand.run(arg1);
    break;
  case "mark-in-progress":
    await markCommand.run(arg1, "in-progress");
    break;
  case "mark-done":
    await markCommand.run(arg1, "done");
    break;
  case "list":
    await listCommand.run(arg1);
    break;
}
