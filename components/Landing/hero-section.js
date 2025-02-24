"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import VideoBackground from "./VideoBackground";

export function HeroSection() {
  const videoSources = ["/videos/hero-3_1080_16-9.mp4"];

  return (
    <section className="relative after:absolute after:inset-0 after:bg-black/15 mt-[85px] flex flex-col justify-end w-full min-h-[100dvh] text-center">
      <VideoBackground videoSources={videoSources} />
      <div className="container relative z-10 px-4 mx-auto mb-24 md:text-white">
        <p className="max-w-3xl mx-auto mb-8 text-lg italic text-black md:text-white drop-shadow-xl sm:text-xl md:text-2xl lg:text-3xl">
          Discover your purpose and grow into the man God designed you to be.
        </p>
        <div className="space-x-3">
          <Link href="/individuals">
            <Button className="text-white drop-shadow-md bg-primary-red hover:bg-red-500">
              For Individuals
            </Button>
          </Link>
          <Link href="/churches">
            <Button className="text-white drop-shadow-md bg-accent-red hover:bg-red-500">
              For Churches
            </Button>
          </Link>
          <button
            className="inline-flex flex-row items-center gap-2 px-2 py-2 text-white transition-transform rounded-lg drop-shadow-md bg-almost-black hover:bg-gray-800 group hover:-translate-y-1"
            onClick={() => {
              document
                .getElementById("TwoFaces")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-base font-medium text-white ">
              Learn More
            </span>
            <span className="text-white animate-bounce">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
