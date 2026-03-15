import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import {
  initialActivity,
  initialChatHistory,
  initialDocuments,
  initialTasks,
  navItems,
  taskStatusOrder,
} from "../data/mockData";
import { getBigBossResponse } from "../data/bigBossResponses";

const DashboardContext = createContext(null);

function buildActionTask(matchedResponse) {
  if (!matchedResponse.hasAction) {
    return null;
  }

  const lowerResponse = matchedResponse.response.toLowerCase();

  if (lowerResponse.includes("schema sync payload contract")) {
    return {
      assignee: "Casey",
      priority: "HIGH",
      sprintRef: "Sprint 2",
      status: "PENDING",
      title: "Unblock database schema contract",
    };
  }

  if (lowerResponse.includes("move the new feature to sprint 3")) {
    return {
      assignee: "Jordan",
      priority: "MED",
      sprintRef: "Sprint 3",
      status: "ASSIGNED",
      title: "Move Slack login scope to Sprint 3",
    };
  }

  if (lowerResponse.includes("senior backend engineer")) {
    return {
      assignee: "Sam",
      priority: "HIGH",
      sprintRef: null,
      status: "IN REVIEW",
      title: "Open senior backend hiring approval",
    };
  }

  return {
    assignee: "Casey",
    priority: "HIGH",
    sprintRef: "Sprint 2",
    status: "PENDING",
    title: "Resolve executive blocker",
  };
}

const initialState = {
  activeSection: navItems[0].id,
  activity: initialActivity,
  bbChatHistory: initialChatHistory,
  bbIsTyping: false,
  bbThinkingStage: 0,
  chatHistory: [],
  chatPanelOpen: true,
  documents: initialDocuments,
  tasks: initialTasks,
  timeRange: "30d",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_SECTION":
      return {
        ...state,
        activeSection: action.payload,
      };
    case "SET_TIME_RANGE":
      return {
        ...state,
        timeRange: action.payload,
      };
    case "ADD_BB_MESSAGE":
      return {
        ...state,
        bbChatHistory: [
          ...state.bbChatHistory.map((message) => ({ ...message, isNew: false })),
          action.payload,
        ],
        chatHistory: [
          ...state.chatHistory.map((message) => ({ ...message, isNew: false })),
          action.payload,
        ],
      };
    case "SET_BB_TYPING":
      return {
        ...state,
        bbIsTyping: action.payload,
      };
    case "SET_BB_THINKING_STAGE":
      return {
        ...state,
        bbThinkingStage: action.payload,
      };
    case "ADD_DOCUMENTS":
      return {
        ...state,
        documents: [
          ...action.payload.documents,
          ...state.documents.map((document) => ({ ...document, isNew: false })),
        ],
      };
    case "ADD_TASK_FROM_CHAT":
      return {
        ...state,
        activity: [
          action.payload.activity,
          ...state.activity.map((item) => ({ ...item, isNew: false })),
        ].slice(0, 12),
        bbChatHistory: state.bbChatHistory.map((message) =>
          message.id === action.payload.messageId
            ? { ...message, schedulerAdded: true, isNew: false }
            : message,
        ),
        chatHistory: state.chatHistory.map((message) =>
          message.id === action.payload.messageId
            ? { ...message, schedulerAdded: true, isNew: false }
            : message,
        ),
        tasks: [action.payload.task, ...state.tasks.map((task) => ({ ...task, isNew: false }))],
      };
    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        activity: [
          action.payload.activity,
          ...state.activity.map((item) => ({ ...item, isNew: false })),
        ].slice(0, 12),
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.nextStatus, isNew: false }
            : { ...task, isNew: false },
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        activity: [
          action.payload.activity,
          ...state.activity.map((item) => ({ ...item, isNew: false })),
        ].slice(0, 12),
        tasks: state.tasks.filter((task) => task.id !== action.payload.taskId),
      };
    case "DELETE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.filter((document) => document.id !== action.payload),
      };
    case "TOGGLE_CHAT_PANEL":
      return {
        ...state,
        chatPanelOpen: !state.chatPanelOpen,
      };
    default:
      return state;
  }
}

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timeoutIdsRef = useRef([]);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
    };
  }, []);

  const sendMessage = (message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || state.bbIsTyping) {
      return;
    }

    const now = new Date();
    const bossMessage = {
      content: trimmedMessage,
      id: `bb_u_${now.getTime()}`,
      isNew: true,
      label: "BIG BOSS",
      refs: [],
      role: "user",
      speaker: "boss",
      tags: [],
      text: trimmedMessage,
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const thinkingTime = Math.floor(Math.random() * 2400) + 2800;

    dispatch({ type: "ADD_BB_MESSAGE", payload: bossMessage });
    dispatch({ type: "SET_BB_TYPING", payload: true });
    dispatch({ type: "SET_BB_THINKING_STAGE", payload: 1 });

    const stageTwoTimeoutId = window.setTimeout(() => {
      dispatch({ type: "SET_BB_THINKING_STAGE", payload: 2 });
    }, thinkingTime * 0.3);

    const stageThreeTimeoutId = window.setTimeout(() => {
      dispatch({ type: "SET_BB_THINKING_STAGE", payload: 3 });
    }, thinkingTime * 0.65);

    const stageFourTimeoutId = window.setTimeout(() => {
      dispatch({ type: "SET_BB_THINKING_STAGE", payload: 4 });
    }, thinkingTime * 0.85);

    const responseTimeoutId = window.setTimeout(() => {
      const matchedResponse = getBigBossResponse(trimmedMessage);
      const responseText = matchedResponse.response;
      const tags = matchedResponse.tags ?? [];

      dispatch({
        type: "ADD_BB_MESSAGE",
        payload: {
          actionLabel: matchedResponse.actionLabel ?? null,
          actionTask: buildActionTask(matchedResponse),
          content: responseText,
          hasAction: matchedResponse.hasAction,
          id: `bb_a_${Date.now()}`,
          isNew: true,
          label: "ORCHESTRA AGENT",
          refs: tags,
          role: "agent",
          schedulerAdded: false,
          speaker: "agent",
          tags,
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      });

      dispatch({ type: "SET_BB_TYPING", payload: false });
      dispatch({ type: "SET_BB_THINKING_STAGE", payload: 0 });
    }, thinkingTime);

    timeoutIdsRef.current.push(
      stageTwoTimeoutId,
      stageThreeTimeoutId,
      stageFourTimeoutId,
      responseTimeoutId,
    );
  };

  const addDocuments = (files, category) => {
    const fileList = Array.from(files || []);

    if (!fileList.length) {
      return;
    }

    const uploadedAt = new Date();
    const documents = fileList.map((file, index) => {
      const nameParts = file.name.split(".");
      const extension = nameParts.length > 1 ? nameParts.pop().toUpperCase() : "FILE";

      return {
        category: category === "srs" ? "SRS" : "DOCS",
        extension,
        id: `document-${uploadedAt.getTime()}-${index}`,
        isNew: true,
        name: file.name,
        size: file.size,
        uploadedAt,
      };
    });

    dispatch({
      type: "ADD_DOCUMENTS",
      payload: {
        documents,
      },
    });
  };

  const addTaskFromMessage = (messageId) => {
    const message = state.bbChatHistory.find((entry) => entry.id === messageId);

    if (!message?.actionTask || message.schedulerAdded) {
      return;
    }

    const createdAt = new Date();
    const task = {
      ...message.actionTask,
      createdAt,
      id: `task-${createdAt.getTime()}`,
      isNew: true,
      source: "BOSS CHAT",
    };

    dispatch({
      type: "ADD_TASK_FROM_CHAT",
      payload: {
        activity: {
          id: `activity-${createdAt.getTime()}`,
          createdAt,
          description: `Task added via Boss Chat · ${task.priority} priority`,
          meta: "BOSS CHAT",
          isNew: true,
        },
        messageId,
        task,
      },
    });
  };

  const updateTaskStatus = (taskId) => {
    const task = state.tasks.find((entry) => entry.id === taskId);

    if (!task) {
      return;
    }

    const currentIndex = taskStatusOrder.indexOf(task.status);
    const nextStatus = taskStatusOrder[(currentIndex + 1) % taskStatusOrder.length];
    const createdAt = new Date();

    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: {
        activity: {
          id: `activity-${createdAt.getTime()}`,
          createdAt,
          description: `Task status changed · ${task.title} moved to ${nextStatus}`,
          meta: "STATUS UPDATE",
          isNew: true,
        },
        nextStatus,
        taskId,
      },
    });
  };

  const deleteTask = (taskId) => {
    const task = state.tasks.find((entry) => entry.id === taskId);

    if (!task) {
      return;
    }

    const createdAt = new Date();

    dispatch({
      type: "DELETE_TASK",
      payload: {
        activity: {
          id: `activity-${createdAt.getTime()}`,
          createdAt,
          description: `Task removed · ${task.title}`,
          meta: task.source,
          isNew: true,
        },
        taskId,
      },
    });
  };

  const removeDocument = (documentId) => {
    dispatch({
      type: "DELETE_DOCUMENT",
      payload: documentId,
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        addTaskFromMessage,
        addDocuments,
        deleteTask,
        removeDocument,
        sendMessage,
        setActiveSection: (sectionId) =>
          dispatch({ type: "SET_ACTIVE_SECTION", payload: sectionId }),
        setTimeRange: (range) => dispatch({ type: "SET_TIME_RANGE", payload: range }),
        toggleChatPanel: () => dispatch({ type: "TOGGLE_CHAT_PANEL" }),
        updateTaskStatus,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }

  return context;
}
