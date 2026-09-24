export const RenderBadge = ({
  label,
  count,
}: {
  label: string;
  count: number;
}) => (
  <span className="render-badge" title={`${label} render count`}>
    {label}: {count}
  </span>
);
