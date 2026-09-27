import Image from "next/image";

import getWorkouts from "@/components/getWorkouts";
import WorkoutActions from "@/components/WorkoutActions";

type WorkoutDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const WorkoutDetailsPage = async ({
  params,
}: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const workouts = await getWorkouts();

  const workout = workouts.find((item) => item.id === Number(id));

  if (!workout) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-20 text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Workout not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-white md:py-16">
      <div className="container mx-auto">
        {/* Main Details */}
        <section className="grid overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl md:grid-cols-2">
          {/* Left Side - Image */}
          <div className="min-h-[400px]">
            <Image
              src={workout.image}
              alt={workout.name}
              width={700}
              height={700}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Side - All Content */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Difficulty */}
            <span className="inline-block rounded-full bg-lime-400/10 px-4 py-2 text-sm font-bold text-lime-400">
              {workout.difficulty}
            </span>

            {/* Name */}
            <h1 className="mt-5 text-3xl font-extrabold leading-tight md:text-4xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-5 leading-7 text-zinc-400">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-6 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Workout Details */}
            <div className="mt-8 space-y-3">
              {/* Equipment */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Equipment</p>

                <p className="mt-1 font-semibold text-white">
                  {workout.equipment}
                </p>
              </div>

              {/* Difficulty */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Difficulty</p>

                <p className="mt-1 font-semibold text-white">
                  {workout.difficulty}
                </p>
              </div>

              {/* Sets */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Sets</p>

                <p className="mt-1 font-semibold text-white">
                  {workout.sets}
                </p>
              </div>

              {/* Reps */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Reps</p>

                <p className="mt-1 font-semibold text-white">
                  {workout.reps}
                </p>
              </div>

              {/* Duration */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Duration</p>

                <p className="mt-1 font-semibold text-white">
                  {workout.duration} min
                </p>
              </div>

              {/* Calories */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Calories</p>

                <p className="mt-1 font-semibold text-white">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              {/* Rating */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Rating</p>

                <p className="mt-1 font-semibold text-lime-400">
                  ★ {workout.rating}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold">Instructions</h2>

              <div className="mt-5 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-400 text-sm font-bold text-black">
                      {index + 1}
                    </span>

                    <p className="leading-7 text-zinc-400">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <WorkoutActions workout={workout} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;