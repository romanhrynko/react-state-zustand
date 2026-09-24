import { useRenderCount } from "../hooks/useRenderCount";
import { useFilterStore } from "../stores/filterStore";
import { ASSIGNEES } from "../types/task";
import type { Assignee } from "../types/task";
import { RenderBadge } from "./RenderBadge";

export const AssigneeFilter = () => {
  const renders = useRenderCount();

  const assignee = useFilterStore((state) => state.assignee);
  const setAssignee = useFilterStore((state) => state.setAssignee);

  return (
    <label className="field">
      <span className="field-label">Assignee</span>
      <select
        value={assignee}
        onChange={(event) =>
          setAssignee(event.target.value as Assignee | "all")
        }
      >
        <option value="all">all</option>
        {ASSIGNEES.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <RenderBadge label="Assignee" count={renders} />
    </label>
  );
};
