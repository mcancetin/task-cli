# Task CLI

A modern, modular command-line task management application built with Deno and TypeScript. This CLI tool provides a clean architecture with full English language support for managing tasks with persistent JSON storage.

**Source**: [Task Tracker Project - roadmap.sh](https://roadmap.sh/projects/task-tracker)

## ✨ Features

- ✅ **Create Tasks**: Add new tasks with automatic ID assignment and timestamps
- 📝 **Update Tasks**: Modify task descriptions with automatic update tracking
- 🔄 **Status Management**: Mark tasks as todo, in-progress, or done
- 📋 **List & Filter**: View all tasks or filter by specific status
- 🗑️ **Delete Tasks**: Remove tasks with confirmation feedback
- 💾 **Persistent Storage**: JSON-based data persistence
- 📊 **Clean Output**: Formatted table display with timestamps
- 🌍 **English Interface**: Fully localized English user interface
- 🏗️ **Modular Architecture**: Well-organized codebase with command pattern

## 📋 Requirements

- [Deno](https://deno.land/) v1.40+ runtime
- File system read/write permissions

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-cli
   ```

2. **Run the CLI using the modern interface**
   ```bash
   deno run --allow-read --allow-write src/cli.ts <command> [arguments]
   ```

### Basic Usage Examples

```bash
# Add a new task
deno run --allow-read --allow-write src/cli.ts add "Complete project documentation"

# List all tasks
deno run --allow-read --allow-write src/cli.ts list

# Mark a task as in-progress
deno run --allow-read --allow-write src/cli.ts mark-in-progress 1

# Update a task description
deno run --allow-read --allow-write src/cli.ts update 1 "Complete comprehensive project documentation"

# Mark a task as done
deno run --allow-read --allow-write src/cli.ts mark-done 1

# Delete a task
deno run --allow-read --allow-write src/cli.ts delete 1
```

## 📖 Commands Reference

### Available Commands

| Command | Description | Syntax | Example |
|---------|-------------|--------|---------|
| `add` | Create a new task | `add "<description>"` | `add "Review pull requests"` |
| `list` | Show tasks (all or filtered) | `list [status]` | `list`, `list todo`, `list done` |
| `update` | Modify task description | `update <id> "<description>"` | `update 1 "Updated description"` |
| `mark-in-progress` | Set task to in-progress | `mark-in-progress <id>` | `mark-in-progress 1` |
| `mark-done` | Set task to completed | `mark-done <id>` | `mark-done 1` |
| `delete` | Remove a task | `delete <id>` | `delete 1` |

### Command Details

#### Add Task
```bash
deno run --allow-read --allow-write src/cli.ts add "Your task description"
```
- **Output**: `Task added successfully (ID: <id>)`
- **Error**: `Please provide a task description.` (if no description provided)

#### List Tasks
```bash
# Show all tasks
deno run --allow-read --allow-write src/cli.ts list

# Filter by status
deno run --allow-read --allow-write src/cli.ts list todo
deno run --allow-read --allow-write src/cli.ts list in-progress
deno run --allow-read --allow-write src/cli.ts list done
```
- **Output**: Formatted table with ID, Description, Status, Created, and Updated columns
- **Error**: `No tasks found to display.` (if no tasks match criteria)

#### Update Task
```bash
deno run --allow-read --allow-write src/cli.ts update <task-id> "New description"
```
- **Output**: `Task updated successfully.`
- **Errors**: 
  - `Please provide a task ID.`
  - `Please provide a new task description.`
  - `Task to update not found.`

#### Mark Task Status
```bash
# Mark as in-progress
deno run --allow-read --allow-write src/cli.ts mark-in-progress <task-id>

# Mark as done
deno run --allow-read --allow-write src/cli.ts mark-done <task-id>
```
- **Output**: `Task status updated to '<status>'.`
- **Errors**:
  - `Please provide a task ID.`
  - `Progress type not specified.`
  - `Task to update not found.`

#### Delete Task
```bash
deno run --allow-read --allow-write src/cli.ts delete <task-id>
```
- **Output**: `Task deleted successfully.`
- **Error**: `Please provide a task ID.`

## 🏗️ Architecture

### Project Structure
```
src/
├── cli.ts              # Main CLI entry point with command routing
├── commands/           # Command implementations using command pattern
│   ├── add.ts          # Add new task functionality
│   ├── delete.ts       # Delete task functionality
│   ├── list.ts         # List and filter tasks functionality
│   ├── mark.ts         # Update task status functionality
│   └── update.ts       # Update task description functionality
├── types/
│   └── task.ts         # TypeScript type definitions
└── utils/
    ├── file.ts         # File I/O operations and JSON handling
    └── print.ts        # Output formatting utilities
```

### Core Components

#### 1. **Task Type Definition** (`src/types/task.ts`)
```typescript
export type Task = {
  id?: number;                              // Auto-generated unique identifier
  description: string;                      // Task description
  status: "todo" | "in-progress" | "done";  // Current status
  createdAt?: Date;                         // Creation timestamp
  updatedAt?: Date;                         // Last modification timestamp
};
```

#### 2. **Command Pattern Implementation** (`src/commands/`)
Each command is implemented as a separate module with a standardized `run()` function:

- **`add.ts`**: Creates tasks with auto-incrementing IDs and timestamps
- **`delete.ts`**: Removes tasks by ID with validation
- **`list.ts`**: Displays tasks with optional status filtering
- **`mark.ts`**: Updates task status with timestamp tracking
- **`update.ts`**: Modifies descriptions with timestamp updates

#### 3. **Utility Layer** (`src/utils/`)

**File Operations (`file.ts`)**:
- `getTasks()`: Reads and deserializes tasks from JSON
- `writeTasks()`: Serializes and writes tasks to JSON
- `checkJsonExists()`: Validates data file existence

**Output Formatting (`print.ts`)**:
- `printTasks()`: Creates formatted table output with English headers

#### 4. **CLI Router** (`src/cli.ts`)
- Command validation and routing
- Argument parsing with `@std/cli`
- Error handling for invalid commands

## 💾 Data Storage

### Storage Location
Tasks are stored in `tasks.json` relative to the project directory.

### JSON Structure
```json
[
  {
    "id": 1,
    "description": "Complete project documentation",
    "status": "done",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T14:45:00.000Z"
  },
  {
    "id": 2,
    "description": "Review code changes",
    "status": "in-progress",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T13:20:00.000Z"
  }
]
```

### Data Features
- **Auto-incrementing IDs**: Sequential numbering starting from 1
- **Timestamp Management**: Automatic creation and update tracking
- **Date Serialization**: Proper JSON date handling with deserialization
- **Error Recovery**: Graceful handling of missing or corrupted data

## 🔧 Development

### Development Setup
```bash
# Install Deno (if not already installed)
curl -fsSL https://deno.land/install.sh | sh

# Run with development permissions
deno run --allow-read --allow-write --watch src/cli.ts <command>
```

### Development Task (from deno.json)
```bash
# Start with file watching
deno task dev
```

### Compilation
```bash
# Compile to executable binary
deno compile --allow-read --allow-write -o ../dist/task-cli src/cli.ts
```

### Permissions Required
- `--allow-read`: Reading task data from JSON file
- `--allow-write`: Writing task data to JSON file

### Code Quality Standards
- **TypeScript Strict Mode**: Full type safety
- **Modular Design**: Clear separation of concerns
- **Error Handling**: Comprehensive validation and user feedback
- **Consistent API**: Uniform command interface pattern
- **English Localization**: All user-facing messages in English

## 📦 Dependencies

### Runtime Dependencies
- **`@std/cli`** `^1.0.22`: Command-line argument parsing
- **`@std/assert`** `^1.0.0`: Testing utilities

### Built-in Deno APIs
- **File System**: `Deno.readTextFile()`, `Deno.writeTextFile()`
- **JSON**: `JSON.parse()`, `JSON.stringify()`
- **Console**: `console.log()`, `console.table()`
- **Date**: Date constructor and methods

## 🚦 Error Handling

The application provides comprehensive error handling with clear English messages:

| Error Type | Message | Trigger |
|------------|---------|---------|
| Missing Description | `Please provide a task description.` | Add command without description |
| Missing ID | `Please provide a task ID.` | Update/delete/mark without ID |
| Missing New Description | `Please provide a new task description.` | Update without new description |
| Task Not Found | `Task to update not found.` | Invalid task ID |
| Invalid Command | `Command not found. Please use one of the available commands.` | Unknown command |
| No Tasks | `No tasks found to display.` | Empty task list or filter |

## 🧪 Testing

### Manual Testing
```bash
# Test add functionality
deno run --allow-read --allow-write src/cli.ts add "Test task"

# Test list functionality
deno run --allow-read --allow-write src/cli.ts list

# Test status updates
deno run --allow-read --allow-write src/cli.ts mark-in-progress 1
deno run --allow-read --allow-write src/cli.ts mark-done 1

# Test update functionality
deno run --allow-read --allow-write src/cli.ts update 1 "Updated test task"

# Test delete functionality
deno run --allow-read --allow-write src/cli.ts delete 1
```

### Test Error Conditions
```bash
# Test missing arguments
deno run --allow-read --allow-write src/cli.ts add
deno run --allow-read --allow-write src/cli.ts update
deno run --allow-read --allow-write src/cli.ts delete

# Test invalid commands
deno run --allow-read --allow-write src/cli.ts invalid-command
```

---

**Built with ❤️ using Deno and TypeScript**