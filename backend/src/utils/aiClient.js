import dotenv from "dotenv";

dotenv.config();

const AI_API_KEY = process.env.AI_API_KEY;
const url = "https://openrouter.ai/api/v1/chat/completions";

const callAI = async (prompt) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to call AI");
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      throw new Error("No choices returned from AI");
    }
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling AI:", error);
    throw error;
  }
};

const generateTasksFromGoal = async (goal) => {
  if (!goal) {
    throw new Error("Goal is required");
  }

  const prompt = `You are a task management assistant. Break down the following goal into a JSON array of short task strings only. No headings, no extra text, no markdown.\n\nGoal: ${goal}\n\nReturn format example: ["Task 1", "Task 2"]`;
  const tasks = await callAI(prompt);
  return tasks;
};

const getProductivityFeedback = async (tasks) => {
  if (!tasks || tasks.length === 0) {
    throw new Error("Tasks are required for feedback");
  }

  tasks = tasks
    .map((task) => `Title: ${task.title}, Priority: ${task.priority}`)
    .join("\n\n");
  const prompt = `You are a productivity coach. Give short, simple, meaningful feedback in bullet points only. Keep it to 4-6 bullets, each under 12 words. No headings, no extra text.\n\nTasks:\n${tasks}`;
  const feedback = await callAI(prompt);
  return feedback;
};

const suggestTaskDeadline = async (task) => {
  if (!task || !task.title) {
    throw new Error("Task with title is required for deadline suggestion");
  }

  const prompt = `You are a task management assistant. Return a single concrete deadline date in YYYY-MM-DD format only. No extra text.\n\nTask: ${task.title}\n\nDeadline:`;
  const deadline = await callAI(prompt);
  return deadline;
};

const suggestTaskPriority = async (task) => {
  if (!task || !task.title) {
    throw new Error("Task with title is required for priority suggestion");
  }

  const prompt = `You are a task management assistant. Return only one word: low, medium, or high. No extra text.\n\nTask: ${task.title}\n\nPriority:`;
  const priority = await callAI(prompt);
  return priority.toLowerCase().trim();
};

export {
  generateTasksFromGoal,
  getProductivityFeedback,
  suggestTaskDeadline,
  suggestTaskPriority,
};
