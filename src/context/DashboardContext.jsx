import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import {
  chatResponses,
  initialActivity,
  initialChatHistory,
  initialDocuments,
  initialTasks,
  navItems,
  taskStatusOrder,
} from "../data/mockData";

const DashboardContext = createContext(null);

const initialState = {
  activeSection: navItems[0].id,
  activity: initialActivity,
  chatHistory: initialChatHistory,
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
    case "ADD_BOSS_MESSAGE":
      return {
        ...state,
        chatHistory: [
          ...state.chatHistory.map((message) => ({ ...message, isNew: false })),
          action.payload,
        ],
      };
    case "ADD_AGENT_MESSAGE":
      return {
        ...state,
        chatHistory: [
          ...state.chatHistory.map((message) => ({ ...message, isNew: false })),
          action.payload,
        ],
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
  const responseIndexRef = useRef(0);
  const timeoutIdsRef = useRef([]);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
    };
  }, []);

  const sendMessage = (message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const now = new Date();
    const bossMessage = {
      id: `boss-${now.getTime()}`,
      speaker: "boss",
      label: "BIG BOSS",
      text: trimmedMessage,
      refs: [],
      isNew: true,
    };

    dispatch({ type: "ADD_BOSS_MESSAGE", payload: bossMessage });

    const response = chatResponses[responseIndexRef.current % chatResponses.length];
    responseIndexRef.current += 1;

    const timeoutId = window.setTimeout(() => {
      dispatch({
        type: "ADD_AGENT_MESSAGE",
        payload: {
          id: `agent-${Date.now()}`,
          speaker: "agent",
          label: "CODESYNC AGENT",
          text: response.text,
          refs: response.refs,
          actionTask: response.actionTask,
          schedulerAdded: false,
          isNew: true,
        },
      });
    }, 700);

    timeoutIdsRef.current.push(timeoutId);
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
    const message = state.chatHistory.find((entry) => entry.id === messageId);

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
