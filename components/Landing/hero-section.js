"use client";

import React, { useEffect, useState } from "react";
import VideoBackground from "./VideoBackground";

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const videoSources = ["/videos/Hero Video Corrected.mp4"];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end text-center">
      <VideoBackground videoSources={videoSources} />
      <div className="container relative z-10 px-4 mx-auto mb-8">
        <p
          className={`max-w-3xl mx-auto mb-6 text-lg italic sm:text-xl md:text-2xl lg:text-3xl ${isMobile ? "text-black/90" : "text-white/90"}`}
        >
          Discover your purpose and grow into the man God designed you to be.
        </p>
        <button
          className={`inline-flex flex-col items-center gap-2 px-6 py-3 transition-transform rounded-lg group hover:-translate-y-1 ${isMobile ? "text-black" : "text-white"}`}
        >
          <span className="text-base font-medium sm:text-lg">
            Take the Step
          </span>
          <span className="animate-bounce">↓</span>
        </button>
      </div>
    </section>
  );
}
