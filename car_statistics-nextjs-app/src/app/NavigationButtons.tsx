import Link from "next/link";
import "./globals.css";

export const NavigationButtons = () => {
  return (
    <div className="flex justify-center gap-20">
      <Link href="/">
        <div className="bg-blue-500 text-white py-2 px-4 rounded border-none cursor-pointer hover:bg-blue-700 transition duration-300">
          Home
        </div>
      </Link>
      <Link href="/car-graph">
        <div className="bg-blue-500 text-white py-2 px-4 rounded border-none cursor-pointer hover:bg-blue-700 transition duration-300">
          Car day graph
        </div>
      </Link>
      <Link href="/car-statistics">
        <div className="bg-blue-500 text-white py-2 px-4 rounded border-none cursor-pointer hover:bg-blue-700 transition duration-300">
          Car statistics table
        </div>
      </Link>
    </div>
  );
};
