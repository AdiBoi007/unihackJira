import { User } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import StatusChip from "../ui/StatusChip";
import { budgetHeadcount } from "../../data/mockData";

function BudgetHeadcountSection() {
  return (
    <section className="dashboard-section" data-section id="budget-headcount">
      <SectionHeader code="06 — BUDGET & HEADCOUNT" title="Team capacity and spend" />

      <div className="budget-layout">
        <article className="budget-layout__left">
          <div className="headcount-grid" aria-label="Headcount visual">
            {budgetHeadcount.slots.map((slot) => (
              <div className={`headcount-slot is-${slot.status}`} key={slot.id}>
                {slot.status === "open" ? (
                  <span className="headcount-slot__open">+</span>
                ) : (
                  <User size={20} strokeWidth={1.8} />
                )}
              </div>
            ))}
          </div>

          <div className="headcount-summary">
            <div className="headcount-summary__total">
              <span className="headcount-summary__value">6</span>
              <span className="headcount-summary__label">ACTIVE ENGINEERS</span>
            </div>
            <span className="headcount-summary__open">2 OPEN ROLES</span>
          </div>

          <div className="stacked-panel">
            <div className="stacked-bar" aria-label="Team breakdown">
              {budgetHeadcount.teamBreakdown.map((segment) => (
                <div
                  className={`stacked-bar__segment ${segment.percentClass} tone-${segment.tone}`}
                  key={segment.label}
                />
              ))}
            </div>

            <div className="stacked-legend">
              {budgetHeadcount.teamBreakdown.map((segment) => (
                <div className="stacked-legend__item" key={segment.label}>
                  <span className={`legend-dot tone-${segment.tone}`} />
                  <span>{segment.label}</span>
                  <span>{segment.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="budget-layout__right">
          <article className="budget-tile">
            <span className="budget-tile__label">{budgetHeadcount.sprintBudget.label}</span>
            <span className="budget-tile__value">{budgetHeadcount.sprintBudget.value}</span>
            <div className="progress-bar">
              <div
                className={`progress-bar__fill ${budgetHeadcount.sprintBudget.percentClass} tone-${budgetHeadcount.sprintBudget.tone}`}
              />
            </div>
            <span className={`budget-tile__meta tone-${budgetHeadcount.sprintBudget.tone}`}>
              {budgetHeadcount.sprintBudget.meta}
            </span>
          </article>

          <article className="budget-tile">
            <span className="budget-tile__label">{budgetHeadcount.quarterBurn.label}</span>
            <span className="budget-tile__value">{budgetHeadcount.quarterBurn.value}</span>
            <span className="budget-tile__submeta">{budgetHeadcount.quarterBurn.meta}</span>
            <div className="progress-bar">
              <div
                className={`progress-bar__fill ${budgetHeadcount.quarterBurn.percentClass} tone-${budgetHeadcount.quarterBurn.tone}`}
              />
            </div>
            <StatusChip tone={budgetHeadcount.quarterBurn.tone}>
              {budgetHeadcount.quarterBurn.chip}
            </StatusChip>
          </article>
        </div>
      </div>
    </section>
  );
}

export default BudgetHeadcountSection;
