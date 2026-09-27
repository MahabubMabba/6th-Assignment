"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

import { usePlan } from "@/context/PlanProvider";

type SortOption =
  | "default"
  | "duration-low"
  | "duration-high"
  | "calories-low"
  | "calories-high"
  | "rating-high";

const MyPlanPage = () => {
  const {
    todayPlan,
    savedWorkouts,
    removeFromTodayPlan,
    removeFromSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<
    "today" | "saved"
  >("today");

  const [sortOption, setSortOption] =
    useState<SortOption>("default");

  const activeWorkouts =
    activeTab === "today" ? todayPlan : savedWorkouts;

  const sortedWorkouts = [...activeWorkouts].sort(
    (a, b) => {
      if (sortOption === "duration-low") {
        return a.duration - b.duration;
      }

      if (sortOption === "duration-high") {
        return b.duration - a.duration;
      }

      if (sortOption === "calories-low") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      if (sortOption === "calories-high") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortOption === "rating-high") {
        return b.rating - a.rating;
      }

      return 0;
    }
  );

  const totalMinutes = activeWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = activeWorkouts.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  const handleRemove = (id: number) => {
    if (activeTab === "today") {
      removeFromTodayPlan(id);
      toast.success(
        "Workout removed from today's plan."
      );
    } else {
      removeFromSaved(id);
      toast.success(
        "Workout removed from saved workouts."
      );
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-white md:py-16">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <section className="mb-10">
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            My Plan
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Keep track of your workouts, stay consistent,
            and build your plan one session at a time.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="card border border-zinc-800 bg-zinc-900">
            <div className="card-body">
              <p className="text-sm text-zinc-500">
                Exercises
              </p>

              <h2 className="card-title text-4xl">
                {activeWorkouts.length}
              </h2>

              <p className="text-sm text-zinc-500">
                {activeTab === "today"
                  ? "Planned for today"
                  : "Saved for later"}
              </p>
            </div>
          </div>

          <div className="card border border-zinc-800 bg-zinc-900">
            <div className="card-body">
              <p className="text-sm text-zinc-500">
                Total Minutes
              </p>

              <h2 className="card-title text-4xl">
                {totalMinutes}
              </h2>

              <p className="text-sm text-zinc-500">
                Estimated workout time
              </p>
            </div>
          </div>

          <div className="card border border-zinc-800 bg-zinc-900">
            <div className="card-body">
              <p className="text-sm text-zinc-500">
                Calories
              </p>

              <h2 className="card-title text-4xl">
                {totalCalories}
              </h2>

              <p className="text-sm text-zinc-500">
                Estimated calories burned
              </p>
            </div>
          </div>
        </section>

        {/* Tabs + Sort */}
        <section>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Tabs */}
            <div
              role="tablist"
              className="tabs tabs-boxed bg-zinc-900"
            >
              <button
                role="tab"
                onClick={() => {
                  setActiveTab("today");
                  setSortOption("default");
                }}
                className={`tab ${
                  activeTab === "today"
                    ? "tab-active bg-lime-400 font-bold text-black"
                    : "text-zinc-400"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                role="tab"
                onClick={() => {
                  setActiveTab("saved");
                  setSortOption("default");
                }}
                className={`tab ${
                  activeTab === "saved"
                    ? "tab-active bg-lime-400 font-bold text-black"
                    : "text-zinc-400"
                }`}
              >
                Saved
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortOption}
              onChange={(event) =>
                setSortOption(
                  event.target.value as SortOption
                )
              }
              className="select select-bordered w-full border-zinc-700 bg-zinc-900 text-white sm:w-64"
            >
              <option value="default">
                Sort: Default
              </option>

              <option value="duration-low">
                Duration: Low → High
              </option>

              <option value="duration-high">
                Duration: High → Low
              </option>

              <option value="calories-low">
                Calories: Low → High
              </option>

              <option value="calories-high">
                Calories: High → Low
              </option>

              <option value="rating-high">
                Rating: High → Low
              </option>
            </select>
          </div>

          {/* Empty State */}
          {sortedWorkouts.length === 0 ? (
            <div className="alert border-zinc-800 bg-zinc-900 text-zinc-400">
              <div>
                <h3 className="font-bold text-white">
                  {activeTab === "today"
                    ? "Your plan is empty"
                    : "Nothing saved yet"}
                </h3>

                <p className="mt-1 text-sm">
                  {activeTab === "today"
                    ? "Browse the workout library and add exercises to your today's plan."
                    : "Save workouts from the details page and they will appear here."}
                </p>
              </div>
            </div>
          ) : (
            /* Workout List */
            <div className="space-y-5">
              {sortedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="card overflow-hidden border border-zinc-800 bg-zinc-900 md:card-side"
                >
                  {/* Image */}
                  <figure className="md:w-64 md:shrink-0">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      width={500}
                      height={350}
                      className="h-56 w-full object-cover md:h-full"
                    />
                  </figure>

                  {/* Content */}
                  <div className="card-body">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="badge badge-outline border-lime-400 text-lime-400">
                          {workout.difficulty}
                        </span>

                        <h3 className="mt-3 text-2xl font-bold">
                          {workout.name}
                        </h3>

                        <p className="mt-2 text-sm text-zinc-500">
                          {workout.muscleGroups.join(
                            " · "
                          )}
                        </p>
                      </div>

                      <span className="font-bold text-lime-400">
                        ★ {workout.rating}
                      </span>
                    </div>

                    {/* Workout Info */}
                    <div className="mt-5 flex flex-wrap gap-3">
                      <div className="badge h-auto gap-1 border-zinc-700 bg-zinc-950 px-4 py-3 text-white">
                        <span className="text-zinc-500">
                          Time:
                        </span>
                        {workout.duration} min
                      </div>

                      <div className="badge h-auto gap-1 border-zinc-700 bg-zinc-950 px-4 py-3 text-white">
                        <span className="text-zinc-500">
                          Sets:
                        </span>
                        {workout.sets}
                      </div>

                      <div className="badge h-auto gap-1 border-zinc-700 bg-zinc-950 px-4 py-3 text-white">
                        <span className="text-zinc-500">
                          Reps:
                        </span>
                        {workout.reps}
                      </div>

                      <div className="badge h-auto gap-1 border-zinc-700 bg-zinc-950 px-4 py-3 text-white">
                        <span className="text-zinc-500">
                          Calories:
                        </span>
                        {workout.caloriesBurned}
                      </div>
                    </div>

                    {/* Remove */}
                    <div className="card-actions mt-5 justify-end">
                      <button
                        onClick={() =>
                          handleRemove(workout.id)
                        }
                        className="btn btn-outline btn-error"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyPlanPage;