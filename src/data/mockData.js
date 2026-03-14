const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60 * 1000);

export const navItems = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "sprint-timeline", number: "02", label: "Sprint Timeline" },
  { id: "workload-breakdown", number: "03", label: "Workload Breakdown" },
  { id: "dev-profiles", number: "04", label: "Dev Profiles" },
  { id: "team-chat", number: "05", label: "Team Chat" },
  { id: "budget-headcount", number: "06", label: "Budget & Headcount" },
  { id: "task-scheduler", number: "07", label: "Task Scheduler" },
  { id: "documentation-uploader", number: "08", label: "Document Uploads" },
];

export const timeRangeOptions = [
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
];

export const topBarPills = [
  { label: "QUARTER", value: "Q2 FY26", tone: "neutral" },
  { label: "ACTIVE BETS", value: "12", tone: "blue" },
  { label: "FLAGGED", value: "3 ITEMS", tone: "red" },
  { label: "LAST REFRESHED", value: "14 MAR 01:21 PM", tone: "muted" },
];

export const executiveSummary =
  "The business is broadly on plan. Platform capacity and finance decisions are the only items likely to shift near-term delivery.";

export const taskStatusOrder = ["PENDING", "IN REVIEW", "ASSIGNED", "DONE"];

export const taskStatusToneMap = {
  PENDING: "neutral",
  "IN REVIEW": "blue",
  ASSIGNED: "amber",
  DONE: "green",
};

export const priorityToneMap = {
  HIGH: "red",
  MED: "amber",
  LOW: "green",
};

export const documentationUploadConfig = {
  accept: ".pdf,.doc,.docx,.md,.txt,.rtf",
  zones: [
    {
      id: "srs",
      code: "SRS FILE",
      title: "Upload the software requirements spec",
      detail:
        "Use this lane for the primary SRS or any revision of the requirements baseline.",
      buttonLabel: "UPLOAD SRS",
    },
    {
      id: "documentation",
      code: "PROJECT DOCS",
      title: "Upload supporting software documentation",
      detail:
        "Use this lane for architecture notes, API docs, handoff files, runbooks, and supporting references.",
      buttonLabel: "UPLOAD DOCS",
    },
  ],
};

export const overviewSnapshots = {
  "7d": {
    stats: [
      { label: "FEATURES ON TRACK", value: "3/6", tone: "green", delta: "ON TRACK ↑" },
      { label: "SPRINT HEALTH", value: "74%", tone: "amber", delta: "AT RISK ↓2%" },
      { label: "SYSTEM UPTIME", value: "99.2%", tone: "green", delta: "SLA MET →" },
      { label: "OPEN INCIDENTS", value: "1", tone: "red", delta: "ATTENTION" },
    ],
  },
  "30d": {
    stats: [
      { label: "FEATURES ON TRACK", value: "4/6", tone: "green", delta: "ON TRACK ↑" },
      { label: "SPRINT HEALTH", value: "78%", tone: "amber", delta: "AT RISK ↓4%" },
      { label: "SYSTEM UPTIME", value: "99.4%", tone: "green", delta: "SLA MET →" },
      { label: "OPEN INCIDENTS", value: "1", tone: "red", delta: "ATTENTION" },
    ],
  },
  "90d": {
    stats: [
      { label: "FEATURES ON TRACK", value: "5/6", tone: "green", delta: "ON TRACK ↑" },
      { label: "SPRINT HEALTH", value: "82%", tone: "amber", delta: "RECOVERING ↑3%" },
      { label: "SYSTEM UPTIME", value: "99.1%", tone: "green", delta: "SLA MET →" },
      { label: "OPEN INCIDENTS", value: "3", tone: "red", delta: "WATCH" },
    ],
  },
  summary: {
    title: "Delivery is ahead of plan. System risk is contained. Two decisions need executive input.",
    body: "Frontend and backend workstreams are landing inside the Q2 window. The only visible pressure is database coordination and Q3 hiring approval.",
  },
  focus: [
    {
      title: "Approve the schema sync payload contract",
      body: "Two downstream tasks are waiting on the final database handshake and auth event shape.",
      owner: "OWNER / CTO + DATA",
    },
    {
      title: "Confirm Q3 hiring headcount",
      body: "Open SRE and frontend roles are limiting ramp plans for platform hardening and portal polish.",
      owner: "OWNER / CEO + FINANCE",
    },
  ],
};

