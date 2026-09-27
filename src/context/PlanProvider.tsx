"use client";

import { createContext, useContext, useState } from "react";
import type { Workout } from "@/types/workout";

type PlanContextType = {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  completedWorkouts: number[];

  addToTodayPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromTodayPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

export const PlanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(
    []
  );

  const [completedWorkouts, setCompletedWorkouts] = useState<
    number[]
  >([]);

  // Add workout to today's plan
  const addToTodayPlan = (workout: Workout) => {
    const alreadyAdded = todayPlan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      return false;
    }

    if (todayPlan.length >= 5) {
      return false;
    }

    setTodayPlan((currentPlan) => [
      ...currentPlan,
      workout,
    ]);

    return true;
  };

  // Save workout for later
  const saveForLater = (workout: Workout) => {
    const alreadySaved = savedWorkouts.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      return false;
    }

    setSavedWorkouts((currentSaved) => [
      ...currentSaved,
      workout,
    ]);

    return true;
  };

  // Remove from today's plan
  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );

    setCompletedWorkouts((currentCompleted) =>
      currentCompleted.filter(
        (workoutId) => workoutId !== id
      )
    );
  };

  // Remove from saved
  const removeFromSaved = (id: number) => {
    setSavedWorkouts((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );
  };

  // Mark workout as done
  const markAsDone = (id: number) => {
    setCompletedWorkouts((currentCompleted) => {
      if (currentCompleted.includes(id)) {
        return currentCompleted;
      }

      return [...currentCompleted, id];
    });
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedWorkouts,
        addToTodayPlan,
        saveForLater,
        removeFromTodayPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
};