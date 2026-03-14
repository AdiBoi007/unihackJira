import SectionHeader from "../ui/SectionHeader";
import WorkloadDonut from "../ui/WorkloadDonut";
import { workloadBreakdown } from "../../data/mockData";

function WorkloadBreakdownSection() {
  return (
    <section className="dashboard-section" data-section id="workload-breakdown">
      <SectionHeader code="03 — WORKLOAD BREAKDOWN" title="What the team is actually working on" />

      <div className="workload-panel">
        <div className="workload-donut-grid">
          {workloadBreakdown.donuts.map((item) => (
            <WorkloadDonut item={item} key={item.label} />
          ))}
        </div>

        <div className="stacked-panel">
          <div className="stacked-bar" aria-label="Workload breakdown">
            {workloadBreakdown.donuts.map((item) => (
              <div
                className={`stacked-bar__segment ${item.percentClass} tone-${item.tone}`}
                key={item.label}
              />
            ))}
          </div>

          <div className="stacked-legend">
            {workloadBreakdown.donuts.map((item) => (
              <div className="stacked-legend__item" key={item.label}>
                <span className={`legend-dot tone-${item.tone}`} />
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkloadBreakdownSection;
