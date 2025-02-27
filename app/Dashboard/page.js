"use client";

import React from "react";
import { SignedIn } from "@clerk/nextjs";
import DailySurvey from "@/components/Dashboard/DailySurvey";
import MainBody from "@/components/Dashboard/MainBody";
import NavigationBar from "@/components/Dashboard/NavigationBar";

const userInfo = {
  initials: "DA",
  avatarUrl: "",
  firstName: "Donovan",
  fullName: "Donovan Anderson",
  cohort: 23,
};

const userProgress = {
  currentWeek: "1",
  currentDay: "1",
  startDate: new Date(),
  previousDay: null,
  currentDayTitle: "Sanctification",
  daysCompleted: {
    totalDays: 0,
    week1: 0,
    week2: 0,
    week3: 0,
    week4: 0,
    week5: 0,
    week6: 0,
    week7: 0,
  },
};

export default function Dashboard() {
  return (
    <SignedIn>
      <div className="relative mx-16 flex min-h-screen flex-col items-center justify-start">
        <NavigationBar
          initials={userInfo.initials}
          avatarUrl={userInfo.avatarUrl}
          firstName={userInfo.firstName}
        />

        <DailySurvey
          userProgress={userProgress}
          userInfo={userInfo}
        />
        <MainBody
          userProgress={userProgress}
          userInfo={userInfo}
        />
      </div>
    </SignedIn>
  );
}
