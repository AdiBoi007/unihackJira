import { taskStatusOrder, taskStatusToneMap } from "../../data/mockData";

const circumference = 282.7;

function TaskStatusDonut({ counts, total }) {
  let offset = 0;

  return (
    <div className="task-donut">
      <svg viewBox="0 0 100 100" width="140" height="140" aria-hidden="true">
        <circle className="donut-track" cx="50" cy="50" r="45" fill="none" strokeWidth="8" />
        {taskStatusOrder.map((status) => {
          const count = counts[status];
          const segmentLength = total ? (count / total) * circumference : 0;
          const dashOffset = -offset;
          offset += segmentLength;

          if (!count) {
            return null;
          }

          return (
            <circle
              className={`task-donut__segment tone-${taskStatusToneMap[status]}`}
              cx="50"
              cy="50"
              fill="none"
              key={status}
              r="45"
              strokeWidth="8"
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 50 50)"
            />
          );
        })}
      </svg>

      <div className="task-donut__center">
        <span className="task-donut__value">{total}</span>
        <span className="task-donut__label">TASKS</span>
      </div>
    </div>
  );
}

export default TaskStatusDonut;
