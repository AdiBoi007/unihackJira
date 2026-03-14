import SectionHeader from "../ui/SectionHeader";
import StatusChip from "../ui/StatusChip";
import { sprintTimeline } from "../../data/mockData";

function SprintTimelineSection() {
  return (
    <section className="dashboard-section" data-section id="sprint-timeline">
      <SectionHeader code="02 — SPRINT TIMELINE" title="Deadlines in sprint form" />

      <div className="timeline-panel">
        <div className="timeline-list">
          {sprintTimeline.items.map((item) => (
            <div className="timeline-row" key={item.id}>
              <span className="timeline-row__label">{item.label}</span>

              <div className="timeline-track">
                <div
                  className={`timeline-fill ${item.percentClass} tone-${item.tone} ${
                    item.shimmer ? "is-progress" : ""
                  }`.trim()}
                />
                {item.isCurrent ? (
                  <div className={`today-marker ${item.percentClass}`}>
                    <span>TODAY</span>
                  </div>
                ) : null}
              </div>

              <span className="timeline-row__percent">{item.percent}</span>
              <StatusChip tone={item.statusTone}>{item.status}</StatusChip>
              <span className="timeline-row__date">{item.deadline}</span>
            </div>
          ))}
        </div>

        <div className="timeline-summary">
          {sprintTimeline.summary.map((item) => (
            <span className="timeline-summary__chip" key={item.label}>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SprintTimelineSection;
