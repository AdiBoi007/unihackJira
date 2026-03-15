# ✳ Orchestra Insights

A tactical engineering dashboard for executives — shipping confidence, platform health, and leadership decisions in one screen.

## Overview

Orchestra Insights is a real-time engineering dashboard that gives engineering leaders and executives a single pane of glass into sprint health, developer workloads, blockers, budget, and team capacity. It includes an AI-powered chat interface ("Big Boss Interface") that answers plain-English questions about the team and surfaces actionable tasks directly into a built-in scheduler.

## Features

- **Overview** — Key stats (sprint health, uptime, incidents) with an executive summary and immediate focus items flagged for decision
- **Sprint Timeline** — Visual progress bars for all sprints with status chips and deadline tracking
- **Workload Breakdown** — Donut charts showing how the team's effort is split across Frontend, Backend, Bugs, and Infra
- **Dev Profiles** — Per-developer cards with active sprint, task count, completion ring, and linked tasks
- **Executive Chat** — Stats on boss prompts, actionable agent responses, and tasks captured from chat
- **Budget & Headcount** — Headcount grid, team breakdown, sprint spend, and Q2 burn rate
- **Task Scheduler** — Live task board sourced from chat or manual input, with status cycling, deletion, and activity feed
- **Document Uploads** — Upload SRS files and supporting documentation, tracked in a session library
- **Big Boss Interface** — AI chat panel powered by Groq (llama-3.3-70b-versatile) for natural language Q&A about the team, with follow-up suggestions and one-click task routing to the scheduler

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8 |
| Styling | Custom CSS (no framework) |
| Icons | Lucide React |
| Fonts | Bebas Neue, Syne, DM Mono |
| Backend | Express 5, Node.js |
| AI | Groq SDK (llama-3.3-70b-versatile) |
| State | React Context + useReducer |

## Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- A [Groq API key](https://console.groq.com)

### Installation

```bash
git clone https://github.com/your-org/orchestra-insights.git
cd orchestra-insights
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

### Running the App

**Development (frontend + backend together):**

```bash
npm run dev:all
```

**Or run separately:**

```bash
# Terminal 1 — backend
npm run server

# Terminal 2 — frontend
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:3001`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
orchestra-insights/
├── server.js                        # Express backend, Groq API proxy
├── src/
│   ├── main.jsx                     # React entry point
│   ├── App.jsx                      # Root layout, section observer
│   ├── styles.css                   # All styles (single file)
│   ├── components/
│   │   ├── GlobalChatPanel.jsx      # Big Boss Interface sidebar
│   │   ├── Sidebar.jsx              # Nav, time range, executive summary
│   │   ├── TopBar.jsx               # Header with live status pills
│   │   ├── sections/                # One component per dashboard section
│   │   └── ui/                      # Shared primitives (chips, rings, donuts)
│   ├── context/
│   │   └── DashboardContext.jsx     # Global state via useReducer
│   ├── data/
│   │   ├── mockData.js              # All static data and initial state
│   │   └── bigBossResponses.js      # Keyword-matched AI response library
│   └── utils/
│       └── time.js                  # formatRelativeTime, formatFileSize
└── vite.config.js
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/chat` | Send a message to the Groq LLM |

### Chat Request Body

```json
{
  "messages": [
    { "role": "user", "content": "Are we going to hit the Sprint 2 deadline?" }
  ],
  "model": "llama-3.3-70b-versatile"
}
```

The backend automatically prepends a system prompt configuring the model as a product manager reporting on developer performance in real time.

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `GROQ_API_KEY` | Yes | — | Your Groq API key |
| `PORT` | No | `3001` | Port for the Express server |

## License

MIT
