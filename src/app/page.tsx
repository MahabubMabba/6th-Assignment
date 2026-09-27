import Image from "next/image";
import Link from "next/link";

import banner from "../../assets/banner.png";

import getWorkouts from "@/components/getWorkouts";
import LibraryCard from "@/components/LibraryCard";

const HomePage = async () => {
  const workouts = await getWorkouts();

  return (
    <main>
      
      <section className="bg-black text-white">
        <div className="container mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[3px] text-lime-400">
              WORKOUT LIBRARY
            </p>

            <h1 className="mt-4 text-4xl font-extrabold uppercase leading-tight md:text-6xl">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="mt-6 max-w-xl leading-7 text-zinc-400">
              FitLog is a dark, no-nonsense gym companion:
              pick a lift, lock it into today&apos;s plan, and
              watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="btn mt-8 bg-lime-400 text-black hover:bg-lime-300"
            >
              BROWSE WORKOUTS
            </Link>
          </div>

        
          <div className="flex justify-center md:justify-end">
            <Image
              src={banner}
              alt="FitLog workout banner"
              width={600}
              height={500}
              priority
              className="h-auto w-full max-w-lg"
            />
          </div>
        </div>
      </section>

     
      <section
        id="library"
        className="container mx-auto px-4 py-16 md:py-20"
      >
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[3px] text-lime-600">
            TRAIN SMART
          </p>

          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-zinc-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

       
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <LibraryCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;