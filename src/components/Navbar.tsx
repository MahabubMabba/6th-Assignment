"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../../assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
    
        <Link href="/">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={30}
            height={40}
            priority
          />
        </Link>

     
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`font-medium ${
              pathname === "/"
                ? "text-lime-600"
                : "text-gray-700"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`font-medium ${
              pathname === "/my-plan"
                ? "text-lime-600"
                : "text-gray-700"
            }`}
          >
            My Plan
          </Link>
        </div>

       
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-lime-400 px-4 py-2 text-sm font-bold"
          >
            Plan 0
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-gray-900 px-4 py-2 text-sm font-bold"
          >
            Saved 0
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;