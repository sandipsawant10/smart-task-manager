import { useState, useEffect } from "react";
import { logout } from "../services/authApi";
import useTaskManager from "../hooks/useTaskManager";
import useAI from "../hooks/useAI";
import TaskForm from "../components/TaskForm";
import GoalGenerator from "../components/GoalGenerator";
import TaskList from "../components/TaskList";

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

  return (
    <div>
      <h1>Dashboard</h1>

      <GoalGenerator onGenerateTasks={handleGenerateTasks} loading={loading} />

      <TaskForm onCreateTask={handleCreateTask} loading={loading} />

      <TaskList
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onMarkComplete={handleMarkComplete}
        onSuggestPriority={handleSuggestPriority}
        onSuggestDeadline={handleSuggestDeadline}
        loading={loading}
      />

      <button onClick={handleProductivityFeedback} disabled={loading}>
        Productive Feedback
      </button>
      <button onClick={handleLogout}>Logout</button>

      {displayError && <p>{displayError}</p>}
    </div>
  );
}

export default Dashboard;
