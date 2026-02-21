import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/ai`;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const generateTasksFromGoal = async (goal) => {
  try {
    const response = await axiosInstance.post(
      "/generate",
      { goal },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to generate tasks";
    throw new Error(errorMsg);
  }
};

const getProductivityFeedback = async () => {
  try {
    const response = await axiosInstance.get("/feedback", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to get productivity feedback";
    throw new Error(errorMsg);
  }
};

const suggestTaskDeadline = async (taskTitle) => {
  try {
    const response = await axiosInstance.post(
      "/deadline",
      { title: taskTitle },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to suggest task deadline";
    throw new Error(errorMsg);
  }
};

const suggestTaskPriority = async (taskTitle) => {
  try {
    const response = await axiosInstance.post(
      "/priority",
      { title: taskTitle },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to suggest task priority";
    throw new Error(errorMsg);
  }
};

export {
  generateTasksFromGoal,
  getProductivityFeedback,
  suggestTaskDeadline,
  suggestTaskPriority,
};
