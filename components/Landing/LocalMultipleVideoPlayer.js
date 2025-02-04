"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function VideoBackground({ videoSources }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  // We keep the playNextVideo function for cases where you might want to play multiple videos
  const playNextVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  }, [videoSources.length]);

  // Handle video loading with improved error logging
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      // Play the video with better error handling
      videoElement.play().catch((error) => {
        // Provide more specific error messages based on the error type
        if (error.name === "NotAllowedError") {
          console.error(
            "Video autoplay was prevented by the browser. This is common on mobile devices:",
            error,
          );
        } else {
          console.error("Error playing video:", error);
        }
      });
    };

    const handleLoadedData = () => {
      console.log("Video data loaded successfully");
      setIsVideoLoaded(true);
    };

    const handleError = (e) => {
      console.error("Video loading error:", {
        error: videoElement.error,
        code: videoElement.error?.code,
        message: videoElement.error?.message,
      });
      setIsVideoLoaded(false);
    };

    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("loadeddata", handleLoadedData);
    videoElement.addEventListener("error", handleError);

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      videoElement.removeEventListener("error", handleError);
    };
  }, [currentVideoIndex]);

  // Handle video ending - simplified since we're using loop
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleEnded = () => {
      // Only call playNextVideo if we have multiple videos
      if (videoSources.length > 1) {
        playNextVideo();
      }
    };

    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [playNextVideo, videoSources.length]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="absolute object-cover w-full h-full"
          autoPlay
          muted
          playsInline
          loop
          // Added preload attribute for better loading behavior
          preload="auto"
        >
          <source
            src={videoSources[currentVideoIndex]}
            // Simplified type check since we're using MP4
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Loading state with a subtle background */}
        {!isVideoLoaded && <div className="absolute inset-0" />}
        <div className="absolute inset-0" />
      </div>
    </div>
  );
}
