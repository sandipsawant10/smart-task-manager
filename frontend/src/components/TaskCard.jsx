import { useState, useEffect } from "react";

const TaskCard = ({
  task,
  isEditing,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  onMarkComplete,
  onSuggestPriority,
  onSuggestDeadline,
}) => {
  const [editTitle, setEditTitle] = useState(task.title || "");
  const [editDescription, setEditDescription] = useState(
    task.description || "",
  );
  const [editPriority, setEditPriority] = useState(task.priority || "low");
  const [editDeadline, setEditDeadline] = useState(
    task.deadline ? task.deadline.slice(0, 10) : "",
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
    setEditPriority(task.priority || "low");
    setEditDeadline(task.deadline ? task.deadline.slice(0, 10) : "");
  }, [task]);

  const handleSave = async () => {
    if (!editTitle.trim() || isLoading) {
      return;
    }

    if (editDeadline) {
      const today = new Date().toISOString().split("T")[0];
      if (editDeadline < today) {
        alert("Deadline cannot be in the past");
        return;
      }
    }

    setIsLoading(true);
    const result = await onUpdate(task._id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      deadline: editDeadline,
    });

    setIsLoading(false);
    if (result.success) {
      onCancelEdit();
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
    setEditPriority(task.priority || "low");
    setEditDeadline(task.deadline ? task.deadline.slice(0, 10) : "");
    onCancelEdit();
  };

  const handleComplete = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await onMarkComplete(task._id);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await onDelete(task._id);
    setIsLoading(false);
  };

  const handleSuggestPriority = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await onSuggestPriority(task._id, task.title);
    setIsLoading(false);
  };

  const handleSuggestDeadline = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await onSuggestDeadline(task._id, task.title);
    setIsLoading(false);
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
            min={new Date().toISOString().split("T")[0]}
            onChange={(event) => setEditDeadline(event.target.value)}
          />
          <button onClick={handleSave} disabled={isLoading}>Save</button>
          <button onClick={handleCancel} disabled={isLoading}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Deadline: {task.deadline}</p>
          <p>Status: {task.status}</p>
          <div>
            <button onClick={handleComplete} disabled={isLoading}>Complete</button>
            <button onClick={onEdit} disabled={isLoading}>Edit</button>
            <button onClick={handleDelete} disabled={isLoading}>Delete</button>
            <button onClick={handleSuggestPriority} disabled={isLoading}>
              AI Suggest Priority
            </button>
            <button onClick={handleSuggestDeadline} disabled={isLoading}>
              AI Suggest Deadline
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskCard;
