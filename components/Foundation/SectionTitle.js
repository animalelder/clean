import React from "react";

export default function SectionTitle({ section }) {
  return (
    <div className="text-4xl font-light capitalize ml-[5vw] max-xs:text-xl">
      {section}
    </div>
  );
}
