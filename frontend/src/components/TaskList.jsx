import { useState } from "react";
import TaskCard from "./TaskCard";

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
    <ul>
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
  );
};

export default TaskList;
