import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDashboard } from "../context/DashboardContext";

const starterQuestions = [
  "Are we going to hit the Sprint 2 deadline?",
  "Which developer is most overloaded right now?",
  "What needs my decision this week?",
  "Can we ship the auth system in 2 weeks?",
  "Where are the active blockers and who owns them?",
  "How is the team performing against the Q2 roadmap?",
  "Who is our biggest delivery risk this sprint?",
  "Should I be worried about anything right now?",
];

const bbThinkingStages = [
  null,
  "Querying dev agents...",
  "Aggregating team status...",
  "Analyzing blockers...",
  "Writing summary...",
];

const followUpMap = [
  {
    triggers: ["sprint 2", "deadline", "68%"],
    suggestions: ["What needs my decision this week?", "Who is the biggest delivery risk?"],
  },
  {
    triggers: ["overloaded", "task count", "utilisation"],
    suggestions: [
      "Are we going to hit the Sprint 2 deadline?",
      "Should I be worried about anything?",
    ],
  },
  {
    triggers: ["two items", "your input", "sign-off"],
    suggestions: ["Can we add Slack login this sprint?", "How is the team performing overall?"],
  },
  {
    triggers: ["no.", "sprint 3", "move the"],
    suggestions: ["What needs my decision this week?", "Who is the biggest delivery risk?"],
  },
  {
    triggers: ["blocker", "database schema", "casey"],
    suggestions: [
      "Are we going to hit the Sprint 2 deadline?",
      "Which dev is most overloaded right now?",
    ],
  },
  {
    triggers: ["q2", "roadmap", "67%"],
    suggestions: ["What needs my decision this week?", "Should I hire anyone right now?"],
  },
  {
    triggers: ["nothing to worry", "everything else is green"],
    suggestions: ["Which developer is performing best?", "What needs my decision this week?"],
  },
  {
    triggers: ["senior backend", "open role", "headcount"],
    suggestions: ["Are we going to hit the Sprint 2 deadline?", "What needs my decision this week?"],
  },
];

const DEFAULT_FOLLOWUPS = [
  "Are we going to hit the Sprint 2 deadline?",
  "What needs my decision this week?",
];

const getFollowUps = (responseText) => {
  const lower = responseText.toLowerCase();
  const match = followUpMap.find((item) =>
    item.triggers.some((trigger) => lower.includes(trigger)),
  );

  return match?.suggestions ?? DEFAULT_FOLLOWUPS;
};

