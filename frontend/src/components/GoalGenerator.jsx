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
    <div className="rounded-lg border border-slate-200/60 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-300">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm">
          <Lightbulb className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-instrument-sans text-base font-semibold text-slate-950">
            Generate Tasks from Goal
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Let AI break down your objectives into actionable tasks
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="Describe your goal (e.g., 'Launch a marketing campaign')"
          disabled={loading}
          className="flex-1 rounded-lg border border-slate-200/60 bg-white/50 px-4 py-2.5 font-inter text-sm text-slate-900 placeholder-slate-400 focus:border-amber-400/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleGenerate}
          disabled={!goal.trim() || loading}
          className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Lightbulb className="h-4 w-4" />
              Generate
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GoalGenerator;
