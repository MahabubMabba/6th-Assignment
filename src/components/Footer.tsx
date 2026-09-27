import Image from "next/image";

import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={30}
              height={40}
            />

            <div>
              <h2 className="text-lg font-bold uppercase">
                FITLOG
              </h2>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-500">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;