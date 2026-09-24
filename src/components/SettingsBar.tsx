import { useRenderCount } from "../hooks/useRenderCount";
import { DensityControl } from "./DensityControl";
import { RenderBadge } from "./RenderBadge";
import { StatsToggle } from "./StatsToggle";
import { ThemeControl } from "./ThemeControl";

export const SettingsBar = () => {
  const renders = useRenderCount();

  return (
    <section className="panel toolbar">
      <ThemeControl />
      <DensityControl />
      <StatsToggle />
      <RenderBadge label="Settings" count={renders} />
    </section>
  );
};
