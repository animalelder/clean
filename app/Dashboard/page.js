"use client";

import React from "react";
import { SignedIn } from "@clerk/nextjs";
import DailySurvey from "@/components/Dashboard/DailySurvey";
import MainBody from "@/components/Dashboard/MainBody";
import NavigationBar from "@/components/Dashboard/NavigationBar";

export default function Dashboard() {
  return (
    <SignedIn>
      <div className="relative mx-16 flex min-h-screen flex-col items-center justify-start">
        <NavigationBar />
        <DailySurvey />
        <MainBody />
      </div>
    </SignedIn>
  );
}
