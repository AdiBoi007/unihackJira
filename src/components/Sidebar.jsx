import { useEffect, useRef, useState } from "react";
import { executiveSummary, navItems, timeRangeOptions } from "../data/mockData";
import { useDashboard } from "../context/DashboardContext";

function Sidebar() {
  const { activeSection, setActiveSection, setTimeRange, tasks, timeRange } = useDashboard();
  const [badgePulse, setBadgePulse] = useState(false);
  const previousTaskCountRef = useRef(tasks.length);

  useEffect(() => {
    if (tasks.length === previousTaskCountRef.current) {
      return;
    }

    previousTaskCountRef.current = tasks.length;
    setBadgePulse(true);

    const timeoutId = window.setTimeout(() => {
      setBadgePulse(false);
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [tasks.length]);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__identity">
        <h1>CODESYNC INSIGHTS</h1>
        <p>Shipping confidence at a glance.</p>
      </div>

      <div className="sidebar__group">
        <span className="sidebar__label">SECTIONS</span>
        <nav className="sidebar__nav" aria-label="Dashboard sections">
          {navItems.map((item) => {
            const isTaskScheduler = item.id === "task-scheduler";

            return (
              <button
                className={activeSection === item.id ? "nav-item is-active" : "nav-item"}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                type="button"
              >
                <span className="nav-item__number">{item.number}</span>
                <span className="nav-item__label">{item.label}</span>
                {isTaskScheduler ? (
                  <span className={badgePulse ? "nav-item__badge is-bump" : "nav-item__badge"}>
                    {tasks.length}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar__group">
        <span className="sidebar__label">TIME RANGE</span>
        <div className="time-toggle" role="group" aria-label="Time range">
          {timeRangeOptions.map((option) => (
            <button
              className={timeRange === option.id ? "time-toggle__button is-active" : "time-toggle__button"}
              key={option.id}
              onClick={() => setTimeRange(option.id)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar__summary">
        <span className="sidebar__label">EXECUTIVE SUMMARY</span>
        <p>{executiveSummary}</p>
      </div>
    </aside>
  );
}

export default Sidebar;
