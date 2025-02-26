"use client";

import React from "react";
import YouTube from "react-youtube";

export default function YoutubeVideo({
  videoId,
  dimensions = { height: "400", width: "100%" },
}) {
  // Properly format dimensions
  const formattedHeight =
    typeof dimensions.height === "number"
      ? `${dimensions.height}px`
      : dimensions.height;
  const formattedWidth =
    typeof dimensions.width === "number"
      ? `${dimensions.width}px`
      : dimensions.width;

  const opts = {
    height: formattedHeight,
    width: formattedWidth,
    playerVars: {
      autoplay: 0,
      controls: 1,
      disablekb: 1,
      enablejsapi: 1,
      loop: 0,
      mute: 0,
      playlist: videoId,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  const onReady = (event) => {
    void event;
    return null;
  };

  return (
    <div
      className="relative"
      // style={{
      //   width: formattedWidth,
      //   height: formattedHeight,
      // }}
    >
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        className="h-full w-full"
      />
    </div>
  );
}