export const sprintTimeline = {
  summary: [
    { label: "1 SPRINT DONE" },
    { label: "1 IN PROGRESS" },
    { label: "4 UPCOMING" },
  ],
  items: [
    {
      id: "sprint-1",
      label: "SPRINT 1",
      percent: "100%",
      percentClass: "percent-100",
      tone: "green",
      status: "COMPLETE",
      statusTone: "green",
      deadline: "Apr 1",
      isCurrent: false,
      shimmer: false,
    },
    {
      id: "sprint-2",
      label: "SPRINT 2",
      percent: "68%",
      percentClass: "percent-68",
      tone: "blue",
      status: "IN PROGRESS",
      statusTone: "blue",
      deadline: "Apr 15",
      isCurrent: true,
      shimmer: true,
    },
    {
      id: "sprint-3",
      label: "SPRINT 3",
      percent: "0%",
      percentClass: "percent-0",
      tone: "dim",
      status: "UPCOMING",
      statusTone: "neutral",
      deadline: "May 1",
      isCurrent: false,
      shimmer: false,
    },
    {
      id: "sprint-4",
      label: "SPRINT 4",
      percent: "0%",
      percentClass: "percent-0",
      tone: "dim",
      status: "UPCOMING",
      statusTone: "neutral",
      deadline: "May 15",
      isCurrent: false,
      shimmer: false,
    },
    {
      id: "sprint-5",
      label: "SPRINT 5",
      percent: "0%",
      percentClass: "percent-0",
      tone: "dim",
      status: "UPCOMING",
      statusTone: "neutral",
      deadline: "Jun 1",
      isCurrent: false,
      shimmer: false,
    },
    {
      id: "sprint-6",
      label: "SPRINT 6",
      percent: "0%",
      percentClass: "percent-0",
      tone: "dim",
      status: "UPCOMING",
      statusTone: "neutral",
      deadline: "Jun 15",
      isCurrent: false,
      shimmer: false,
    },
  ],
};

export const workloadBreakdown = {
  donuts: [
    {
      label: "FRONTEND",
      detail: "Frontend",
      tasks: "14 TASKS",
      value: "40%",
      tone: "blue",
      percentClass: "percent-40",
    },
    {
      label: "BACKEND",
      detail: "Backend",
      tasks: "10 TASKS",
      value: "28%",
      tone: "purple",
      percentClass: "percent-28",
    },
    {
      label: "BUGS",
      detail: "Bugs",
      tasks: "6 TASKS",
      value: "18%",
      tone: "red",
      percentClass: "percent-18",
    },
    {
      label: "INFRA",
      detail: "Infra",
      tasks: "5 TASKS",
      value: "14%",
      tone: "amber",
      percentClass: "percent-14",
    },
  ],
};

export const devProfiles = [
  {
    name: "Alex",
    initials: "AL",
    role: "DEV",
    roleTone: "blue",
    avatarTone: "blue",
    workstream: "Frontend",
    sprint: "Sprint 2",
    taskCount: "3 active",
    percent: "60%",
    percentClass: "percent-60",
    status: "FOCUSED",
    statusTone: "blue",
    linkedTasks: ["Landing polish", "Executive metrics tiles"],
  },
  {
    name: "Sam",
    initials: "SA",
    role: "SM",
    roleTone: "purple",
    avatarTone: "purple",
    workstream: "Backend",
    sprint: "Sprint 2",
    taskCount: "2 active",
    percent: "80%",
    percentClass: "percent-80",
    status: "CLEAR",
    statusTone: "green",
    linkedTasks: ["API contract check", "Sprint handoff"],
  },
  {
    name: "Jordan",
    initials: "JO",
    role: "DEV",
    roleTone: "blue",
    avatarTone: "amber",
    workstream: "Auth",
    sprint: "Sprint 2",
    taskCount: "2 active",
    percent: "45%",
    percentClass: "percent-45",
    status: "WATCH",
    statusTone: "amber",
    linkedTasks: ["OAuth edge cases", "Session recovery"],
  },
  {
    name: "Casey",
    initials: "CA",
    role: "SW",
    roleTone: "green",
    avatarTone: "green",
    workstream: "Database",
    sprint: "Sprint 1",
    taskCount: "1 active",
    percent: "90%",
    percentClass: "percent-90",
    status: "BLOCKER",
    statusTone: "red",
    linkedTasks: ["Schema sync payload", "Contract review"],
  },
  {
    name: "Morgan",
    initials: "MO",
    role: "DEV",
    roleTone: "blue",
    avatarTone: "purple",
    workstream: "Testing",
    sprint: "Sprint 3",
    taskCount: "0 active",
    percent: "0%",
    percentClass: "percent-0",
    status: "QUEUED",
    statusTone: "neutral",
    linkedTasks: ["Regression sweep", "QA checklist refresh"],
  },
  {
    name: "Riley",
    initials: "RI",
    role: "DEV",
    roleTone: "blue",
    avatarTone: "red",
    workstream: "DevOps",
    sprint: "Sprint 3",
    taskCount: "0 active",
    percent: "0%",
    percentClass: "percent-0",
    status: "QUEUED",
    statusTone: "neutral",
    linkedTasks: ["Cluster autoscaling", "Release guardrails"],
  },
];

