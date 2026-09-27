"use client";

import { createContext, useContext, useState } from "react";
import type { Workout } from "@/types/workout";

type PlanContextType = {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  addToTodayPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromTodayPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
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
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  const addToTodayPlan = (workout: Workout) => {
    const alreadyAdded = todayPlan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      return false;
    }

    setTodayPlan((currentPlan) => [...currentPlan, workout]);

    return true;
  };

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

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );
  };

  const removeFromSaved = (id: number) => {
    setSavedWorkouts((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToTodayPlan,
        saveForLater,
        removeFromTodayPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};