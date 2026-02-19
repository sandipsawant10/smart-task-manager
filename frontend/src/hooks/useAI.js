import { useState } from "react";
import {
  generateTasksFromGoal,
  getProductivityFeedback,
  suggestTaskDeadline,
  suggestTaskPriority,
} from "../services/aiApi";

const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateTasks = async (goal) => {
    if (!goal.trim()) {
      setError("Goal is required to generate tasks");
      return { success: false };
    }
    setLoading(true);
    setError(null);
    try {
      const response = await generateTasksFromGoal(goal);
      return { success: true, tasks: response.tasks };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const suggestPriority = async (taskTitle) => {
    setLoading(true);
    setError(null);
    try {
      const response = await suggestTaskPriority(taskTitle);
      return { success: true, suggestion: response.suggestion };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const suggestDeadline = async (taskTitle) => {
    setLoading(true);
    setError(null);
    try {
      const response = await suggestTaskDeadline(taskTitle);
      return { success: true, suggestion: response.suggestion };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProductivityFeedback();
      return { success: true, feedback: response.feedback };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    setError,
    generateTasks,
    suggestPriority,
    suggestDeadline,
    getFeedback,
  };
};

export default useAI;
