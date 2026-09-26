import Image from "next/image";
import type { Workout } from "@/types/workout";

type LibraryCardProps = {
  workout: Workout;
};

const LibraryCard = ({ workout }: LibraryCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {workout.image ? (
        <Image
          src={workout.image}
          alt={workout.name}
          width={500}
          height={300}
          className="h-56 w-full object-cover"
        />
      ) : (
        <div className="flex h-56 w-full items-center justify-center bg-gray-200">
          <span className="font-semibold text-gray-500">
            No Image
          </span>
        </div>
      )}

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-bold text-lime-700">
            {workout.difficulty}
          </span>

          <span className="text-sm font-semibold">
            ★ {workout.rating}
          </span>
        </div>

        <h3 className="text-xl font-bold">{workout.name}</h3>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>Muscle: {workout.muscleGroups.join(", ")}</p>

          <p>Equipment: {workout.equipment}</p>

          <p>
            {workout.duration} min · {workout.sets} sets · {workout.reps} reps
          </p>
        </div>

        <button className="mt-5 w-full rounded-full bg-black px-4 py-3 font-bold text-white">
          View Details
        </button>
      </div>
    </div>
  );
};

export default LibraryCard;