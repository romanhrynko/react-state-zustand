import { useRenderCount } from "../hooks/useRenderCount";
import { useFilterStore } from "../stores/filterStore";
import { RenderBadge } from "./RenderBadge";

export const SearchInput = () => {
  const renders = useRenderCount();

  const search = useFilterStore((state) => state.search);
  const setSearch = useFilterStore((state) => state.setSearch);

  return (
    <label className="field">
      <span className="field-label">Search</span>
      <input
        type="search"
        value={search}
        placeholder="Filter by title…"
        onChange={(event) => setSearch(event.target.value)}
      />
      <RenderBadge label="Search" count={renders} />
    </label>
  );
};
