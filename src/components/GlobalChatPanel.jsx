import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDashboard } from "../context/DashboardContext";

function GlobalChatPanel() {
  const [inputValue, setInputValue] = useState("");
  const [recentlyAddedMessageIds, setRecentlyAddedMessageIds] = useState([]);
  const { addTaskFromMessage, chatHistory, chatPanelOpen, sendMessage, toggleChatPanel } =
    useDashboard();
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
  }, [chatHistory, chatPanelOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(inputValue);
    setInputValue("");
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
            {chatHistory.map((message) => {
              const showActionButton =
                message.speaker === "agent" && message.actionTask && !message.schedulerAdded;
              const isRecentlyAdded = recentlyAddedMessageIds.includes(message.id);

              return (
                <div
                  className={`chat-message ${message.speaker === "boss" ? "is-boss" : "is-agent"} ${
                    message.isNew ? "is-new" : ""
                  }`.trim()}
                  key={message.id}
                >
                  <span className="chat-message__label">{message.label}</span>
                  <div className="chat-bubble">
                    <p>{message.text}</p>
                  </div>

                  {message.refs?.length ? (
                    <div className="chat-message__refs">
                      {message.refs.map((ref) => (
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
                      {isRecentlyAdded ? "✓ Added" : "ADD TO SCHEDULER →"}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>

          <form className="chat-rail__input" onSubmit={handleSubmit}>
            <input
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask about sprints, blockers, team capacity..."
              type="text"
              value={inputValue}
            />
            <button type="submit">ASK →</button>
          </form>
        </>
      ) : (
        <div className="chat-rail__collapsed">
          <span>CHAT</span>
          <span>{chatHistory.filter((message) => message.speaker === "agent").length}</span>
        </div>
      )}
    </aside>
  );
}

export default GlobalChatPanel;
