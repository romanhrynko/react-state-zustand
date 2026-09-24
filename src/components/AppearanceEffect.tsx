import { useEffect } from "react";
import { useSettingsStore } from "../stores/settingsStore";

export const AppearanceEffect = () => {
  const theme = useSettingsStore((state) => state.theme);
  const density = useSettingsStore((state) => state.density);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.density = density;
  }, [density]);

  return null;
};
