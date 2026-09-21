import { create } from "zustand";
import {
  type Priority,
  type Task,
  TASK_STATUSES,
  type TaskStatus,
} from "../types/task";
import { seedTasks } from "../data/seedTasks";

type TaskStore = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "status">) => void;
  renameTask: (taskId: string, title: string) => void;
  toggleStatus: (taskId: string) => void;
  setPriority: (taskId: string, priority: Priority) => void;
  removeTask: (taskId: string) => void;
  clearDone: () => void;
};

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  [TASK_STATUSES.Todo]: TASK_STATUSES.InProgress,
  [TASK_STATUSES.InProgress]: TASK_STATUSES.Done,
  [TASK_STATUSES.Done]: TASK_STATUSES.Todo,
};

export const useTaskStore = create<TaskStore>()((set) => ({
  tasks: seedTasks,
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...task, id: crypto.randomUUID(), status: TASK_STATUSES.Todo },
      ],
    })),
  renameTask: (taskId, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, title } : task,
      ),
    })),
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  setPriority: (taskId, priority) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, priority } : task,
      ),
    })),
  toggleStatus: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: NEXT_STATUS[task.status],
            }
          : task,
      ),
    })),
  clearDone: () =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.status !== TASK_STATUSES.Done),
    })),
}));
