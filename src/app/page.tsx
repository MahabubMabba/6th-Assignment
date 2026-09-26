import Image from "next/image";
import banner from "../../assets/banner.png";

const HomePage = () => {
  return (
    <main>
      <section className="bg-black text-white">
        <div className="container mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2">
          
          <div>
            <h5 className="mb-4 text-sm font-bold uppercase tracking-[3px] text-lime-400">
              WORKOUT LIBRARY
            </h5>

            <h2 className="text-4xl font-extrabold uppercase leading-tight md:text-6xl">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h2>

            <p className="mt-6 max-w-xl text-gray-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="mt-8 inline-block rounded-full bg-lime-400 px-6 py-3 font-bold text-black"
            >
              BROWSE WORKOUTS
            </a>
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

      <section id="library" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold">THE LIBRARY</h2>
      </section>
    </main>
  );
};

export default HomePage;