import SectionHeader from "../ui/SectionHeader";
import StatusChip from "../ui/StatusChip";
import MiniCompletionRing from "../ui/MiniCompletionRing";
import { devProfiles } from "../../data/mockData";

function DevProfilesSection() {
  return (
    <section className="dashboard-section" data-section id="dev-profiles">
      <SectionHeader code="04 — DEV PROFILES" title="Who is doing what right now" />

      <div className="dev-grid">
        {devProfiles.map((developer) => (
          <article className="dev-card" key={developer.name}>
            <div className="dev-card__top">
              <div className={`avatar tone-${developer.avatarTone}`}>{developer.initials}</div>
              <div className="dev-card__identity">
                <h3>{developer.name}</h3>
                <span>{developer.workstream}</span>
              </div>
              <span className={`role-chip tone-${developer.roleTone}`}>{developer.role}</span>
            </div>

            <div className="dev-card__meta">
              <div>
                <span>ACTIVE SPRINT</span>
                <strong>{developer.sprint}</strong>
              </div>
              <div>
                <span>TASKS</span>
                <strong>{developer.taskCount}</strong>
              </div>
              <div>
                <span>WORKSTREAM</span>
                <strong>{developer.workstream}</strong>
              </div>
            </div>

            <div className="dev-card__bottom">
              <div className="dev-card__ring">
                <MiniCompletionRing
                  percentClass={developer.percentClass}
                  tone={developer.statusTone}
                  value={developer.percent}
                />
              </div>

              <div className="dev-card__tasks">
                <StatusChip tone={developer.statusTone}>{developer.status}</StatusChip>
                <ul>
                  {developer.linkedTasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DevProfilesSection;
