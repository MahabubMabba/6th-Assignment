const Loading = () => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-zinc-950">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-lime-400"></span>

        <p className="mt-4 text-sm font-medium text-zinc-400">
          Loading workouts…
        </p>
      </div>
    </main>
  );
};

export default Loading;