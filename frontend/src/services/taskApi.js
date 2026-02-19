import axios from "axios";
const API_URL = "http://localhost:3000/tasks";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/", taskData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || "Failed to create task";
    throw new Error(errorMsg);
  }
};

const getMyTasks = async () => {
  try {
    const response = await axiosInstance.get("/", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || "Failed to get tasks";
    throw new Error(errorMsg);
  }
};

const updateTask = async (taskId, updates) => {
  try {
    const response = await axiosInstance.put(`/${taskId}`, updates, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || "Failed to update task";
    throw new Error(errorMsg);
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await axiosInstance.delete(`/${taskId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || "Failed to delete task";
    throw new Error(errorMsg);
  }
};

export { createTask, getMyTasks, updateTask, deleteTask };