const baseSchedulerTasks = [
  {
    id: "task-1",
    title: "Schema sync payload contract",
    priority: "HIGH",
    assignee: "Casey",
    status: "PENDING",
    source: "BOSS CHAT",
    createdAt: minutesAgo(12),
    sprintRef: "Sprint 2",
  },
  {
    id: "task-2",
    title: "Confirm Q3 hiring headcount",
    priority: "HIGH",
    assignee: "Sam",
    status: "IN REVIEW",
    source: "BOSS CHAT",
    createdAt: minutesAgo(8),
    sprintRef: null,
  },
  {
    id: "task-3",
    title: "Executive metrics tile QA pass",
    priority: "MED",
    assignee: "Alex",
    status: "ASSIGNED",
    source: "BOSS CHAT",
    createdAt: minutesAgo(4),
    sprintRef: "Sprint 2",
  },
];

export const initialTasks = baseSchedulerTasks.map((task) => ({
  ...task,
  isNew: false,
}));

export const initialDocuments = [];

export const initialActivity = [
  {
    id: "activity-1",
    createdAt: minutesAgo(2),
    description: "Task status changed · Executive metrics tile QA pass moved to ASSIGNED",
    meta: "STATUS UPDATE",
    isNew: false,
  },
  {
    id: "activity-2",
    createdAt: minutesAgo(4),
    description: "Task added via Boss Chat · MED priority",
    meta: "BOSS CHAT",
    isNew: false,
  },
  {
    id: "activity-3",
    createdAt: minutesAgo(8),
    description: "Task added via Boss Chat · HIGH priority",
    meta: "BOSS CHAT",
    isNew: false,
  },
  {
    id: "activity-4",
    createdAt: minutesAgo(12),
    description: "Task added via Boss Chat · HIGH priority",
    meta: "BOSS CHAT",
    isNew: false,
  },
  {
    id: "activity-5",
    createdAt: minutesAgo(18),
    description: "Scheduler synced with Sprint 2 review queue",
    meta: "SYSTEM",
    isNew: false,
  },
];

const responseActionTasks = [
  {
    title: "Finalize schema sync payload contract",
    priority: "HIGH",
    assignee: "Casey",
    status: "PENDING",
    sprintRef: "Sprint 2",
  },
  {
    title: "Approve SRE hiring packet",
    priority: "HIGH",
    assignee: "Sam",
    status: "IN REVIEW",
    sprintRef: null,
  },
  {
    title: "Rebalance frontend validation tasks",
    priority: "MED",
    assignee: "Alex",
    status: "ASSIGNED",
    sprintRef: "Sprint 2",
  },
  {
    title: "Lock Q2 milestone narrative",
    priority: "HIGH",
    assignee: "Jordan",
    status: "PENDING",
    sprintRef: "Sprint 2",
  },
  {
    title: "Protect infra bug budget for Sprint 3",
    priority: "LOW",
    assignee: "Riley",
    status: "ASSIGNED",
    sprintRef: "Sprint 3",
  },
];

