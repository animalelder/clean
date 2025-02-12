"use client";

import VideoBackground from "./VideoBackground";

export function HeroSection() {
  const videoSources = ["/videos/hero_video3.mp4"];

  return (
    <section className="relative mt-[85px] flex flex-col justify-end w-full min-h-[100dvh] text-center">
      <VideoBackground videoSources={videoSources} />
      <div className="container relative z-10 px-4 mx-auto mb-8">
        <p className="max-w-3xl mx-auto mb-6 text-lg italic text-black md:text-white sm:text-xl md:text-2xl lg:text-3xl">
          Discover your purpose and grow into the man God designed you to be.
        </p>
        <button
          className="inline-flex flex-col items-center gap-2 px-6 py-3 transition-transform rounded-lg group hover:-translate-y-1"
          onClick={() => {
            document
              .getElementById("TwoFaces")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="mb-6 text-base font-medium text-black md:text-white sm:text-lg">
            Take the Step
          </span>
          <span className="text-black md:text-white animate-bounce">↓</span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
