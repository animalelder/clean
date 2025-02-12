import React from "react";

export default function Title({ weekTitle, dayTitle, daySubtitle }) {
  return (
    <>
      <div className="text-5xl font-bold max-xs:text-lg max-sm:text-2xl">
        {weekTitle}
      </div>
      <div className="text-4xl max-xs:text-md max-sm:text-xl">{dayTitle}</div>
      {daySubtitle ? (
        <div className="text-4xl max-xs:text-md max-sm:text-xl">
          {daySubtitle}
        </div>
      ) : null}
    </>
  );
}
