import React from "react";

export default function ScripturesSection({ scriptures }) {
  return (
    <div className="m flex flex-col">
      {Object.entries(scriptures).map(([key, scripture]) => (
        <div
          key={key}
          className="mb-16 items-center"
        >
          <div className="mb-4 flex text-center text-xl font-bold capitalize max-xs:px-10 max-xs:text-lg lg:text-2xl">
            {scripture.text}
          </div>
          <div className="mx-auto flex w-80 border-t-[5px] border-t-[#F5BD4F]"></div>
          <div className="mx-auto pt-3 text-center font-semibold lg:text-xl">
            {scripture.book} {scripture.chapter}:{scripture.verse} (
            {scripture.translation})
          </div>
        </div>
      ))}
    </div>
  );
}
