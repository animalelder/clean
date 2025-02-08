import React from "react";
import calculateReadingTime from "@/lib/readingTimeCalculation";

export default function ReadingTime({ devotionText }) {
  // write a function to calculate read time, or obtain read time from DB
  const { minutes, seconds, totalMinutes } = calculateReadingTime(devotionText);
  return (
    <div className="text-xl font-extralight ml-[5vw] max-xs:text-sm">
      {minutes} minute read
    </div>
  );
}
