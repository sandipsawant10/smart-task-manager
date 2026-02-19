import { useState } from "react";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../services/taskApi";

const useTaskManager = () => {
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

    // Create optimistic task with temporary ID
    const optimisticTask = {
      _id: `temp-${Date.now()}`,
      ...taskData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Optimistic update
    const previousTasks = [...tasks];
    setTasks([...tasks, optimisticTask]);

    try {
      const response = await createTask(taskData);
      // Replace optimistic task with real one from server
      setTasks([...previousTasks, response.task]);
      return { success: true };
    } catch (error) {
      // Revert to previous state on error
      setTasks(previousTasks);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    setError(null);

    // Optimistic update: save previous state and update immediately
    const previousTasks = [...tasks];
    const taskToUpdate = tasks.find((task) => task._id === taskId);

    if (taskToUpdate) {
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, ...updates } : task,
        ),
      );
    }

    try {
      const response = await updateTask(taskId, updates);
      if (response.task) {
        // Update with server response
        setTasks(
          previousTasks.map((task) =>
            task._id === response.task._id ? response.task : task,
          ),
        );
      }
      return { success: true, task: response.task };
    } catch (error) {
      // Revert to previous state on error
      setTasks(previousTasks);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const handleDeleteTask = async (taskId) => {
    setError(null);

    // Optimistic update: save previous state and delete immediately
    const previousTasks = [...tasks];
    setTasks(tasks.filter((task) => task._id !== taskId));

    try {
      await deleteTask(taskId);
      return { success: true };
    } catch (error) {
      // Revert to previous state on error
      setTasks(previousTasks);
      setError(error.message);
      return { success: false, error: error.message };
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

export default useTaskManager;
