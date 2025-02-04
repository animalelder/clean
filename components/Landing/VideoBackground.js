"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function VideoBackground({ videoSources }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [videoAspect, setVideoAspect] = useState(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDesktopVideo = () => {
    const videoElement = videoRef.current;
    const container = containerRef.current;

    if (!videoElement || !container) return;

    videoElement.style.width = "100%";
    videoElement.style.height = "100%";
    videoElement.style.objectFit = "cover";
    videoElement.style.objectPosition = "center center";
  };

  const handleMobileVideo = useCallback(() => {
    const videoElement = videoRef.current;
    const container = containerRef.current;

    if (!videoElement || !container) return;

    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    setVideoAspect(aspectRatio);
    setIsVideoLoaded(true);

    const updateVideoDimensions = () => {
      const containerAspect = container.clientWidth / container.clientHeight;

      if (containerAspect > aspectRatio) {
        videoElement.style.width = "100%";
        videoElement.style.height = "auto";
        const heightDiff =
          (container.clientWidth / aspectRatio - container.clientHeight) / 2;
        videoElement.style.transform = `translateY(-${heightDiff}px)`;
      } else {
        videoElement.style.width = "auto";
        videoElement.style.height = "100%";
        const widthDiff =
          (container.clientHeight * aspectRatio - container.clientWidth) / 2;
        videoElement.style.transform = `translateX(-${widthDiff}px)`;
      }
    };

    updateVideoDimensions();
    window.addEventListener("resize", updateVideoDimensions);
    return () => window.removeEventListener("resize", updateVideoDimensions);
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = isMobile
      ? handleMobileVideo
      : handleDesktopVideo;
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [isMobile, handleMobileVideo]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      ref={containerRef}
    >
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className={
            isMobile
              ? "absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
              : "absolute w-full h-full object-cover"
          }
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
        <div className="absolute inset-0 bg-black bg-opacity-[5%]" />
      </div>
    </div>
  );
}
