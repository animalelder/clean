import React from "react";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
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

// The component now receives devotionalData directly as a prop
export default function Foundation({ devotionalData, error }) {
  // Handle any errors that occurred during data fetching
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading devotional: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between px-2 py-2 md:px-4 md:py-4 lg:px-[1vw] lg:py-[1vh] w-full mt-16">
      <div className="flex flex-col items-center mt-8">
        <div className="flex flex-col md:max-w-7xl lg:max-w-10xl">
          <div className="flex flex-col items-start mb-8 bg-white md:flex-col">
            <div className="mt-[3vh]">
              <Title
                weekTitle={devotionalData.weekTitle}
                dayTitle={devotionalData.dayTitle}
                daySubtitle={devotionalData.daySubTitle}
              />
            </div>

            <div className="mt-[1vh] mb-[2vh]">
              <SubTitle week={devotionalData.week} day={devotionalData.day} />
            </div>

            <div className="flex justify-center w-full">
              <MainImage />
            </div>

            <div className="flex justify-center w-full">
              <Quotes />
            </div>

            <div className="flex justify-center w-full mb-[3vh]">
              <ScripturesSection scriptures={devotionalData.Scriptures} />
            </div>

            <div className="flex w-full justify-left mt-[1vh]">
              <ReadingTime devotionText={devotionalData.devotionText} />
            </div>

            <div className="flex w-full justify-left mt-[3vh]">
              <MainLesson devotionText={devotionalData.devotionText} />
            </div>

            <div className="flex w-full justify-center mt-[6vh]">
              <ReflectionBox
                reflectionQuestion={devotionalData.reflectionQuestion}
              />
            </div>

            <Divider />

            <div className="flex w-full justify-center mt-[2vh]">
              <CompleteLesson />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// This function runs on the server for every request
export async function getServerSideProps({ params }) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("your_database_name"); // Replace with your database name

    // Convert the ID parameter to MongoDB ObjectId and fetch the devotional
    const devotional = await db
      .collection("devotionals")
      .findOne({ _id: new ObjectId(params.id) });

    // If no devotional is found, return 404
    if (!devotional) {
      return {
        notFound: true, // This will show Next.js's 404 page
      };
    }

    // MongoDB documents contain some special types that can't be serialized
    // We need to convert the document to a plain JavaScript object
    return {
      props: {
        devotionalData: JSON.parse(JSON.stringify(devotional)),
      },
    };
  } catch (error) {
    console.error("Error fetching devotional:", error);

    // Return the error as props so we can show it in the component
    return {
      props: {
        error: "Failed to load devotional content",
      },
    };
  }
}
