import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[4px] text-lime-400">
          FITLOG
        </p>

        <h1 className="mt-4 text-6xl font-extrabold md:text-8xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold">
          PAGE NOT FOUND
        </h2>

        <p className="mx-auto mt-3 max-w-md text-zinc-500">
          The page or workout you are looking for does not
          exist.
        </p>

        <Link
          href="/"
          className="btn mt-7 bg-lime-400 px-6 text-black hover:bg-lime-300"
        >
          GO TO WORKOUTS
        </Link>
      </div>
    </main>
  );
};

export default NotFound;