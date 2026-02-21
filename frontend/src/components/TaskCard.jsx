import { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  Edit2,
  Trash2,
  Zap,
  Clock,
  Calendar,
  X,
  Save,
  MoreVertical,
} from "lucide-react";

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
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
    setEditPriority(task.priority || "low");
    setEditDeadline(task.deadline ? task.deadline.slice(0, 10) : "");
  }, [task]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMenu]);

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

  const isCompleted = task.status === "completed";

  return (
    <li>
      {isEditing ? (
        <div className="task-card">
          <div className="form-card">
            {/* Edit Header */}
            <div className="form-header">
              <div className="form-title">
                <div className="icon-pill">
                  <Edit2 strokeWidth={2} />
                </div>
                <h4>Edit Task</h4>
              </div>
              <button
                className="btn btn-ghost"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X strokeWidth={2} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="field">
              <label className="field-label">Title</label>
              <input
                className="field-input"
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label">Description</label>
              <input
                className="field-input"
                type="text"
                value={editDescription}
                onChange={(event) => setEditDescription(event.target.value)}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Priority</label>
                <select
                  className="field-input"
                  value={editPriority}
                  onChange={(event) => setEditPriority(event.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="field">
                <label className="field-label">Deadline</label>
                <input
                  className="field-input"
                  type="date"
                  value={editDeadline}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(event) => setEditDeadline(event.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="task-actions">
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={isLoading}
              >
                <Save strokeWidth={2} />
                Save Changes
              </button>
              <button
                className="btn"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`task-card ${isCompleted ? "task-card--done" : ""}`}>
          <div>
            {/* Task Header with 3-dot menu */}
            <div className="task-card__head">
              <div>
                <h3 className="task-card__title">{task.title}</h3>

                {task.description && (
                  <p className="task-card__desc">{task.description}</p>
                )}
              </div>

              {/* 3-dot Menu */}
              <div className="task-menu" ref={menuRef}>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <MoreVertical strokeWidth={2} />
                </button>

                {showMenu && (
                  <div className="task-menu__panel">
                    <button
                      onClick={() => {
                        onEdit();
                        setShowMenu(false);
                      }}
                      disabled={isLoading}
                      className="task-menu__item"
                    >
                      <Edit2 strokeWidth={2} />
                      Edit Task
                    </button>
                    <button
                      onClick={() => {
                        handleSuggestPriority();
                        setShowMenu(false);
                      }}
                      disabled={isLoading}
                      className="task-menu__item"
                    >
                      <Zap strokeWidth={2} />
                      Suggest Priority
                    </button>
                    <button
                      onClick={() => {
                        handleSuggestDeadline();
                        setShowMenu(false);
                      }}
                      disabled={isLoading}
                      className="task-menu__item"
                    >
                      <Clock strokeWidth={2} />
                      Suggest Deadline
                    </button>
                    <div className="task-menu__divider" />
                    <button
                      onClick={() => {
                        handleDelete();
                        setShowMenu(false);
                      }}
                      disabled={isLoading}
                      className="task-menu__item task-menu__item--danger"
                    >
                      <Trash2 strokeWidth={2} />
                      Delete Task
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Badges & Metadata */}
            <div className="task-chips">
              {/* Priority Badge */}
              <span className={`task-chip task-chip--${task.priority}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>

              {/* Deadline */}
              {task.deadline && (
                <span className="task-meta">
                  <Calendar strokeWidth={2} />
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
              )}

              {/* Status Icon Only */}
              {isCompleted && (
                <span className="task-chip task-chip--done">
                  <CheckCircle2 strokeWidth={2} />
                  Done
                </span>
              )}
            </div>

            {/* Complete Button */}
            {!isCompleted && (
              <button
                className="btn"
                onClick={handleComplete}
                disabled={isLoading}
              >
                <CheckCircle2 strokeWidth={2} />
                <span>Mark Complete</span>
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskCard;
