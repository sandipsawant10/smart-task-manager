import { useState } from "react";

const TaskCard = ({
  task,
  onUpdate,
  onDelete,
  onMarkComplete,
  onSuggestPriority,
  onSuggestDeadline,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title || "");
  const [editDescription, setEditDescription] = useState(
    task.description || "",
  );
  const [editPriority, setEditPriority] = useState(task.priority || "low");
  const [editDeadline, setEditDeadline] = useState(
    task.deadline ? task.deadline.slice(0, 10) : "",
  );

  const handleSave = async () => {
    if (!editTitle.trim()) {
      return;
    }

    const result = await onUpdate(task._id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      deadline: editDeadline,
    });

    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
    setEditPriority(task.priority || "low");
    setEditDeadline(task.deadline ? task.deadline.slice(0, 10) : "");
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />
          <input
            type="text"
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
          />
          <select
            value={editPriority}
            onChange={(event) => setEditPriority(event.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={editDeadline}
            onChange={(event) => setEditDeadline(event.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Deadline: {task.deadline}</p>
          <p>Status: {task.status}</p>
          <div>
            <button onClick={() => onMarkComplete(task._id)}>Complete</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
            <button onClick={() => onSuggestPriority(task._id, task.title)}>
              AI Suggest Priority
            </button>
            <button onClick={() => onSuggestDeadline(task._id, task.title)}>
              AI Suggest Deadline
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskCard;
