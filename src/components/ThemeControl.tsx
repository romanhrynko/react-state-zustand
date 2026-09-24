import { useRenderCount } from "../hooks/useRenderCount";
import { useSettingsStore } from "../stores/settingsStore";
import type { Theme } from "../types/ui";
import { RenderBadge } from "./RenderBadge";

const THEMES: Theme[] = ["light", "dark"];

export const ThemeControl = () => {
  const renders = useRenderCount();

  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);

  return (
    <label className="field">
      <span className="field-label">Theme</span>
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value as Theme)}
      >
        {THEMES.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <RenderBadge label="Theme" count={renders} />
    </label>
  );
};
