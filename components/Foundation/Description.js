import React from "react";

export default function Description({ scriptures }) {
  return (
    <div className="flex text-xl font-bold text-center capitalize lg:text-3xl max-xs:text-lg max-xs:px-10">
      {scriptures}
    </div>
  );
}
