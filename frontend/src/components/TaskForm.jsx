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
    <div className="group fade-up relative overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:border-slate-300/60 hover:shadow-md">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="space-y-5 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5 flex-1">
            <div className="rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 p-3">
              <Plus className="h-5 w-5 text-sky-600" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-950">
                New Task
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                Add to your workflow
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close form"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Title */}
          <div>
            <label className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-slate-600">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to accomplish?"
              disabled={loading}
              className="w-full rounded-lg border border-slate-200/70 bg-slate-50/50 px-4 py-3 text-sm font-normal text-slate-900 placeholder-slate-400/70 transition-all duration-200 focus:border-sky-400/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-slate-600">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more context..."
              disabled={loading}
              className="w-full rounded-lg border border-slate-200/70 bg-slate-50/50 px-4 py-3 text-sm font-normal text-slate-900 placeholder-slate-400/70 transition-all duration-200 focus:border-sky-400/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Priority & Deadline Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-slate-600">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-slate-200/70 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 transition-all duration-200 focus:border-sky-400/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                value={deadline}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-slate-200/70 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 transition-all duration-200 focus:border-sky-400/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group/btn relative mt-1 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-700 to-blue-700 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
            <div className="relative flex items-center justify-center gap-2.5">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                  <span>Creating Task...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
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
