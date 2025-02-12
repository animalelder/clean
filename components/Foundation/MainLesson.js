import React from "react";

export default function MainLesson({ devotionText }) {
  // Split text into paragraphs by newline characters and trim whitespace
  const paragraphs = devotionText
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0); // Remove empty paragraphs

  return (
    <div className="mx-4 text-2xl leading-relaxed font-extralight sm:mx-8 lg:mx-16 max-xs:text-lg">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-6">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
