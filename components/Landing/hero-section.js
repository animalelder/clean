"use client";

import React, { useEffect } from "react";
import VideoBackground from "./LocalMultipleVideoPlayer";

export function HeroSection() {
  const videoSources = [
    "/videos/Hero Video Corrected.mp4",
    "/videos/Hero Video Corrected.mp4",
    "/videos/Hero Video Corrected.mp4",
  ];

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end text-center text-white">
      <VideoBackground videoSources={videoSources} />
      <div className="container relative px-4 mx-auto mb-8">
        {/* <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Build True Brotherhood.
        </h1> */}
        <p className="mb-6 text-xl italic sm:text-2xl md:text-3xl text-white/90">
          Discover your purpose and grow into the man God designed you to be.
        </p>
        <button className="inline-flex flex-col items-center gap-2 transition-transform group hover:-translate-y-1">
          <span className="text-lg font-medium">Take the Step</span>
          <span className="animate-bounce">↓</span>
        </button>
      </div>
    </section>
  );
}
