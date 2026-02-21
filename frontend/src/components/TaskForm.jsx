import { useState } from "react";
import { Plus, Loader2, X } from "lucide-react";

const TaskForm = ({ onCreateTask, loading, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (deadline) {
      const today = new Date().toISOString().split("T")[0];
      if (deadline < today) {
        alert("Deadline cannot be in the past");
        return;
      }
    }

    const result = await onCreateTask({
      title,
      description,
      priority,
      deadline,
    });

    if (result.success) {
      setTitle("");
      setDescription("");
      setPriority("low");
      setDeadline("");
      if (onClose) onClose();
    }
  };

  return (
    <div className="form-card">
      <div>
        {/* Header */}
        <div className="form-header">
          <div className="form-title">
            <div className="icon-pill">
              <Plus strokeWidth={2} />
            </div>
            <div>
              <h3>New Task</h3>
              <p className="task-list__subtitle">Add to your workflow</p>
            </div>
          </div>
          {onClose && (
            <button
              className="btn btn-ghost"
              onClick={onClose}
              aria-label="Close form"
            >
              <X strokeWidth={2} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="field">
            <label className="field-label">Task Title</label>
            <input
              className="field-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to accomplish?"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="field">
            <label className="field-label">Description</label>
            <input
              className="field-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more context..."
              disabled={loading}
            />
          </div>

          {/* Priority & Deadline Grid */}
          <div className="field-row">
            <div className="field">
              <label className="field-label">Priority</label>
              <select
                className="field-input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                disabled={loading}
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
                value={deadline}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            <div className="btn-content">
              {loading ? (
                <>
                  <Loader2 strokeWidth={2} />
                  <span>Creating Task...</span>
                </>
              ) : (
                <>
                  <Plus strokeWidth={2} />
                  <span>Create Task</span>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
