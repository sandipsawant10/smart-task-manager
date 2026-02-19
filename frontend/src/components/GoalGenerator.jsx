import { useState } from "react";

const GoalGenerator = ({ onGenerateTasks, loading }) => {
  const [goal, setGoal] = useState("");

  const handleGenerate = async () => {
    const result = await onGenerateTasks(goal);
    if (result.success) {
      setGoal("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your goal"
        value={goal}
        onChange={(event) => setGoal(event.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading}>
        Generate Tasks
      </button>
    </div>
  );
};

export default GoalGenerator;
