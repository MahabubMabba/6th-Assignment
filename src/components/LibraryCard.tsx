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
      className="card overflow-hidden border border-zinc-800 bg-zinc-900 text-white transition duration-300 hover:-translate-y-1 hover:border-lime-400/50 hover:shadow-xl"
    >
      {/* Image */}
      <figure>
        <Image
          src={workout.image}
          alt={workout.name}
          width={600}
          height={400}
          className="h-56 w-full object-cover"
        />
      </figure>

      {/* Content */}
      <div className="card-body p-5">
        {/* Muscle Groups */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="badge border-lime-400/30 bg-lime-400/10 px-3 py-3 text-xs font-bold uppercase text-lime-400"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h2 className="card-title mt-2 text-2xl font-bold">
          {workout.name}
        </h2>

        {/* Equipment */}
        <p className="text-sm text-zinc-500">
          Equipment:{" "}
          <span className="text-zinc-300">{workout.equipment}</span>
        </p>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-3 border-t border-zinc-800 pt-4">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <span className="text-base">◷</span>
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <span className="text-base">🔥</span>
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <span className="text-base text-lime-400">★</span>
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LibraryCard;