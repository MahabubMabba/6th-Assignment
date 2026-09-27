"use client";

import type { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanProvider";
import { toast } from "react-toastify";

type WorkoutActionsProps = {
  workout: Workout;
};

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { addToTodayPlan, saveForLater } = usePlan();

  const handleAddToPlan = () => {
    const added = addToTodayPlan(workout);

    if (added) {
      toast.success("Workout added to today's plan!");
    } else {
      toast.warning("This workout is already in today's plan.");
    }
  };

  const handleSaveForLater = () => {
    const saved = saveForLater(workout);

    if (saved) {
      toast.success("Workout saved for later!");
    } else {
      toast.warning("This workout is already saved.");
    }
  };

  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAddToPlan}
        className="btn bg-lime-400 px-6 text-black hover:bg-lime-300"
      >
        Add to today&apos;s plan
      </button>

      <button
        onClick={handleSaveForLater}
        className="btn btn-outline border-zinc-600 px-6 text-white hover:border-lime-400 hover:bg-transparent hover:text-lime-400"
      >
        Save for later
      </button>
    </div>
  );
};

export default WorkoutActions;