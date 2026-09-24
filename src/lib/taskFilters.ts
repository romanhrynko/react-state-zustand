import type { SortOrder } from "../types/sort";
import type { Assignee, Priority, Task, TaskStatus } from "../types/task";

export type TaskFilters = {
  search: string;
  status: TaskStatus | "all";
  assignee: Assignee | "all";
};

export type TaskSort = {
  sortBy: "priority" | "estimate" | "title";
  sortOrder: SortOrder;
};

// Priorities are not comparable on their own, so give them an explicit rank.
const PRIORITY_RANK: Record<Priority, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

export const filterTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  const search = filters.search.trim().toLowerCase();

  return tasks.filter((task) => {
    if (filters.status !== "all" && task.status !== filters.status) {
      return false;
    }

    if (filters.assignee !== "all" && task.assignee !== filters.assignee) {
      return false;
    }

    return search === "" || task.title.toLowerCase().includes(search);
  });
};

export const sortTasks = (tasks: Task[], sort: TaskSort): Task[] => {
  const direction = sort.sortOrder === "asc" ? 1 : -1;

  // sort() mutates, so copy first: the array here comes from the store.
  return [...tasks].sort((a, b) => {
    switch (sort.sortBy) {
      case "priority":
        return (PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]) * direction;
      case "estimate":
        return (a.estimate - b.estimate) * direction;
      case "title":
        return a.title.localeCompare(b.title) * direction;
    }
  });
};
