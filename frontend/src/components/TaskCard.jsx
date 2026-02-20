import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Edit2,
  Trash2,
  Zap,
  Clock,
  Calendar,
  X,
  Save,
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200/50";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200/50";
      case "low":
        return "bg-emerald-100 text-emerald-700 border-emerald-200/50";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200/50";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200/50";
      case "pending":
        return "bg-slate-100 text-slate-600 border-slate-200/50";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200/50";
    }
  };

  const isCompleted = task.status === "completed";

  return (
    <li className="list-none">
      {isEditing ? (
        <div className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/40 shadow-sm transition-all duration-300">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="space-y-5 p-6">
            {/* Edit Header */}
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-100/50 p-2">
                  <Edit2 className="h-4 w-4 text-cyan-600" strokeWidth={2.5} />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Edit Task</h4>
              </div>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Form Fields */}
            <div>
              <label className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-slate-600">
                Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                className="w-full rounded-lg border border-slate-200/60 bg-white/60 px-4 py-3 text-sm font-normal text-slate-900 transition-all duration-200 focus:border-cyan-400/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200/50"
              />
            </div>

            <div>
              <label className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-slate-600">
                Description
              </label>
              <input
                type="text"
                value={editDescription}
                onChange={(event) => setEditDescription(event.target.value)}
                className="w-full rounded-lg border border-slate-200/60 bg-white/60 px-4 py-3 text-sm font-normal text-slate-900 transition-all duration-200 focus:border-cyan-400/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200/50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-slate-600">
                  Priority
                </label>
                <select
                  value={editPriority}
                  onChange={(event) => setEditPriority(event.target.value)}
                  className="w-full rounded-lg border border-slate-200/60 bg-white/60 px-4 py-3 text-sm font-medium text-slate-900 transition-all duration-200 focus:border-cyan-400/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200/50"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div>
                <label className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-slate-600">
                  Deadline
                </label>
                <input
                  type="date"
                  value={editDeadline}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(event) => setEditDeadline(event.target.value)}
                  className="w-full rounded-lg border border-slate-200/60 bg-white/60 px-4 py-3 text-sm font-medium text-slate-900 transition-all duration-200 focus:border-cyan-400/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200/50"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 border-t border-slate-200/50 pt-5">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="group/save flex-1 relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-blue-700 opacity-0 transition-opacity duration-300 group-hover/save:opacity-100" />
                <div className="relative flex items-center justify-center gap-2">
                  <Save className="h-4 w-4" strokeWidth={2.5} />
                  Save Changes
                </div>
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 rounded-lg border border-slate-200/60 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-slate-300/60 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`group relative overflow-hidden rounded-xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/30 shadow-sm transition-all duration-300 hover:border-slate-300/60 hover:shadow-md ${
          isCompleted ? "border-emerald-200/40 bg-gradient-to-br from-emerald-50/60 to-emerald-50/20" : ""
        }`}>
          <div className={`absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            isCompleted
              ? "bg-gradient-to-br from-emerald-50/50 to-transparent"
              : "bg-gradient-to-br from-blue-50/30 to-transparent"
          }`} />
          
          <div className="space-y-5 p-6">
            {/* Task Content */}
            <div className="min-w-0">
              <h3 className={`text-base font-bold tracking-tight transition-all duration-300 ${
                isCompleted 
                  ? "text-slate-400 line-through" 
                  : "text-slate-950"
              }`}>
                {task.title}
              </h3>

              {task.description && (
                <p className={`mt-2 line-clamp-2 text-sm transition-all duration-300 ${
                  isCompleted
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}>
                  {task.description}
                </p>
              )}

              {/* Badges & Metadata */}
              <div className="mt-4 flex flex-wrap gap-2.5">
                {/* Priority Badge */}
                <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${getPriorityColor(task.priority)}`}>
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>

                {/* Status Badge */}
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${getStatusColor(task.status)}`}>
                  <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                  {task.status === "completed" ? "✓ Done" : "Pending"}
                </span>

                {/* Deadline Badge */}
                {task.deadline && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50/70 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100/70">
                    <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 border-t border-slate-200/50 pt-4">
              <button
                onClick={handleComplete}
                disabled={isLoading}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                  isCompleted
                    ? "border border-emerald-200/60 bg-emerald-50/70 text-emerald-700 hover:bg-emerald-100/70"
                    : "border border-emerald-200/40 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100/60 hover:border-emerald-200/60"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>{isCompleted ? "Completed" : "Mark Done"}</span>
              </button>

              <button
                onClick={onEdit}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200/60 bg-slate-50/70 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all duration-200 hover:border-slate-300/60 hover:bg-slate-100/70 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Edit2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Edit</span>
              </button>

              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200/60 bg-red-50/70 px-3.5 py-2 text-xs font-bold text-red-700 transition-all duration-200 hover:border-red-200/80 hover:bg-red-100/70 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Delete</span>
              </button>

              <button
                onClick={handleSuggestPriority}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-amber-200/60 bg-amber-50/70 px-3.5 py-2 text-xs font-bold text-amber-700 transition-all duration-200 hover:border-amber-200/80 hover:bg-amber-100/70 disabled:cursor-not-allowed disabled:opacity-50"
                title="Get AI-powered priority suggestion"
              >
                <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Priority</span>
              </button>

              <button
                onClick={handleSuggestDeadline}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-sky-200/60 bg-sky-50/70 px-3.5 py-2 text-xs font-bold text-sky-700 transition-all duration-200 hover:border-sky-200/80 hover:bg-sky-100/70 disabled:cursor-not-allowed disabled:opacity-50"
                title="Get AI-powered deadline suggestion"
              >
                <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Deadline</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};
};

export default TaskCard;
