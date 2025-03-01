"use client";

import React from "react";
import MainBody from "@/components/Dashboard/MainBody";
import NavigationBar from "@/components/Dashboard/NavigationBar";

export default function Dashboard() {
  return (
    <div className="relative mx-16 flex min-h-screen flex-col items-center justify-start">
      <NavigationBar />
      <MainBody />
    </div>
  );
}
