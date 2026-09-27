"use client";

import Image from "next/image";
import Link from "next/link";
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
    completedWorkouts,
    removeFromTodayPlan,
    removeFromSaved,
    markAsDone,
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

  const totalMinutes = todayPlan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = todayPlan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  const handleRemove = (id: number) => {
    if (activeTab === "today") {
      removeFromTodayPlan(id);
      toast.success("Workout removed from today's plan.");
    } else {
      removeFromSaved(id);
      toast.success("Workout removed from saved workouts.");
    }
  };

  const handleDone = (id: number) => {
    if (completedWorkouts.includes(id)) {
      toast.info("Workout is already marked as done.");
      return;
    }

    markAsDone(id);
    toast.success("Workout marked as done!");
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-white md:py-16">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <section className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[4px] text-lime-400">
            YOUR WORKOUT JOURNEY
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Cap of five lifts for today. Finish them, then load
            more.
          </p>
        </section>

        {/* Metrics */}
        <section className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="card border border-zinc-800 bg-zinc-900">
            <div className="card-body">
              <p className="text-sm text-zinc-500">
                Exercises
              </p>

              <h2 className="text-4xl font-extrabold">
                {todayPlan.length}
              </h2>
            </div>
          </div>

          <div className="card border border-zinc-800 bg-zinc-900">
            <div className="card-body">
              <p className="text-sm text-zinc-500">
                Minutes
              </p>

              <h2 className="text-4xl font-extrabold">
                {totalMinutes}
              </h2>
            </div>
          </div>

          <div className="card border border-zinc-800 bg-zinc-900">
            <div className="card-body">
              <p className="text-sm text-zinc-500">
                Calories
              </p>

              <h2 className="text-4xl font-extrabold">
                {totalCalories}
              </h2>
            </div>
          </div>
        </section>

        {/* Tabs + Sort */}
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

          <select
            value={sortOption}
            onChange={(event) =>
              setSortOption(
                event.target.value as SortOption
              )
            }
            className="select select-bordered w-full border-zinc-700 bg-zinc-900 text-white sm:w-64"
          >
            <option value="default">Sort By</option>
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
        </section>

        {/* Empty State */}
        {sortedWorkouts.length === 0 ? (
          <div className="card border border-zinc-800 bg-zinc-900">
            <div className="card-body items-center py-16 text-center">
              <h2 className="text-2xl font-extrabold">
                NOTHING HERE YET
              </h2>

              <p className="max-w-md text-zinc-500">
                Browse the library and add a lift to get today
                moving.
              </p>

              <div className="card-actions mt-4">
                <Link
                  href="/"
                  className="btn bg-lime-400 text-black hover:bg-lime-300"
                >
                  Go to workouts
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Workout Cards */
          <div className="space-y-5">
            {sortedWorkouts.map((workout) => {
              const isDone = completedWorkouts.includes(
                workout.id
              );

              return (
                <div
                  key={workout.id}
                  className={`card overflow-hidden border bg-zinc-900 md:card-side ${
                    isDone
                      ? "border-lime-400/40"
                      : "border-zinc-800"
                  }`}
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
                          {workout.equipment}
                        </p>
                      </div>

                      <span className="font-bold text-lime-400">
                        ★ {workout.rating}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="mt-5 flex flex-wrap gap-3">
                      <div className="badge h-auto border-zinc-700 bg-zinc-950 px-4 py-3 text-white">
                        {workout.duration} min
                      </div>

                      <div className="badge h-auto border-zinc-700 bg-zinc-950 px-4 py-3 text-white">
                        {workout.caloriesBurned} kcal
                      </div>

                      <div className="badge h-auto border-zinc-700 bg-zinc-950 px-4 py-3 text-white">
                        ★ {workout.rating}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="card-actions mt-6 flex-wrap justify-end">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="btn btn-outline border-zinc-600 text-white hover:border-lime-400 hover:bg-transparent hover:text-lime-400"
                      >
                        View Details
                      </Link>

                      {activeTab === "today" && (
                        <button
                          onClick={() =>
                            handleDone(workout.id)
                          }
                          disabled={isDone}
                          className={`btn ${
                            isDone
                              ? "bg-lime-400 text-black"
                              : "btn-outline border-lime-400 text-lime-400"
                          }`}
                        >
                          {isDone
                            ? "✓ Done"
                            : "✓ Mark as Done"}
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleRemove(workout.id)
                        }
                        className="btn btn-outline btn-error"
                        aria-label={`Remove ${workout.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyPlanPage;