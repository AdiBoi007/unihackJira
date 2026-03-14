function MiniCompletionRing({ percentClass, tone, value }) {
  return (
    <div className="mini-ring">
      <svg viewBox="0 0 100 100" width="48" height="48" aria-hidden="true">
        <circle className="mini-ring__track" cx="50" cy="50" r="20" fill="none" strokeWidth="10" />
        <circle
          className={`mini-ring__meter ${percentClass} tone-${tone}`}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="10"
          strokeLinecap="butt"
        />
      </svg>
      <span className="mini-ring__value">{value}</span>
    </div>
  );
}

export default MiniCompletionRing;
