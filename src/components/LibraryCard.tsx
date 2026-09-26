import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workout";

type LibraryCardProps = {
  workout: Workout;
};

const LibraryCard = ({ workout }: LibraryCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <Image
        src={workout.image}
        alt={workout.name}
        width={500}
        height={300}
        className="h-56 w-full object-cover"
      />

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
      </div>
    </Link>
  );
};

export default LibraryCard;