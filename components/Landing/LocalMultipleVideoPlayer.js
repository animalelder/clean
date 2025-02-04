"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function VideoBackground({ videoSources }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Check if we're on mobile and update video positioning accordingly
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initially
    checkMobile();

    // Update on resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Adjust video positioning based on screen size and video dimensions
  useEffect(() => {
    const videoElement = videoRef.current;
    const container = containerRef.current;

    if (!videoElement || !container) return;

    const handleLoadedMetadata = () => {
      const videoAspect = videoElement.videoWidth / videoElement.videoHeight;
      const containerAspect = container.clientWidth / container.clientHeight;

      // On mobile, we want to ensure the video covers the full height
      if (isMobile) {
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.objectFit = "cover";
        // Adjust position to keep important content in view
        videoElement.style.objectPosition = "center center";
      } else {
        // For desktop, maintain standard cover behavior
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.objectFit = "cover";
      }
    };

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [isMobile]);

  // Previous event handlers remain the same...
  // (keeping your existing play, error, and ended handlers)

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      ref={containerRef}
    >
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className={`absolute w-full h-full ${
            isMobile ? "object-cover md:object-cover" : "object-cover"
          }`}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!isVideoLoaded && <div className="absolute inset-0" />}
        <div className="absolute inset-0 bg-black bg-opacity-[5%]" />{" "}
        {/* Overlay for better text visibility */}
      </div>
    </div>
  );
}
