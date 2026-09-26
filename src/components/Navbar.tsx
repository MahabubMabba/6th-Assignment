import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex gap-4">
            <Image
            src={logo}
            alt=""
            width={20}
            height={30}
            priority
          />
          <p className="font-bold">FITLOG</p>
          </div>
       

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-medium">
            Workout
          </Link>

          <Link href="/my-plan" className="font-medium">
            My Plan
          </Link>
        </div>

        {/* Plan & Saved */}
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
