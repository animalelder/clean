"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import VideoBackground from "./VideoBackground";

// Replacing the classNames in the first p element will bring in the shimmer text:
// "max-w-3xl relative before:absolute before:inset-0 before:bg-white before:bg-clip-text bg-blend-hue  mx-auto mb-8 text-lg italic text-transparent bg-gradient-to-b from-yellow-50 via-yellow-400 to-amber-100 animate-shimmer bg-clip-text drop-shadow-[0_35px_35px_rgba(0,0,0,0.75)] sm:text-xl md:text-2xl lg:text-3xl lg:font-medium xl:text-4xl"

export function HeroSection() {
  const videoSources = ["/videos/hero-3_1080_16-9.mp4"];

  return (
    <section className="relative mt-[85px] flex min-h-[100dvh] w-full flex-col justify-end text-center after:absolute after:inset-0 after:bg-black/15">
      <VideoBackground videoSources={videoSources} />
      <div className="container relative z-10 px-4 mx-auto mb-24 md:text-white">
        <p className="max-w-3xl mx-auto mb-8 text-lg italic text-black drop-shadow-xl sm:text-xl md:text-2xl md:text-white lg:text-3xl">
          Discover your purpose and grow into the man God designed you to be.
        </p>
        <div className="space-x-3">
          <Link href="/individuals">
            <Button className="text-white bg-primary-red drop-shadow-md hover:bg-red-500">
              For Individuals
            </Button>
          </Link>
          <Link href="/churches">
            <Button className="text-white bg-accent-red drop-shadow-md hover:bg-red-500">
              For Churches
            </Button>
          </Link>
          <button
            className="inline-flex flex-row items-center gap-2 px-2 py-2 text-white transition-transform rounded-lg group bg-almost-black drop-shadow-md hover:-translate-y-1 hover:bg-gray-800"
            onClick={() => {
              document
                .getElementById("TwoFaces")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-base font-medium text-white">Learn More</span>
            <span className="text-white animate-bounce">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
