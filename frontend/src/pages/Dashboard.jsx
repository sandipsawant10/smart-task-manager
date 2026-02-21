import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
  const [insightsMessage, setInsightsMessage] = useState("");
  const [showInsights, setShowInsights] = useState(false);
  const loading = taskLoading || aiLoading;

  const insightsItems = insightsMessage
    .split(/\r?\n|•/)
    .map((item) => item.replace(/^[-\u2013\u2014]\s*/, "").trim())
    .filter(Boolean);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!showInsights) return undefined;
    const timer = setTimeout(() => {
      handleCloseInsights();
    }, 6000);
    return () => clearTimeout(timer);
  }, [showInsights]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    // window.location.href = "/login";
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
      setInsightsMessage(result.feedback);
      setShowInsights(true);
    } else {
      setError(result.error);
    }
  };

  const handleCloseInsights = () => {
    setShowInsights(false);
    setInsightsMessage("");
  };

  const displayError = error || taskError || aiError;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const highPriorityCount = tasks.filter((t) => t.priority === "high").length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="app-shell">
      <div className="dashboard">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">
              <ListTodo strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="brand-title">Smart Tasks</h1>
              <p className="brand-subtitle">AI-powered workflow</p>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={handleLogout}>
            <LogOut strokeWidth={2} />
            <span>Sign Out</span>
          </button>
        </header>

        <main className="content">
          <section className="page-header">
            <h2 className="page-title">Manage your workflow</h2>
            <p className="page-subtitle">
              Break down goals, prioritize tasks, and ship with confidence. Let
              AI guide your workflow.
            </p>
          </section>

          {displayError && (
            <div className="alert">
              <AlertCircle strokeWidth={2} />
              <p>{displayError}</p>
            </div>
          )}

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <p className="stat-label">Total Tasks</p>
                  <p className="stat-value">{tasks.length}</p>
                </div>
                <div className="stat-icon">
                  <ListTodo strokeWidth={2} />
                </div>
              </div>
              <p className="stat-foot">Across all projects</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <p className="stat-label">Completed</p>
                  <p className="stat-value">{completedCount}</p>
                </div>
                <div className="stat-icon">
                  <CheckCircle2 strokeWidth={2} />
                </div>
              </div>
              <div className="meta-row">
                <span>Progress</span>
                <span>{completionRate}%</span>
              </div>
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <p className="stat-label">High Priority</p>
                  <p className="stat-value">{highPriorityCount}</p>
                </div>
                <div className="stat-icon">
                  <Zap strokeWidth={2} />
                </div>
              </div>
              <p className="stat-foot">Needs attention</p>
            </div>
          </section>

          <section className="workflow">
            <div className="card">
              <GoalGenerator
                onGenerateTasks={handleGenerateTasks}
                loading={loading}
              />
            </div>
            <div className="card">
              {!showTaskForm ? (
                <button className="btn" onClick={() => setShowTaskForm(true)}>
                  <span>+ Create Task</span>
                </button>
              ) : (
                <TaskForm
                  onCreateTask={handleCreateTask}
                  loading={loading}
                  onClose={() => setShowTaskForm(false)}
                />
              )}
              <button
                className="btn btn-primary"
                onClick={handleProductivityFeedback}
                disabled={loading}
              >
                <TrendingUp strokeWidth={2} />
                Get Insights
              </button>
            </div>
          </section>

          <section>
            <TaskList
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onMarkComplete={handleMarkComplete}
              onSuggestPriority={handleSuggestPriority}
              onSuggestDeadline={handleSuggestDeadline}
              loading={loading}
            />
          </section>
        </main>
      </div>

      {showInsights && (
        <div className="modal-backdrop" onClick={handleCloseInsights}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="Insights"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Insights</h3>
              <button className="btn btn-ghost" onClick={handleCloseInsights}>
                Close
              </button>
            </div>
            <div className="modal-body">
              <ul className="modal-list">
                {insightsItems.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
