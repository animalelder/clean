"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function VideoBackground({ videoSources }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const playNextVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  }, [videoSources.length]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleEnded = () => {
        playNextVideo();
      };

      videoElement.addEventListener("ended", handleEnded);

      return () => {
        videoElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [playNextVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((error) => console.error("Error playing video:", error));
    }
  }, [videoRef]); // Removed unnecessary dependency: currentVideoIndex

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-primary-red/50" /> {/* Overlay */}
      </div>
    </div>
  );
}
