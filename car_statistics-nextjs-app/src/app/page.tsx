"use client";
import HomePage from "@/features/home/HomePage";
import { NavigationButtons } from "./NavigationButtons";
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <main>
      <div>
        <NavigationButtons />
      </div>
      <HomePage />
    </main>
  );
}
