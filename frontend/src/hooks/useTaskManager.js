import { useState } from "react";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../services/taskApi";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getMyTasks();
      setTasks(response.tasks || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createTask(taskData);
      setTasks([...tasks, response.task]);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateTask(taskId, updates);
      if (response.task) {
        setTasks(
          tasks.map((task) =>
            task._id === response.task._id ? response.task : task,
          ),
        );
      }
      return { success: true, task: response.task };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (taskId) => {
    return handleUpdateTask(taskId, { status: "completed" });
  };

  const addGeneratedTasks = (newTasks) => {
    setTasks([...tasks, ...newTasks]);
  };

  return {
    tasks,
    loading,
    error,
    setError,
    fetchTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    handleMarkComplete,
    addGeneratedTasks,
  };
};
