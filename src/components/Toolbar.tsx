import { AssigneeFilter } from "./AssigneeFilter";
import { RenderBadge } from "./RenderBadge";
import { SearchInput } from "./SearchInput";
import { SortControls } from "./SortControls";
import { StatusFilter } from "./StatusFilter";
import { useRenderCount } from "../hooks/useRenderCount";

export const Toolbar = () => {
  const renders = useRenderCount();

  return (
    <section className="panel toolbar">
      <SearchInput />
      <StatusFilter />
      <AssigneeFilter />
      <SortControls />
      <RenderBadge label="Toolbar" count={renders} />
    </section>
  );
};
