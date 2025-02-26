"use client";

import React from "react";

export default function MainImage({ videoId }) {
  return (
    <div>
      <iframe
        id="player"
        type="text/html"
        width="640"
        height="390"
        src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        frameborder="0"
      ></iframe>
    </div>
  );
}
