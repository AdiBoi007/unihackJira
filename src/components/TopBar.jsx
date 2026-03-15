import { topBarPills } from "../data/mockData";

function TopBar() {
  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <div className="top-bar__logo">
          <span className="logo-primary">✳ ORCHESTRA</span>
          <span className="logo-accent">INSIGHTS</span>
        </div>
        <span className="top-bar__separator" aria-hidden="true" />
        <span className="top-bar__meta">TACTICAL OS / EXECUTIVE VIEW</span>
      </div>

      <div className="top-bar__pills">
        {topBarPills.map((pill) => (
          <div className="top-pill" key={pill.label}>
            <span className="top-pill__label">{pill.label}</span>
            <span className={`top-pill__value tone-${pill.tone}`}>{pill.value}</span>
          </div>
        ))}
      </div>
    </header>
  );
}

export default TopBar;
