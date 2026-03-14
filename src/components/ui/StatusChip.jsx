function StatusChip({ children, tone = "neutral", className = "" }) {
  return <span className={`status-chip tone-${tone} ${className}`.trim()}>{children}</span>;
}

export default StatusChip;
