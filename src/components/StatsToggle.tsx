import { useRenderCount } from "../hooks/useRenderCount";
import { useSettingsStore } from "../stores/settingsStore";
import { RenderBadge } from "./RenderBadge";

export const StatsToggle = () => {
  const renders = useRenderCount();

  const toggleStats = useSettingsStore((state) => state.toggleStats);

  return (
    <span className="field">
      <button type="button" className="icon-button" onClick={toggleStats}>
        Toggle stats
      </button>
      <RenderBadge label="StatsToggle" count={renders} />
    </span>
  );
};
