export const RenderBadge = ({
  label,
  count,
}: {
  label: string;
  count: number;
}) => (
  <span
    style={{
      display: "inline-block",
      padding: "0 6px",
      border: "1px solid var(--border)",
      borderRadius: 999,
      background: "var(--surface)",
      color: "var(--muted)",
      fontSize: 12,
      whiteSpace: "nowrap",
    }}
    title={`${label} render count`}
  >
    {label}: {count}
  </span>
);
