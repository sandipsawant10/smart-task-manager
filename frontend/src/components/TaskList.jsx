import { useState } from "react";
import TaskCard from "./TaskCard";
import { CheckCircle2, Inbox } from "lucide-react";

const TaskList = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onMarkComplete,
  onSuggestPriority,
  onSuggestDeadline,
}) => {
  const [editingTaskId, setEditingTaskId] = useState(null);

  return (
    <div className="card task-list">
      <div>
        {/* Header Section */}
        <div className="task-list__header">
          <div className="task-list__title">
            <div className="icon-pill">
              <CheckCircle2 strokeWidth={2} />
            </div>
            <div>
              <h2>My Tasks</h2>
              <p className="task-list__subtitle">Track and manage your work</p>
            </div>
          </div>

          <div className="count-pill">
            <span>{tasks.length}</span>
            <span>{tasks.length === 1 ? "task" : "tasks"}</span>
          </div>
        </div>

        {/* Empty State */}
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="icon-pill">
              <Inbox strokeWidth={1.5} />
            </div>
            <h3>No tasks yet</h3>
            <p>Create a task or generate some from a goal to get started.</p>
          </div>
        ) : (
          <ul className="task-list__items">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                isEditing={editingTaskId === task._id}
                onEdit={() => setEditingTaskId(task._id)}
                onCancelEdit={() => setEditingTaskId(null)}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                onMarkComplete={onMarkComplete}
                onSuggestPriority={onSuggestPriority}
                onSuggestDeadline={onSuggestDeadline}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
