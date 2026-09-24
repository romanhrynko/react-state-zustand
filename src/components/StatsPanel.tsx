import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useRenderCount } from "../hooks/useRenderCount";
import { getTaskStats } from "../lib/taskStats";
import { useFilterStore } from "../stores/filterStore";
import { useSettingsStore } from "../stores/settingsStore";
import { useTaskStore } from "../stores/taskStore";
import { TASK_STATUSES } from "../types/task";
import { RenderBadge } from "./RenderBadge";

export const StatsPanel = () => {
  const renders = useRenderCount();

  const showStats = useSettingsStore((state) => state.showStats);
  const tasks = useTaskStore((state) => state.tasks);
  const filters = useFilterStore(
    useShallow((state) => ({
      search: state.search,
      status: state.status,
      assignee: state.assignee,
    })),
  );

  const stats = useMemo(() => getTaskStats(tasks, filters), [tasks, filters]);

  if (!showStats) {
    return null;
  }

  return (
    <section className="panel stats">
      {Object.values(TASK_STATUSES).map((status) => (
        <span key={status} className="stat">
          <span className="field-label">{status}</span>
          <strong>{stats.countByStatus[status]}</strong>
        </span>
      ))}

      <span className="stat">
        <span className="field-label">visible hours</span>
        <strong>
          {stats.filteredEstimate}h / {stats.filteredCount} tasks
        </strong>
      </span>

      <span className="stat">
        <span className="field-label">done</span>
        <strong>{stats.donePercent}%</strong>
      </span>

      <RenderBadge label="Stats" count={renders} />
    </section>
  );
};
