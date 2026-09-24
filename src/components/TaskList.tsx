import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useRenderCount } from "../hooks/useRenderCount";
import { filterTasks, sortTasks } from "../lib/taskFilters";
import { useFilterStore } from "../stores/filterStore";
import { useTaskStore } from "../stores/taskStore";
import { RenderBadge } from "./RenderBadge";
import { TaskRow } from "./TaskRow";

/**
 * The container re-renders whenever the array changes or a filter moves —
 * that is expected and cheap, because the rows it renders are memoized and
 * receive only an id.
 */
export const TaskList = () => {
  const renders = useRenderCount();

  const tasks = useTaskStore((state) => state.tasks);

  // One object out of the store needs useShallow: without it the selector
  // returns a fresh object every time and Object.is always fails.
  const filters = useFilterStore(
    useShallow((state) => ({
      search: state.search,
      status: state.status,
      assignee: state.assignee,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
    })),
  );

  // Derived data is computed here, never stored.
  const visibleIds = useMemo(
    () =>
      sortTasks(filterTasks(tasks, filters), filters).map((task) => task.id),
    [tasks, filters],
  );

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Tasks</h2>
        <span className="task-meta">
          {visibleIds.length} of {tasks.length}
        </span>
        <RenderBadge label="List" count={renders} />
      </header>

      {visibleIds.length === 0 ? (
        <p className="empty">Nothing matches the current filters.</p>
      ) : (
        <ul className="task-list">
          {visibleIds.map((id) => (
            <TaskRow key={id} id={id} />
          ))}
        </ul>
      )}
    </section>
  );
};
