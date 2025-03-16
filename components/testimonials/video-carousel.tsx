"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import YoutubeVideo from "./youtube-video";

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
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">Featured Videos</h2>

      <div className="grid gap-8">
        {/* Featured Video */}
        <div className="w-full">
          <div
            className="w-full overflow-hidden rounded-lg bg-black"
            style={{ height: "calc(100vh - 300px)", minHeight: "400px" }}
          >
            <YoutubeVideo
              videoId={activeVideo}
              dimensions={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">
              {getActiveVideoData().title}
            </h3>
            <p className="text-gray-600">{getActiveVideoData().creator}</p>
          </div>
        </div>

        {/* Other Videos Carousel */}
        <div>
          <h3 className="mb-4 text-lg font-medium">More Videos</h3>
          <div className="relative">
            <div
              ref={carouselRef}
              className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {getOtherVideos().map((video) => (
                <div
                  key={video.id}
                  className="w-[220px] flex-shrink-0 snap-start"
                >
                  <div
                    className="aspect-video group relative cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setActiveVideo(video.id)}
                  >
                    <img
                      src={getThumbnailUrl(video.id) || "/placeholder.svg"}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-sm font-medium text-white">
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
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-lg hover:bg-white"
                  onClick={() => scroll("left")}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Scroll left</span>
                </Button>

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/80 shadow-lg hover:bg-white"
                  onClick={() => scroll("right")}
                >
                  <ChevronRight className="h-5 w-5" />
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
