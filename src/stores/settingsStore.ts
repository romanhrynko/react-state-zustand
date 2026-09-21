import { create } from "zustand";
import type { Density, Theme } from "../types/ui";

type SettingsStore = {
  theme: Theme;
  density: Density;
  showStats: boolean;
  setTheme: (theme: Theme) => void;
  setDensity: (density: Density) => void;
  toggleStats: () => void;
};

export const useSettingsStore = create<SettingsStore>()((set) => ({
  theme: "light",
  density: "cozy",
  showStats: true,
  setTheme: (theme) => set({ theme }),
  setDensity: (density) => set({ density }),
  toggleStats: () => set((state) => ({ showStats: !state.showStats })),
}));
