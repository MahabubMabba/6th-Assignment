"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import logo from "../../assets/logo.png";
import { usePlan } from "@/context/PlanProvider";

const Navbar = () => {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = usePlan();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950 text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
         <div className="flex gap-4">
             <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center"
          >
            <Image
              src={logo}
              alt="FitLog Logo"
              width={30}
              height={40}
              priority
            />
          </Link>
          <p className="font-bold">FITLOG</p>
         </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className={`font-medium transition ${
                pathname === "/"
                  ? "text-lime-400"
                  : "text-zinc-400 hover:text-lime-400"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              className={`font-medium transition ${
                pathname === "/my-plan"
                  ? "text-lime-400"
                  : "text-zinc-400 hover:text-lime-400"
              }`}
            >
              My Plan
            </Link>
          </div>

          {/* Desktop Badges */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/my-plan"
              className="rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-300"
            >
              Plan {todayPlan.length}
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-zinc-600 px-4 py-2 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
            >
              Saved {savedWorkouts.length}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost btn-square text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-zinc-800 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 font-medium ${
                  pathname === "/"
                    ? "bg-lime-400 text-black"
                    : "text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                Workout
              </Link>

              <Link
                href="/my-plan"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 font-medium ${
                  pathname === "/my-plan"
                    ? "bg-lime-400 text-black"
                    : "text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                My Plan
              </Link>

              <div className="mt-2 flex gap-3">
                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex-1 rounded-full bg-lime-400 px-4 py-2 text-center text-sm font-bold text-black"
                >
                  Plan {todayPlan.length}
                </Link>

                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex-1 rounded-full border border-zinc-600 px-4 py-2 text-center text-sm font-bold text-white"
                >
                  Saved {savedWorkouts.length}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;