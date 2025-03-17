"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import YoutubeVideo from "@/components/testimonials/youtube-video";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  creator: string;
}

export default function VideoCarousel() {
  const videos: Video[] = [
    {
      id: "UaxzNkIJMKg",
      title: "A Father's Legacy: How Damon's Sons Found Renewal Through CLEAN",
      creator: "Damon Tucker",
    },
    {
      id: "rtU_jEiPk00",
      title: "Standing Firm: Wes's Journey to Biblical Conviction in Marriage",
      creator: "Wes Miller",
    },
    {
      id: "8dioAW7WFXY",
      title: "Renewed Spirit: Ray's Fresh Start and Spiritual Awakening",
      creator: "Ray Green",
    },
    {
      id: "o5GlxC2Slso",
      title:
        "From the Beginning: Melvin's Testimony of Brotherhood and Transformation",
      creator: "Melvin Stewart",
    },
  ];

  // Initialize with the first video
  const [activeVideo, setActiveVideo] = useState<string>(videos[0].id);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === "left" ? -220 : 220;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const getThumbnailUrl = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const getActiveVideoData = () => {
    return videos.find((video) => video.id === activeVideo) || videos[0];
  };

  const getOtherVideos = () => {
    return videos.filter((video) => video.id !== activeVideo);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-4 md:py-8">
      <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">
        Featured Videos
      </h2>

      <div className="grid gap-4 md:gap-8">
        {/* Featured Video */}
        <div className="mx-auto w-full max-w-full px-0 sm:px-4 md:px-6 lg:max-w-4xl">
          <div
            className="mx-auto w-[80%] overflow-hidden rounded-lg bg-black md:w-full lg:w-[80%]"
            style={{
              height: "calc(56.25vw - 2rem)",
              minHeight: "200px",
              maxHeight: "500px",
            }}
          >
            <YoutubeVideo
              videoId={activeVideo}
              dimensions={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="mt-2 md:mt-4">
            <h3 className="text-base font-semibold md:text-xl">
              {getActiveVideoData().title}
            </h3>
            <p className="text-sm text-gray-600 md:text-base">
              {getActiveVideoData().creator}
            </p>
          </div>
        </div>

        {/* Other Videos Carousel */}
        <div>
          <h3 className="mb-2 text-base font-medium md:mb-4 md:text-lg">
            More Videos
          </h3>
          <div className="relative">
            <div
              ref={carouselRef}
              className="scrollbar-hide flex snap-x gap-2 overflow-x-auto pb-4 md:gap-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {getOtherVideos().map((video) => (
                <div
                  key={video.id}
                  className="w-[180px] flex-shrink-0 snap-start md:w-[220px]"
                >
                  <div
                    className="aspect-video group relative cursor-pointer items-center overflow-hidden rounded-lg"
                    onClick={() => setActiveVideo(video.id)}
                  >
                    <Image
                      src={getThumbnailUrl(video.id) || "/placeholder.svg"}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      width={320}
                      height={180}
                      sizes="(max-width: 480px) 95vw, (max-width: 768px) 180px, 320px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-8 w-8 text-white md:h-10 md:w-10" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1 md:p-2">
                      <p className="text-xs font-medium text-white md:text-sm">
                        {video.creator}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {getOtherVideos().length > 2 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-lg hover:bg-white md:flex"
                  onClick={() => scroll("left")}
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="sr-only">Scroll left</span>
                </Button>

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 rounded-full bg-white/80 shadow-lg hover:bg-white md:flex"
                  onClick={() => scroll("right")}
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="sr-only">Scroll right</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
