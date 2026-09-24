import { memo, useState } from "react";
import { useRenderCount } from "../hooks/useRenderCount";
import { useTaskStore } from "../stores/taskStore";
import { PRIORITIES } from "../types/task";
import type { Priority } from "../types/task";
import { RenderBadge } from "./RenderBadge";

/**
 * Takes an id, never a task object: the parent re-renders on every list
 * change, and memo can only stop the cascade while the props stay equal.
 *
 * Everything else — the task itself and the actions — comes from the store,
 * so no callbacks are passed down.
 */
export const TaskRow = memo(({ id }: { id: string }) => {
  const renders = useRenderCount();

  // Subscribes to one task. Other tasks keep their object identity when they
  // change, so this component ignores them.
  const task = useTaskStore((state) =>
    state.tasks.find((candidate) => candidate.id === id),
  );

  // Action references are created once and never change.
  const toggleStatus = useTaskStore((state) => state.toggleStatus);
  const setPriority = useTaskStore((state) => state.setPriority);
  const renameTask = useTaskStore((state) => state.renameTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  // The draft title is local: nothing outside this row cares about half-typed
  // text, and keeping it in the store would re-render the list on every key.
  const [draft, setDraft] = useState<string | null>(null);

  // The row survives one render after its task is gone, before the parent
  // drops it from the list.
  if (!task) {
    return null;
  }

  const commitDraft = () => {
    if (draft !== null && draft.trim() !== "") {
      renameTask(id, draft.trim());
    }

    setDraft(null);
  };

  return (
    <li className="task-row">
      <button
        type="button"
        className="status"
        data-status={task.status}
        onClick={() => toggleStatus(id)}
        title="Click to move to the next status"
      >
        {task.status}
      </button>

      {draft === null ? (
        <span
          className="task-title"
          onDoubleClick={() => setDraft(task.title)}
          title="Double-click to rename"
        >
          {task.title}
        </span>
      ) : (
        <input
          autoFocus
          type="text"
          className="task-title-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitDraft}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              commitDraft();
            }

            if (event.key === "Escape") {
              setDraft(null);
            }
          }}
        />
      )}

      <span className="task-meta">{task.assignee}</span>

      <select
        value={task.priority}
        onChange={(event) => setPriority(id, event.target.value as Priority)}
      >
        {Object.values(PRIORITIES).map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>

      <span className="task-meta">{task.estimate}h</span>

      <RenderBadge label="Row" count={renders} />

      <button
        type="button"
        className="icon-button"
        onClick={() => removeTask(id)}
        title="Remove task"
      >
        ✕
      </button>
    </li>
  );
});

TaskRow.displayName = "TaskRow";
