import { useEffect, useRef } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import GlobalChatPanel from "./components/GlobalChatPanel";
import OverviewSection from "./components/sections/OverviewSection";
import SprintTimelineSection from "./components/sections/SprintTimelineSection";
import WorkloadBreakdownSection from "./components/sections/WorkloadBreakdownSection";
import DevProfilesSection from "./components/sections/DevProfilesSection";
import TeamChatSection from "./components/sections/TeamChatSection";
import BudgetHeadcountSection from "./components/sections/BudgetHeadcountSection";
import TaskSchedulerSection from "./components/sections/TaskSchedulerSection";
import DocumentationUploadSection from "./components/sections/DocumentationUploadSection";
import { useDashboard } from "./context/DashboardContext";
import "./styles.css";

function App() {
  const mainRef = useRef(null);
  const { chatPanelOpen, setActiveSection } = useDashboard();

  useEffect(() => {
    const root = mainRef.current;

    if (!root) {
      return undefined;
    }

    const sections = Array.from(root.querySelectorAll("[data-section]"));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root,
        threshold: [0.25, 0.55, 0.85],
        rootMargin: "-12% 0px -40% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [setActiveSection]);

  return (
    <div className="app">
      <div className="orb" />
      <div className="scanlines" />
      <div className="grain" />

      <TopBar />
      <Sidebar />

      <div className={chatPanelOpen ? "workspace" : "workspace is-collapsed"}>
        <main className="main" ref={mainRef}>
          <OverviewSection />
          <SprintTimelineSection />
          <WorkloadBreakdownSection />
          <DevProfilesSection />
          <TeamChatSection />
          <BudgetHeadcountSection />
          <TaskSchedulerSection />
          <DocumentationUploadSection />
        </main>

        <GlobalChatPanel />
      </div>
    </div>
  );
}

export default App;
