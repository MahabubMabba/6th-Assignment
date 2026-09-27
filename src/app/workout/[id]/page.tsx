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

  const workout = workouts.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[3px] text-lime-400">
            FITLOG
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            WORKOUT NOT FOUND
          </h1>

          <p className="mt-4 text-zinc-500">
            The workout you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-white md:py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 md:grid-cols-2">
          
          {/* Image */}
          <div className="min-h-[350px] md:min-h-full">
            <Image
              src={workout.image}
              alt={workout.name}
              width={800}
              height={800}
              priority
              className="h-full min-h-[350px] w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 lg:p-10">
            
            {/* Difficulty */}
            <span className="badge border-lime-400/30 bg-lime-400/10 px-4 py-3 font-bold text-lime-400">
              {workout.difficulty}
            </span>

            {/* Title */}
            <h1 className="mt-5 text-3xl font-extrabold uppercase leading-tight md:text-4xl">
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
                  className="badge border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-300"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Key Specs */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">
                  Equipment
                </p>
                <p className="mt-1 font-semibold">
                  {workout.equipment}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">
                  Difficulty
                </p>
                <p className="mt-1 font-semibold">
                  {workout.difficulty}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">
                  Sets
                </p>
                <p className="mt-1 font-semibold">
                  {workout.sets}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">
                  Reps
                </p>
                <p className="mt-1 font-semibold">
                  {workout.reps}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">
                  Duration
                </p>
                <p className="mt-1 font-semibold">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">
                  Calories
                </p>
                <p className="mt-1 font-semibold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:col-span-3">
                <p className="text-xs uppercase text-zinc-500">
                  Rating
                </p>
                <p className="mt-1 font-semibold text-lime-400">
                  ★ {workout.rating}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-10">
              <h2 className="text-2xl font-extrabold">
                INSTRUCTIONS
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-400 text-sm font-bold text-black">
                        {index + 1}
                      </span>

                      <p className="leading-7 text-zinc-400">
                        {instruction}
                      </p>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* Actions */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;