"use client";

import { createContext, useContext, useState } from "react";
import type { Workout } from "@/types/workout";

type PlanContextType = {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  addToTodayPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
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

  const addToTodayPlan = (workout: Workout) => {
    setTodayPlan((currentPlan) => {
      const alreadyAdded = currentPlan.some(
        (item) => item.id === workout.id
      );

      if (alreadyAdded) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  };

  const saveForLater = (workout: Workout) => {
    setSavedWorkouts((currentSaved) => {
      const alreadySaved = currentSaved.some(
        (item) => item.id === workout.id
      );

      if (alreadySaved) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToTodayPlan,
        saveForLater,
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