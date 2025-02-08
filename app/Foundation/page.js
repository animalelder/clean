import React from "react";
import devotionalData from "@/sample-data/DevotionalData.json";
import Divider from "@/components/common/Divider";
import BCVT from "@/components/Foundation/BCVT";
import CompleteLesson from "@/components/Foundation/CompleteLesson";
import Description from "@/components/Foundation/Description";
import MainImage from "@/components/Foundation/MainImage";
import MainLesson from "@/components/Foundation/MainLesson";
import Quotes from "@/components/Foundation/Quotes";
import ReadingTime from "@/components/Foundation/ReadingTime";
import ReflectionBox from "@/components/Foundation/ReflectionBox";
import ScripturesSection from "@/components/Foundation/ScripturesSection";
import SectionTitle from "@/components/Foundation/SectionTitle";
import SidePanel from "@/components/Foundation/SidePanel/SidePanel";
import SubTitle from "@/components/Foundation/SubTitle";
import Title from "@/components/Foundation/Title";

export default function Foundation() {
  return (
    <div className="flex flex-col justify-between px-2 py-2 md:px-4 md:py-4 lg:px-[1vw] lg:py-[1vh] w-full mt-16">
      <div className="flex flex-col items-center mt-8">
        {/* back button */}

        {/* main content container */}
        <div className="flex flex-col md:max-w-7xl lg:max-w-10xl">
          {/* text container */}
          <div className="flex flex-col items-start mb-8 bg-white md:flex-col">
            {/* title */}
            <div className="mt-[3vh]">
              <Title
                weekTitle={devotionalData[1].weekTitle}
                dayTitle={devotionalData[1].dayTitle}
                daySubtitle={devotionalData[1].daySubtitle}
              />
            </div>

            {/* sub title and pill status */}
            <div className="mt-[1vh] mb-[2vh]">
              <SubTitle
                week={devotionalData[1].week}
                day={devotionalData[1].day}
              />
            </div>

            {/* image with play button */}
            <div className="flex justify-center w-full">
              <MainImage />
            </div>

            {/* quotes */}
            <div className="flex justify-center w-full">
              <Quotes />
            </div>
            {/* Scriptures section */}
            <div className="flex justify-center w-full mb-[3vh]">
              <ScripturesSection scriptures={devotionalData[1].Scriptures} />
            </div>

            {/* Section Title -- RETAIN: may be needed for repositioning Day Title */}
            {/* <div className="flex w-full justify-left mt-[5vh]">
              <SectionTitle />
            </div> */}
            {/* reading estimate */}
            <div className="flex w-full justify-left mt-[1vh]">
              <ReadingTime devotionText={devotionalData[1].devotionText} />
            </div>
            {/* Text */}
            <div className="flex w-full justify-left mt-[3vh]">
              <MainLesson devotionText={devotionalData[1].devotionText} />
            </div>
            {/* Reflection box */}
            <div className="flex w-full justify-center mt-[6vh] ">
              <ReflectionBox
                reflectionQuestion={devotionalData[1].reflectionQuestion}
              />
            </div>

            {/* Divider */}
            <Divider />

            {/* complete lesson container */}
            <div className="flex w-full justify-center mt-[2vh]">
              <CompleteLesson />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
