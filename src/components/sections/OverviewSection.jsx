import { overviewSnapshots } from "../../data/mockData";
import { useDashboard } from "../../context/DashboardContext";

function OverviewSection() {
  const { timeRange } = useDashboard();
  const snapshot = overviewSnapshots[timeRange] || overviewSnapshots["30d"];

  return (
    <section className="dashboard-section" data-section id="overview">
      <div className="overview-hero">
        <span className="overview-hero__crumb">TACTICAL OS / EXECUTIVE VIEW</span>
        <p className="overview-hero__subtitle">
          Shipping confidence, platform health, and leadership attention in one screen.
        </p>
      </div>

      <div className="overview-stats">
        {snapshot.stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span className="stat-card__label">{stat.label}</span>
            <span className={`stat-card__value tone-${stat.tone}`}>{stat.value}</span>
            <span className={`stat-card__delta tone-${stat.tone}`}>{stat.delta}</span>
          </article>
        ))}
      </div>

      <div className="overview-lower">
        <article className="summary-card">
          <span className="summary-card__label">STATUS SUMMARY</span>
          <h2>{overviewSnapshots.summary.title}</h2>
          <p>{overviewSnapshots.summary.body}</p>
        </article>

        <div className="focus-panel">
          <span className="summary-card__label">IMMEDIATE FOCUS</span>
          <div className="focus-grid">
            {overviewSnapshots.focus.map((item) => (
              <article className="focus-card" key={item.title}>
                <span className="focus-card__tag">DECISION NEEDED</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="focus-card__owner">{item.owner}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
