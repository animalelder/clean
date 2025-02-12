import React from "react";
import { PiLightningFill } from "react-icons/pi";

export default function ReflectionBox({ reflectionQuestion }) {
  return (
    <div className="flex flex-row  bg-[#F5BD4F] bg-opacity-15 py-[2vh] px-[1vh] rounded-md shadow-lg">
      {/* icon */}
      <PiLightningFill size={60} color="#F5BD4F" />
      <div className="flex flex-col">
        <div className="text-2xl lg:text-3xl">Reflection:</div>
        <div className="text-xl font-extralight max-xs:text-md">
          {reflectionQuestion}
        </div>
      </div>
    </div>
  );
}
