"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ImageSrc from "../../public/Jesus Washing Disciples Feet-full.png";
import YoutubeVideo from "../Landing/YouTubeVideoPlayerv2";
import PlayButton from "./PlayButton";

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
