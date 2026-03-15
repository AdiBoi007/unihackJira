export const bigBossResponses = [
  {
    triggers: ["sprint 2", "deadline", "on track", "hit the", "deliver"],
    response:
      "Sprint 2 is at 68% with 4 days remaining. Frontend and Backend are green. One active risk: Casey's database schema is blocking 2 of Jordan's tasks. Casey estimates completion tomorrow. If that holds — you hit the deadline. No action needed unless Casey slips.",
    tags: ["SPRINT 2", "CASEY", "JORDAN"],
    hasAction: false,
  },
  {
    triggers: ["overloaded", "busy", "capacity", "too much", "workload"],
    response:
      "Alex has the highest active task count at 3 tasks across Sprint 2. Jordan has the lowest completion rate at 45% but is blocked — not slow. No developer is critically overloaded right now. Team utilisation is at 82%, which is healthy.",
    tags: ["ALEX", "JORDAN", "SPRINT 2"],
    hasAction: false,
  },
  {
    triggers: ["decision", "need from me", "my input", "this week", "action"],
    response:
      "Two items need your input this week. First: unblock the database schema sync payload contract — Casey needs a sign-off to proceed. Second: confirm Q3 hiring headcount — 2 open roles are delaying team scale planning for the next cycle.",
    tags: ["DATABASE", "Q3 HIRING", "HEADCOUNT"],
    hasAction: true,
    actionLabel: "ADD TO SCHEDULER →",
  },
  {
    triggers: ["slack login", "add feature", "new feature", "scope", "can we add", "can we ship"],
    response:
      "No. 4 days of capacity remain in Sprint 2. The current auth workload needs 3 more days from Jordan. Adding scope now would push the deadline by 2 days minimum. Recommendation: move the new feature to Sprint 3. I can draft the task if you confirm.",
    tags: ["SPRINT 2", "JORDAN", "SCOPE"],
    hasAction: true,
    actionLabel: "ADD TO SCHEDULER →",
  },
  {
    triggers: ["blocker", "blocked", "stuck", "risk", "problem"],
    response:
      "One active blocker: Casey's database schema design is holding up Jordan's auth token work and Sam's session endpoint. Casey estimates resolution tomorrow. If it slips past tomorrow, Jordan loses 2 days and you miss the Sprint 2 deadline by 1 day.",
    tags: ["CASEY", "JORDAN", "DATABASE"],
    hasAction: false,
  },
  {
    triggers: ["q2", "roadmap", "features", "progress", "overall"],
    response:
      "Q2 roadmap is 67% complete. 4 of 6 features are on track. Auth system is the active sprint focus. Dashboard UI is at 45% — below target. The only structural risk is the database dependency chain. If Casey resolves tomorrow, Q2 remains achievable.",
    tags: ["Q2", "DASHBOARD UI", "AUTH"],
    hasAction: false,
  },
  {
    triggers: ["worried", "concern", "should i", "anything wrong", "bad news"],
    response:
      "One thing to watch: the database blocker. Everything else is green. Frontend is ahead of plan. Backend is clean. Testing is ready to start once auth lands. If Casey ships tomorrow, there is nothing to worry about this sprint.",
    tags: ["DATABASE", "FRONTEND", "BACKEND"],
    hasAction: false,
  },
  {
    triggers: ["hire", "hiring", "headcount", "team size", "new engineer", "recruit"],
    response:
      "Current team is 6 engineers. 2 open roles are in backlog: Senior Backend and QA Automation. Based on Q3 roadmap scope, you need at least 1 senior backend engineer by May 1 or the platform hardening sprint will slip. I recommend opening the role this week.",
    tags: ["HEADCOUNT", "Q3", "BACKEND"],
    hasAction: true,
    actionLabel: "ADD TO SCHEDULER →",
  },
  {
    triggers: ["who is", "best dev", "strongest", "top performer", "performing"],
    response:
      "Sam has the highest sprint completion rate this cycle at 80% with clean PRs. Alex is most active by commit volume. Jordan is technically strong but currently blocked — their completion rate will recover once the schema ships. Casey is the critical path right now.",
    tags: ["SAM", "ALEX", "JORDAN"],
    hasAction: false,
  },
  {
    triggers: ["fire", "performance", "underperforming", "slow", "behind"],
    response:
      "No developer is underperforming right now. Jordan's low completion rate is blocker-related, not performance. If the database dependency resolves and Jordan remains behind by end of sprint, that would be worth a conversation. Current data does not support a performance concern.",
    tags: ["JORDAN", "SPRINT 2"],
    hasAction: false,
  },
  {
    triggers: [],
    response:
      "Noted. Based on current sprint data, the team is broadly on track. The only active pressure point is the database schema dependency. Everything else is green. Is there a specific workstream or developer you want me to pull detail on?",
    tags: ["SPRINT 2"],
    hasAction: false,
  },
];

export const getBigBossResponse = (input) => {
  const lower = input.toLowerCase();

  return (
    bigBossResponses.find((item) => item.triggers.some((trigger) => lower.includes(trigger))) ??
    bigBossResponses[bigBossResponses.length - 1]
  );
};
