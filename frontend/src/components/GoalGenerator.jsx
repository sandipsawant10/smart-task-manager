import { useState } from "react";
import { Lightbulb, Loader2 } from "lucide-react";

const GoalGenerator = ({ onGenerateTasks, loading }) => {
  const [goal, setGoal] = useState("");

  const handleGenerate = async () => {
    if (!goal.trim() || loading) {
      return;
    }

    await onGenerateTasks(goal);
    setGoal("");
  };

  return (
    <div>
      <div>
        <div className="form-title">
          <div className="icon-pill">
            <Lightbulb strokeWidth={2} />
          </div>
          <div>
            <h3>Generate Tasks from Goal</h3>
            <p className="task-list__subtitle">
              Let AI break down your objectives into actionable tasks
            </p>
          </div>
        </div>

        <div className="goal-row">
          <input
            className="field-input"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Describe your goal (e.g., 'Launch a marketing campaign')"
            disabled={loading}
          />
          <button
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={!goal.trim() || loading}
          >
            {loading ? (
              <>
                <Loader2 strokeWidth={2} />
                Generating...
              </>
            ) : (
              <>
                <Lightbulb strokeWidth={2} />
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalGenerator;
