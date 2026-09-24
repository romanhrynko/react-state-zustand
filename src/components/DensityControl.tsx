import { useRenderCount } from "../hooks/useRenderCount";
import { useSettingsStore } from "../stores/settingsStore";
import type { Density } from "../types/ui";
import { RenderBadge } from "./RenderBadge";

const DENSITIES: Density[] = ["cozy", "compact"];

export const DensityControl = () => {
  const renders = useRenderCount();

  const density = useSettingsStore((state) => state.density);
  const setDensity = useSettingsStore((state) => state.setDensity);

  return (
    <label className="field">
      <span className="field-label">Density</span>
      <select
        value={density}
        onChange={(event) => setDensity(event.target.value as Density)}
      >
        {DENSITIES.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <RenderBadge label="Density" count={renders} />
    </label>
  );
};
