import React from "react";

export default function ScripturesSection({ scriptures }) {
  return (
    <div className="flex flex-col m">
      {Object.entries(scriptures).map(([key, scripture]) => (
        <div key={scripture.verse} className="items-center mb-16">
          <div className="flex mb-4 text-xl font-bold text-center capitalize lg:text-2xl max-xs:text-lg max-xs:px-10">
            {scripture.text}
          </div>
          <div className="flex border-t-[5px] border-t-[#F5BD4F] w-80 mx-auto"></div>
          <div className="pt-3 mx-auto font-semibold text-center lg:text-xl">
            {scripture.book} {scripture.chapter}:{scripture.verse} (
            {scripture.translation})
          </div>
        </div>
      ))}
    </div>
  );
}
