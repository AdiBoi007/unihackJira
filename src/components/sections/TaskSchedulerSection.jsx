import { X } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import StatusChip from "../ui/StatusChip";
import TaskStatusDonut from "../ui/TaskStatusDonut";
import { devProfiles, priorityToneMap, taskStatusOrder, taskStatusToneMap } from "../../data/mockData";
import { useDashboard } from "../../context/DashboardContext";
import { formatRelativeTime } from "../../utils/time";

function TaskSchedulerSection() {
  const { activity, deleteTask, tasks, updateTaskStatus } = useDashboard();
  const totalTasks = tasks.length;
  const taskCountsByStatus = taskStatusOrder.reduce(
    (accumulator, status) => ({
      ...accumulator,
      [status]: tasks.filter((task) => task.status === status).length,
    }),
    {},
  );

  const assigneeLoad = devProfiles
    .map((developer) => ({
      avatarTone: developer.avatarTone,
      count: tasks.filter((task) => task.assignee === developer.name).length,
      initials: developer.initials,
      name: developer.name,
    }))
    .sort((first, second) => second.count - first.count);

  const maxAssigneeCount = assigneeLoad[0]?.count || 1;

  return (
    <section className="dashboard-section" data-section id="task-scheduler">
      <SectionHeader code="07 — TASK SCHEDULER" title="Track chat requests as live work" />

      <div className="scheduler-layout">
        <article className="scheduler-panel scheduler-panel--tasks">
          <div className="scheduler-panel__header">
            <span className="summary-card__label">TASK INTAKE</span>
            <span className="scheduler-panel__count">{tasks.length} LIVE ITEMS</span>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <article className={task.isNew ? "task-card is-new" : "task-card"} key={task.id}>
                <button
                  aria-label={`Delete ${task.title}`}
                  className="task-card__delete"
                  onClick={() => deleteTask(task.id)}
                  type="button"
                >
                  <X size={12} />
                </button>

                <div className="task-card__header">
                  <div className="task-card__title-block">
                    <h3>{task.title}</h3>
                    <div className="task-card__chips">
                      <span className={`priority-chip tone-${priorityToneMap[task.priority]}`}>
                        {task.priority}
                      </span>
                      <span
                        className={
                          task.source === "BOSS CHAT"
                            ? "source-chip source-chip--boss"
                            : "source-chip source-chip--manual"
                        }
                      >
                        {task.source}
                      </span>
                      <span className="task-card__time">{formatRelativeTime(task.createdAt)}</span>
                    </div>
                  </div>

                  <button
                    className={`task-status-chip tone-${taskStatusToneMap[task.status]}`}
                    onClick={() => updateTaskStatus(task.id)}
                    type="button"
                  >
                    {task.status}
                  </button>
                </div>

                <div className="task-card__footer">
                  <span>ASSIGNEE / {task.assignee}</span>
                  <span>{task.sprintRef ? `SPRINT / ${task.sprintRef}` : "SPRINT / BACKLOG"}</span>
                </div>
              </article>
            ))}
          </div>
        </article>

        <div className="scheduler-summary">
          <article className="scheduler-panel">
            <div className="scheduler-panel__header">
              <span className="summary-card__label">TASK BREAKDOWN</span>
            </div>

            <div className="scheduler-breakdown">
              <TaskStatusDonut counts={taskCountsByStatus} total={totalTasks} />

              <div className="scheduler-breakdown__legend">
                {taskStatusOrder.map((status) => (
                  <div className="scheduler-breakdown__row" key={status}>
                    <span className={`legend-dot tone-${taskStatusToneMap[status]}`} />
                    <span>{status}</span>
                    <span>{taskCountsByStatus[status]}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="scheduler-panel">
            <div className="scheduler-panel__header">
              <span className="summary-card__label">BY ASSIGNEE</span>
            </div>

            <div className="assignee-list">
              {assigneeLoad.map((assignee) => {
                const fillCount = assignee.count
                  ? Math.max(1, Math.round((assignee.count / maxAssigneeCount) * 5))
                  : 0;

                return (
                  <div className="assignee-row" key={assignee.name}>
                    <div className="assignee-row__identity">
                      <div className={`assignee-row__avatar tone-${assignee.avatarTone}`}>
                        {assignee.initials}
                      </div>
                      <span>{assignee.name}</span>
                    </div>

                    <span className="assignee-row__badge">{assignee.count}</span>

                    <div className="assignee-row__bar" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          className={index < fillCount ? "assignee-row__cell is-filled" : "assignee-row__cell"}
                          key={`${assignee.name}-${index}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="scheduler-panel">
            <div className="scheduler-panel__header">
              <span className="summary-card__label">RECENT ACTIVITY</span>
            </div>

            <div className="activity-feed">
              {activity.slice(0, 5).map((entry) => (
                <div className={entry.isNew ? "activity-item is-new" : "activity-item"} key={entry.id}>
                  <span className="activity-item__time">{formatRelativeTime(entry.createdAt)}</span>
                  <p>{entry.description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default TaskSchedulerSection;
