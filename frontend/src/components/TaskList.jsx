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
    <div className="group fade-up relative overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:border-slate-300/60 hover:shadow-md">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="space-y-6 p-7">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 p-3">
              <CheckCircle2
                className="h-5 w-5 text-emerald-600"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-950">
                My Tasks
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Track and manage your work
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 rounded-lg border border-slate-200/60 bg-gradient-to-br from-slate-50/80 to-slate-50/40 px-4 py-2.5 backdrop-blur-sm transition-all duration-200 hover:border-slate-300/60 hover:bg-slate-50/60">
            <span className="text-lg font-bold text-slate-900">
              {tasks.length}
            </span>
            <span className="text-sm font-medium text-slate-500">
              {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>
        </div>

        {/* Empty State */}
        {tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200/70 bg-gradient-to-br from-slate-50/80 to-slate-50/40 p-12 text-center transition-all duration-200 hover:bg-slate-50/60">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-slate-200/40">
              <Inbox className="h-7 w-7 text-slate-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-bold text-slate-900">No tasks yet</h3>
            <p className="mt-2 text-sm text-slate-500">
              Create a task or generate some from a goal to get started.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
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
