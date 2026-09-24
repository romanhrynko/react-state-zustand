import { filterTasks } from "./taskFilters";
import type { TaskFilters } from "./taskFilters";
import { TASK_STATUSES } from "../types/task";
import type { Task, TaskStatus } from "../types/task";

export type TaskStats = {
  countByStatus: Record<TaskStatus, number>;
  filteredEstimate: number;
  filteredCount: number;
  donePercent: number;
};

export const getTaskStats = (
  tasks: Task[],
  filters: TaskFilters,
): TaskStats => {
  const countByStatus = {
    [TASK_STATUSES.Todo]: 0,
    [TASK_STATUSES.InProgress]: 0,
    [TASK_STATUSES.Done]: 0,
  } as Record<TaskStatus, number>;

  for (const task of tasks) {
    countByStatus[task.status] += 1;
  }

  const filtered = filterTasks(tasks, filters);

  return {
    countByStatus,
    filteredCount: filtered.length,
    filteredEstimate: filtered.reduce((sum, task) => sum + task.estimate, 0),
    donePercent:
      tasks.length === 0
        ? 0
        : Math.round((countByStatus[TASK_STATUSES.Done] / tasks.length) * 100),
  };
};
