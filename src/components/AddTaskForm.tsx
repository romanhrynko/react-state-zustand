import { useState } from "react";
import { useRenderCount } from "../hooks/useRenderCount";
import { useTaskStore } from "../stores/taskStore";
import { ASSIGNEES, PRIORITIES } from "../types/task";
import type { Assignee, Priority } from "../types/task";
import { RenderBadge } from "./RenderBadge";

const EMPTY_DRAFT = {
  title: "",
  assignee: "roman" as Assignee,
  priority: "medium" as Priority,
  estimate: 1,
};

export const AddTaskForm = () => {
  const renders = useRenderCount();

  const addTask = useTaskStore((state) => state.addTask);

  const [draft, setDraft] = useState(EMPTY_DRAFT);

  const isValid = draft.title.trim() !== "" && draft.estimate >= 1;

  return (
    <form
      className="panel toolbar"
      onSubmit={(event) => {
        event.preventDefault();

        if (!isValid) {
          return;
        }

        addTask({ ...draft, title: draft.title.trim() });
        setDraft(EMPTY_DRAFT);
      }}
    >
      <label className="field">
        <span className="field-label">New task</span>
        <input
          type="text"
          value={draft.title}
          placeholder="What needs doing?"
          onChange={(event) =>
            setDraft((current) => ({ ...current, title: event.target.value }))
          }
        />
      </label>

      <label className="field">
        <span className="field-label">Assignee</span>
        <select
          value={draft.assignee}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              assignee: event.target.value as Assignee,
            }))
          }
        >
          {ASSIGNEES.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field-label">Priority</span>
        <select
          value={draft.priority}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              priority: event.target.value as Priority,
            }))
          }
        >
          {Object.values(PRIORITIES).map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field-label">Estimate</span>
        <input
          type="number"
          min={1}
          max={16}
          value={draft.estimate}
          className="estimate-input"
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              estimate: Number(event.target.value),
            }))
          }
        />
      </label>

      <button type="submit" disabled={!isValid}>
        Add
      </button>

      <RenderBadge label="Form" count={renders} />
    </form>
  );
};
