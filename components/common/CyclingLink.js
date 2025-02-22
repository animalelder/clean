"use client";

import React, { useState } from "react";

export const CyclingLink = ({ urls, children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (e) => {
    if (urls.length > 1) {
      e.preventDefault();
      // Open the current URL in a new tab
      window.open(urls[currentIndex], "_blank", "noopener,noreferrer");
      // Update the index for the next click
      setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
    }
  };

  // Since these are external URLs, we don't use Next.js Link's href property
  // Instead, we use a regular <a> tag with the proper Next.js handling
  return (
    <a
      href={urls[0]}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};
