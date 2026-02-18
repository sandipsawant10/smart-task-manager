import Task from "../models/task.model";
import { generateTasksFromGoal, getProductivityFeedback } from "../utils/aiClient";

const generateTasks = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({ message: "Goal is required" });
    }
    const generatedTasks = await generateTasksFromGoal(goal);

    //convert AI text → array
    const tasksArray = generatedTasks
      .split("\n")
      .filter((task) => task.trim() !== "");

    //save tasks to DB
    const savedTasks = [];
    for (const taskTitle of tasksArray) {
      const newTask = await Task.create({
        title: taskTitle.trim(),
        priority: "medium",
        user: req.user._id,
      });
      savedTasks.push(newTask);
    }

    if (savedTasks.length > 0) {
      res
        .status(201)
        .json({ message: "Tasks generated and saved", tasks: savedTasks });
    } else {
      res.status(500).json({
        message: "Error generating and saving tasks",
        error: {
          message: "No tasks were generated or saved",
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating tasks", error: error.message });
  }
};

const getFeedback = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id});
    if (tasks.length === 0) {
      return res.status(400).json({ message: "No tasks found for feedback" });
    }
    const feedback = await getProductivityFeedback(tasks);
    res.status(200).json({message: "Feedback generated", feedback });
  } catch (error) {
    res.status(500).json({ message: "Error generating feedback", error: error.message });
  }
}


export { generateTasks, getFeedback };
