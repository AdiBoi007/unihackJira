function WorkloadDonut({ item }) {
  return (
    <article className="workload-donut-card">
      <div className="workload-donut">
        <svg viewBox="0 0 100 100" width="120" height="120" aria-hidden="true">
          <circle className="donut-track" cx="50" cy="50" r="45" fill="none" strokeWidth="8" />
          <circle
            className={`donut-meter ${item.percentClass} tone-${item.tone}`}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="butt"
          />
        </svg>
        <div className="workload-donut__center">
          <span className="workload-donut__value">{item.value}</span>
          <span className="workload-donut__label">{item.label}</span>
        </div>
      </div>

      <div className="workload-donut__meta">
        <span>{item.detail}</span>
        <span>{item.tasks}</span>
      </div>
    </article>
  );
}

export default WorkloadDonut;
