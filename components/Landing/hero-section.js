"use client";

import React, { useState } from "react";
import VideoBackground from "./VideoBackground";

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const videoSources = ["/videos/Hero Video Corrected.mp4"];

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end text-center text-white">
      <VideoBackground videoSources={videoSources} />
      <div className="container relative z-10 px-4 mx-auto mb-8">
        <p className="max-w-3xl mx-auto mb-6 text-lg italic sm:text-xl md:text-2xl lg:text-3xl text-white/90">
          Discover your purpose and grow into the man God designed you to be.
        </p>
        <button className="inline-flex flex-col items-center gap-2 px-6 py-3 transition-transform rounded-lg group hover:-translate-y-1 ">
          <span className="text-base font-medium sm:text-lg">
            Take the Step
          </span>
          <span className="animate-bounce">↓</span>
        </button>
      </div>
    </section>
  );
}