function GlobalChatPanel() {
  const [inputValue, setInputValue] = useState("");
  const [recentlyAddedMessageIds, setRecentlyAddedMessageIds] = useState([]);
  const {
    addTaskFromMessage,
    bbChatHistory,
    bbIsTyping,
    bbThinkingStage,
    chatPanelOpen,
    sendMessage,
    toggleChatPanel,
  } = useDashboard();
  const messagesRef = useRef(null);
  const timeoutIdsRef = useRef([]);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
    };
  }, []);

  useEffect(() => {
    const node = messagesRef.current;

    if (!node) {
      return;
    }

    node.scrollTop = node.scrollHeight;
  }, [bbChatHistory, bbIsTyping, chatPanelOpen]);

  const handleSend = (content) => {
    sendMessage(content);
    setInputValue("");
  };

  const handleStarterClick = (question) => {
    handleSend(question);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend(inputValue);
  };

  const handleAddTask = (messageId) => {
    addTaskFromMessage(messageId);
    setRecentlyAddedMessageIds((current) => [...current, messageId]);

    const timeoutId = window.setTimeout(() => {
      setRecentlyAddedMessageIds((current) => current.filter((id) => id !== messageId));
    }, 1500);

    timeoutIdsRef.current.push(timeoutId);
  };

  return (
    <aside className={chatPanelOpen ? "chat-rail" : "chat-rail is-collapsed"}>
      <div className="chat-rail__header">
        <div className="chat-rail__title-block">
          <span className="chat-rail__label">LIVE CHAT</span>
          {chatPanelOpen ? <strong>Big Boss Interface</strong> : null}
        </div>
        <button
          aria-label={chatPanelOpen ? "Collapse chat panel" : "Expand chat panel"}
          className="chat-rail__toggle"
          onClick={toggleChatPanel}
          type="button"
        >
          {chatPanelOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {chatPanelOpen ? (
        <>
          <div className="chat-rail__messages" ref={messagesRef}>
            {bbChatHistory.length === 0 ? (
              <div className="bb-empty-state">
                <div className="bb-empty-header">
                  <span className="bb-empty-asterisk">✳</span>
                  <p className="bb-empty-title">Ask anything about your engineering team.</p>
                  <p className="bb-empty-sub">
                    Real-time answers. No filter. No politics. Powered by Claude.
                  </p>
                </div>

                <div className="bb-starters">
                  <p className="bb-starters-label">SUGGESTED QUESTIONS</p>
                  {starterQuestions.map((question) => (
                    <button
                      className="bb-starter-btn"
                      disabled={bbIsTyping}
                      key={question}
                      onClick={() => handleStarterClick(question)}
                      type="button"
                    >
                      <span className="bb-starter-text">{question}</span>
                      <ArrowRight className="bb-starter-arrow" size={12} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bb-messages">
                {bbChatHistory.map((message, index) => {
                  const isLastMessage = index === bbChatHistory.length - 1;
                  const showActionButton =
                    message.role === "agent" &&
                    (message.hasAction || message.actionTask) &&
                    !message.schedulerAdded;
                  const isRecentlyAdded = recentlyAddedMessageIds.includes(message.id);

                  return (
                    <div
                      className={`chat-message ${message.role === "user" ? "is-boss" : "is-agent"} ${
                        message.isNew ? "is-new" : ""
                      } ${message.isError ? "is-error" : ""}`.trim()}
                      key={message.id}
                    >
                      <span className="chat-message__label">
                        {message.label}
                        {message.time ? ` · ${message.time}` : ""}
                      </span>
                      <div className="chat-bubble">
                        <p>{message.content}</p>
                      </div>

                      {message.tags?.length ? (
                        <div className="chat-message__refs">
                          {message.tags.map((ref) => (
                            <span className="chat-ref" key={ref}>
                              {ref}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {showActionButton || isRecentlyAdded ? (
                        <button
                          className={isRecentlyAdded ? "chat-action-button is-added" : "chat-action-button"}
                          disabled={isRecentlyAdded}
                          onClick={() => handleAddTask(message.id)}
                          type="button"
                        >
                          {isRecentlyAdded ? "✓ Added" : message.actionLabel ?? "ADD TO SCHEDULER →"}
                        </button>
                      ) : null}

                      {message.role === "agent" && !bbIsTyping && isLastMessage ? (
                        <div className="bb-followups">
                          <span className="bb-followups-label">FOLLOW UP</span>
                          {getFollowUps(message.content).map((question) => (
                            <button
                              className="bb-followup-btn"
                              key={question}
                              onClick={() => handleSend(question)}
                              type="button"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}

                {bbIsTyping ? (
                  <div className="bb-typing-block">
                    <div className="bb-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                    {bbThinkingStage > 0 ? (
                      <span className="bb-thinking-label" key={bbThinkingStage}>
                        {bbThinkingStages[bbThinkingStage]}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <form className="chat-rail__input" onSubmit={handleSubmit}>
            <input
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask about sprints, blockers, team capacity..."
              type="text"
              value={inputValue}
            />
            <button disabled={bbIsTyping} type="submit">
              ASK →
            </button>
          </form>
        </>
      ) : (
        <div className="chat-rail__collapsed">
          <span>CHAT</span>
          <span>{bbChatHistory.filter((message) => message.role === "agent").length}</span>
        </div>
      )}
    </aside>
  );
}

export default GlobalChatPanel;
