import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../services/taskApi";
import { logout } from "../services/authApi";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("low");
  const [editDeadline, setEditDeadline] = useState("");

  useEffect(() => {
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
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await createTask({
        title,
        description,
        priority,
        deadline,
      });
      setTasks([...tasks, response.task]);
      setTitle("");
      setDescription("");
      setPriority("low");
      setDeadline("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startEditTask = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
    setEditPriority(task.priority || "low");
    setEditDeadline(task.deadline ? task.deadline.slice(0, 10) : "");
    setError(null);
  };

  const cancelEditTask = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("low");
    setEditDeadline("");
  };

  const handleUpdateTask = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (!taskToUpdate) {
      setError("Selected task not found");
      return;
    }
    if (!editTitle.trim()) {
      setError("Title is required");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await updateTask(taskToUpdate._id, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        deadline: editDeadline,
      });
      if (response.task) {
        setTasks(
          tasks.map((task) =>
            task._id === response.task._id ? response.task : task,
          ),
        );
      }
      cancelEditTask();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const taskToDelete = tasks.find((task) => task._id === taskId);
    if (!taskToDelete) {
      setError("Selected task not found");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deleteTask(taskToDelete._id);
      setTasks(tasks.filter((task) => task._id !== taskToDelete._id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (!taskToUpdate) {
      setError("Selected task not found");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await updateTask(taskToUpdate._id, {
        status: "completed",
      });
      if (response.task) {
        setTasks(
          tasks.map((task) =>
            task._id === response.task._id ? response.task : task,
          ),
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleCreateTask();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          Add
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Status: {task.status}</p>
            {editingTaskId === task._id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(event) => setEditDescription(event.target.value)}
                />
                <select
                  value={editPriority}
                  onChange={(event) => setEditPriority(event.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  type="date"
                  value={editDeadline}
                  onChange={(event) => setEditDeadline(event.target.value)}
                />
                <button onClick={() => handleUpdateTask(task._id)}>Save</button>
                <button onClick={cancelEditTask}>Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => handleMarkComplete(task._id)}>
                  Complete
                </button>
                <button onClick={() => startEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Dashboard;
