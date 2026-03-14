import SectionHeader from "../ui/SectionHeader";
import StatusChip from "../ui/StatusChip";
import { useDashboard } from "../../context/DashboardContext";

const flowSteps = ["ASK", "AGENT", "ADD", "TRACK"];

function TeamChatSection() {
  const { chatHistory, tasks } = useDashboard();
  const bossPrompts = chatHistory.filter((message) => message.speaker === "boss").length;
  const actionableResponses = chatHistory.filter(
    (message) => message.speaker === "agent" && message.actionTask,
  ).length;
  const capturedFromChat = tasks.filter((task) => task.source === "BOSS CHAT").length;
  const recentActions = chatHistory
    .filter((message) => message.speaker === "agent" && message.actionTask)
    .slice(-3)
    .reverse();

  return (
    <section className="dashboard-section" data-section id="team-chat">
      <SectionHeader code="05 — EXECUTIVE CHAT" title="Ask once, route action automatically" />

      <div className="chat-overview">
        <div className="chat-overview__stats">
          <article className="chat-stat-card">
            <span className="chat-stat-card__label">BOSS PROMPTS</span>
            <strong className="chat-stat-card__value">{bossPrompts}</strong>
            <span className="chat-stat-card__meta">LIVE CONTEXT</span>
          </article>

          <article className="chat-stat-card">
            <span className="chat-stat-card__label">ACTION RESPONSES</span>
            <strong className="chat-stat-card__value">{actionableResponses}</strong>
            <span className="chat-stat-card__meta">READY TO ROUTE</span>
          </article>

          <article className="chat-stat-card">
            <span className="chat-stat-card__label">TASKS CAPTURED</span>
            <strong className="chat-stat-card__value">{capturedFromChat}</strong>
            <span className="chat-stat-card__meta">BOSS CHAT SOURCE</span>
          </article>
        </div>

        <div className="chat-overview__panels">
          <article className="chat-flow-panel">
            <span className="summary-card__label">CHAT TO SCHEDULER FLOW</span>
            <div className="chat-flow-strip">
              {flowSteps.map((step, index) => (
                <div className="chat-flow-step" key={step}>
                  <span className="chat-flow-step__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="chat-flow-step__label">{step}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="chat-action-panel">
            <span className="summary-card__label">LATEST ACTIONABLE RESPONSES</span>
            <div className="chat-action-list">
              {recentActions.map((message) => (
                <div className="chat-action-row" key={message.id}>
                  <p>{message.text}</p>
                  <div className="chat-action-row__meta">
                    <StatusChip tone={message.schedulerAdded ? "green" : "purple"}>
                      {message.schedulerAdded ? "ADDED" : "READY"}
                    </StatusChip>
                    <span>{message.actionTask?.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default TeamChatSection;
