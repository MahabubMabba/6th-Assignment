import type { Workout } from "@/types/workout";

const getWorkouts = async (): Promise<Workout[]> => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/fitlog"
  );

  const data = await response.json();

  return data;
};

export default getWorkouts;