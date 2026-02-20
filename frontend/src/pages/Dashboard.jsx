import { useState, useEffect } from "react";
import { logout } from "../services/authApi";
import useTaskManager from "../hooks/useTaskManager";
import useAI from "../hooks/useAI";
import TaskForm from "../components/TaskForm";
import GoalGenerator from "../components/GoalGenerator";
import TaskList from "../components/TaskList";
import {
  LogOut,
  CheckCircle2,
  AlertCircle,
  ListTodo,
  Zap,
  TrendingUp,
} from "lucide-react";

function Dashboard() {
  const {
    tasks,
    loading: taskLoading,
    error: taskError,
    fetchTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    handleMarkComplete,
    addGeneratedTasks,
  } = useTaskManager();

  const {
    loading: aiLoading,
    error: aiError,
    generateTasks,
    suggestPriority,
    suggestDeadline,
    getFeedback,
  } = useAI();

  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const loading = taskLoading || aiLoading;

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleGenerateTasks = async (goal) => {
    const result = await generateTasks(goal);
    if (result.success) {
      addGeneratedTasks(result.tasks);
    } else {
      setError(result.error);
    }
    return result;
  };

  const handleSuggestPriority = async (taskId, taskTitle) => {
    const result = await suggestPriority(taskTitle);
    if (result.success) {
      const updateResult = await handleUpdateTask(taskId, {
        priority: result.suggestion,
      });
      if (!updateResult.success) {
        setError(updateResult.error);
      }
    } else {
      setError(result.error);
    }
  };

  const handleSuggestDeadline = async (taskId, taskTitle) => {
    const result = await suggestDeadline(taskTitle);
    if (result.success) {
      const updateResult = await handleUpdateTask(taskId, {
        deadline: result.suggestion,
      });
      if (!updateResult.success) {
        setError(updateResult.error);
      }
    } else {
      setError(result.error);
    }
  };

  const handleProductivityFeedback = async () => {
    const result = await getFeedback();
    if (result.success) {
      alert(result.feedback);
    } else {
      setError(result.error);
    }
  };

  const displayError = error || taskError || aiError;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const highPriorityCount = tasks.filter((t) => t.priority === "high").length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/40 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 p-2.5 shadow-lg">
              <ListTodo className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-950">
                Smart Tasks
              </h1>
              <p className="text-xs font-medium text-slate-500">
                AI-powered workflow
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="group inline-flex items-center gap-2 rounded-lg border border-slate-300/50 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:border-slate-400/50 hover:bg-slate-100 hover:shadow-sm active:scale-95"
          >
            <LogOut className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
        {/* Page Header */}
        <div className="fade-up mb-12 lg:mb-16">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-sky-500 to-blue-600" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
              Dashboard
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Manage your workflow
            </h2>
            <p className="max-w-xl text-base font-normal leading-relaxed text-slate-600">
              Break down goals, prioritize tasks, and ship with confidence. Let
              AI guide your workflow.
            </p>
          </div>
        </div>

        {/* Error Banner */}
        {displayError && (
          <div className="slide-up mb-8 flex items-start gap-3 rounded-lg border border-red-200/60 bg-red-50/70 p-4 backdrop-blur-sm">
            <AlertCircle
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600"
              strokeWidth={2.5}
            />
            <p className="text-sm font-medium text-red-700">{displayError}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="stagger mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Tasks Card */}
          <div className="group relative rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300/60 hover:shadow-md">
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-sky-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Total Tasks
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-950">
                    {tasks.length}
                  </p>
                </div>
                <div className="rounded-lg bg-sky-100/70 p-2.5">
                  <ListTodo
                    className="h-5 w-5 text-sky-600"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500">Across all projects</p>
            </div>
          </div>

          {/* Completed Card */}
          <div className="group relative rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300/60 hover:shadow-md">
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-emerald-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Completed
                  </p>
                  <p className="mt-3 text-3xl font-bold text-emerald-600">
                    {completedCount}
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-100/70 p-2.5">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-600"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Completion
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    {completionRate}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200/70">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 ease-out"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* High Priority Card */}
          <div className="group relative rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300/60 hover:shadow-md">
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    High Priority
                  </p>
                  <p className="mt-3 text-3xl font-bold text-amber-600">
                    {highPriorityCount}
                  </p>
                </div>
                <div className="rounded-lg bg-amber-100/70 p-2.5">
                  <Zap className="h-5 w-5 text-amber-600" strokeWidth={2.5} />
                </div>
              </div>
              <p className="text-xs text-slate-500">Needs attention soon</p>
            </div>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="mb-14 grid gap-8 lg:grid-cols-5">
          {/* Left Column - Goal Generator */}
          <div className="lg:col-span-3">
            <GoalGenerator
              onGenerateTasks={handleGenerateTasks}
              loading={loading}
            />
          </div>

          {/* Right Column - Create Task & Insights */}
          <div className="space-y-5 lg:col-span-2">
            {!showTaskForm ? (
              <button
                onClick={() => setShowTaskForm(true)}
                className="group relative w-full overflow-hidden rounded-lg border border-sky-300/50 bg-gradient-to-r from-sky-50 to-blue-50 px-5 py-3.5 text-xs font-bold text-sky-700 shadow-sm transition-all duration-300 hover:border-sky-400/50 hover:shadow-md hover:bg-white"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <span>+ Create Task</span>
                </div>
              </button>
            ) : (
              <TaskForm
                onCreateTask={handleCreateTask}
                loading={loading}
                onClose={() => setShowTaskForm(false)}
              />
            )}
            <button
              onClick={handleProductivityFeedback}
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4" strokeWidth={2.5} />
                Get Insights
              </div>
            </button>
          </div>
        </div>

        {/* Tasks List Section */}
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onMarkComplete={handleMarkComplete}
          onSuggestPriority={handleSuggestPriority}
          onSuggestDeadline={handleSuggestDeadline}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default Dashboard;
