import { useState } from "react";

const TaskForm = ({ onCreateTask, loading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (deadline) {
      const today = new Date().toISOString().split("T")[0];
      if (deadline < today) {
        alert("Deadline cannot be in the past");
        return;
      }
    }

    const result = await onCreateTask({
      title,
      description,
      priority,
      deadline,
    });

    if (result.success) {
      setTitle("");
      setDescription("");
      setPriority("low");
      setDeadline("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        min={new Date().toISOString().split("T")[0]}
        onChange={(event) => setDeadline(event.target.value)}
      />
      <button type="submit" disabled={loading}>
        Add
      </button>
    </form>
  );
};

export default TaskForm;
