import Image from "next/image";
import getWorkouts from "@/components/getWorkouts";

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
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">Workout not found</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="grid gap-10 md:grid-cols-2">
    
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={workout.image}
            alt={workout.name}
            width={700}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>

       
        <div>
          <h1 className="text-4xl font-extrabold">
            {workout.name}
          </h1>

          <p className="mt-5 leading-7 text-gray-600">
            {workout.description}
          </p>

        
          <div className="mt-6 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium"
              >
                {muscle}
              </span>
            ))}
          </div>

         
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Equipment</p>
              <p className="mt-2 font-bold">{workout.equipment}</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="mt-2 font-bold">{workout.difficulty}</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Sets</p>
              <p className="mt-2 font-bold">{workout.sets}</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Reps</p>
              <p className="mt-2 font-bold">{workout.reps}</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="mt-2 font-bold">
                {workout.duration} min
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Calories</p>
              <p className="mt-2 font-bold">
                {workout.caloriesBurned}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Rating</p>
              <p className="mt-2 font-bold">
                ★ {workout.rating}
              </p>
            </div>
          </div>

         
          <div className="mt-10">
            <h2 className="text-2xl font-bold">Instructions</h2>

            <div className="mt-5 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <p
                  key={index}
                  className="leading-7 text-gray-600"
                >
                  {index + 1}. {instruction}
                </p>
              ))}
            </div>
          </div>

        
          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-lime-400 px-6 py-3 font-bold text-black">
              Add to today&apos;s plan
            </button>

            <button className="rounded-full border border-gray-900 px-6 py-3 font-bold">
              Save for later
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WorkoutDetailsPage;