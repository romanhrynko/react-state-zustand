import { create } from "zustand";
import type { SortBy, SortOrder } from "../types/sort";
import type { Assignee, TaskStatus } from "../types/task";

type FilterStore = {
  search: string;
  status: TaskStatus | "all";
  assignee: Assignee | "all";
  sortBy: SortBy;
  sortOrder: SortOrder;
  setSearch: (search: string) => void;
  setStatus: (status: TaskStatus | "all") => void;
  setAssignee: (assignee: Assignee | "all") => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  search: "",
  status: "all",
  assignee: "all",
  sortBy: "title",
  sortOrder: "asc",
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setAssignee: (assignee) => set({ assignee }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
}));
