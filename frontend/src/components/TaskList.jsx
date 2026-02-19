import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  onUpdate,
  onDelete,
  onMarkComplete,
  onSuggestPriority,
  onSuggestDeadline,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onMarkComplete={onMarkComplete}
          onSuggestPriority={onSuggestPriority}
          onSuggestDeadline={onSuggestDeadline}
        />
      ))}
    </ul>
  );
};

export default TaskList;
