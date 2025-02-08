import React from "react";

export default function SubTitle({ week, day }) {
  return (
    <div className="flex flex-row items-center gap-2 max-xs:text-lg">
      <h5 className="text-gray-600 max-xs:text-sm">WEEK {week}, DAY {day}</h5>
      <h5 className="px-2 py-1 text-white bg-[#F5BD4F] rounded-xl max-xs:text-sm">
        In Progress
      </h5>
    </div>
  );
}
