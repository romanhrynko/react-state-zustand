import { useRenderCount } from "../hooks/useRenderCount";
import { useFilterStore } from "../stores/filterStore";
import { TASK_STATUSES } from "../types/task";
import type { TaskStatus } from "../types/task";
import { RenderBadge } from "./RenderBadge";

export const StatusFilter = () => {
  const renders = useRenderCount();

  const status = useFilterStore((state) => state.status);
  const setStatus = useFilterStore((state) => state.setStatus);

  return (
    <label className="field">
      <span className="field-label">Status</span>
      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as TaskStatus | "all")
        }
      >
        <option value="all">all</option>
        {Object.values(TASK_STATUSES).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <RenderBadge label="Status" count={renders} />
    </label>
  );
};