export const initialChatHistory = [
  {
    id: "chat-1",
    speaker: "boss",
    label: "BIG BOSS",
    text: "Are we on track for the Q2 deadline?",
    refs: [],
    isNew: false,
  },
  {
    id: "chat-2",
    speaker: "agent",
    label: "CODESYNC AGENT",
    text: "Sprint 2 is 68% complete with 4 days remaining. Auth and Backend are ahead. Database is blocked on schema design. This is the only item at risk for the Q2 milestone.",
    refs: ["SPRINT 2", "AUTH", "BACKEND", "DATABASE"],
    actionTask: { ...baseSchedulerTasks[0] },
    schedulerAdded: true,
    isNew: false,
  },
  {
    id: "chat-3",
    speaker: "boss",
    label: "BIG BOSS",
    text: "Which dev is most overloaded?",
    refs: [],
    isNew: false,
  },
  {
    id: "chat-4",
    speaker: "agent",
    label: "CODESYNC AGENT",
    text: "Alex has the highest active task count at 3 tasks across Sprint 2. Jordan has the lowest completion rate at 45%. No developer is critically overloaded right now.",
    refs: ["ALEX", "JORDAN", "SPRINT 2"],
    actionTask: { ...baseSchedulerTasks[2] },
    schedulerAdded: true,
    isNew: false,
  },
  {
    id: "chat-5",
    speaker: "boss",
    label: "BIG BOSS",
    text: "What needs my decision this week?",
    refs: [],
    isNew: false,
  },
  {
    id: "chat-6",
    speaker: "agent",
    label: "CODESYNC AGENT",
    text: "Two items need executive input: unblock the database schema sync payload contract and confirm Q3 hiring headcount. Both decisions affect downstream planning this week.",
    refs: ["DATABASE", "Q3 HIRING", "HEADCOUNT"],
    actionTask: { ...baseSchedulerTasks[1] },
    schedulerAdded: true,
    isNew: false,
  },
];

export const chatResponses = [
  {
    text: "Sprint 2 remains the pacing item. Frontend and Backend are green, while Casey's database contract work is the only blocker holding two linked tasks.",
    refs: ["SPRINT 2", "CASEY", "DATABASE"],
    actionTask: responseActionTasks[0],
  },
  {
    text: "Budget is still contained. Engineering spend is tracking at 72% of sprint allocation and Q2 burn is 68% of the total plan, so staffing decisions matter more than cost right now.",
    refs: ["$48K", "$192K", "HEADCOUNT"],
    actionTask: responseActionTasks[1],
  },
  {
    text: "No single developer is in a failure zone. Alex has the fullest queue, Jordan is the slowest completion path, and Morgan plus Riley have spare capacity waiting on Sprint 3 start.",
    refs: ["ALEX", "JORDAN", "MORGAN", "RILEY"],
    actionTask: responseActionTasks[2],
  },
  {
    text: "The highest-leverage leadership move this week is approving the schema sync contract. It clears database handoff risk and stabilizes the Q2 milestone narrative immediately.",
    refs: ["SCHEMA SYNC", "Q2 MILESTONE"],
    actionTask: responseActionTasks[3],
  },
  {
    text: "Workload is still frontend-heavy at 40 percent. If the mix does not shift next sprint, bugs and infra work will keep competing for the same platform capacity.",
    refs: ["FRONTEND", "BUGS", "INFRA"],
    actionTask: responseActionTasks[4],
  },
];

export const budgetHeadcount = {
  slots: [
    { id: "slot-1", status: "active", label: "Alex" },
    { id: "slot-2", status: "active", label: "Sam" },
    { id: "slot-3", status: "active", label: "Jordan" },
    { id: "slot-4", status: "active", label: "Casey" },
    { id: "slot-5", status: "active", label: "Morgan" },
    { id: "slot-6", status: "active", label: "Riley" },
    { id: "slot-7", status: "open", label: "Open role" },
    { id: "slot-8", status: "open", label: "Open role" },
  ],
  teamBreakdown: [
    { label: "PRODUCT ENG", percent: "50%", percentClass: "percent-50", tone: "blue" },
    { label: "PLATFORM", percent: "33%", percentClass: "percent-33", tone: "purple" },
    { label: "QUALITY", percent: "17%", percentClass: "percent-17", tone: "amber" },
  ],
  sprintBudget: {
    label: "ENGINEERING SPEND / SPRINT",
    value: "$48K",
    meta: "72% utilized",
    percentClass: "percent-72",
    tone: "amber",
  },
  quarterBurn: {
    label: "Q2 TOTAL BURN",
    value: "$192K",
    meta: "of $280K allocated",
    percentClass: "percent-68",
    tone: "green",
    chip: "ON BUDGET",
  },
};
