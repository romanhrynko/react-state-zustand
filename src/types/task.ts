export type Assignee = "roman" | "olena" | "dmytro" | "sofiia";

export const TASK_STATUSES = {
  Todo: "todo",
  InProgress: "in-progress",
  Done: "done",
} as const;

export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES];

export const PRIORITIES = {
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;

export type Priority = (typeof PRIORITIES)[keyof typeof PRIORITIES];

export type Task = {
  id: string;
  title: string;
  assignee: Assignee;
  status: TaskStatus;
  priority: Priority;
  /** hours, 1..16 */
  estimate: number;
};

export const ASSIGNEES: Assignee[] = ["roman", "olena", "dmytro", "sofiia"];
