import { useRenderCount } from "../hooks/useRenderCount";
import { useFilterStore } from "../stores/filterStore";
import type { SortOrder } from "../types/sort";
import { RenderBadge } from "./RenderBadge";

const SORT_FIELDS = ["priority", "estimate", "title"] as const;

export const SortControls = () => {
  const renders = useRenderCount();

  const sortBy = useFilterStore((state) => state.sortBy);
  const sortOrder = useFilterStore((state) => state.sortOrder);
  const setSortBy = useFilterStore((state) => state.setSortBy);
  const setSortOrder = useFilterStore((state) => state.setSortOrder);

  return (
    <label className="field">
      <span className="field-label">Sort</span>
      <select
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value as (typeof SORT_FIELDS)[number])
        }
      >
        {SORT_FIELDS.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="icon-button"
        title={sortOrder === "asc" ? "Ascending" : "Descending"}
        onClick={() =>
          setSortOrder((sortOrder === "asc" ? "desc" : "asc") as SortOrder)
        }
      >
        {sortOrder === "asc" ? "↑" : "↓"}
      </button>
      <RenderBadge label="Sort" count={renders} />
    </label>
  );
};
