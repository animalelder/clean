"use client";

import React from "react";
import { DailySurveySidebar } from "@/components/Dashboard/daily-survey-sidebar";
import MainBody from "@/components/Dashboard/MainBody";
import NavigationBar from "@/components/Dashboard/NavigationBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <div className="relative mx-16 flex min-h-screen flex-col items-center justify-start">
      <SidebarProvider defaultOpen={false}>
        <SidebarTrigger />
        <div className="w-64 shrink-0">
          <DailySurveySidebar />
        </div>
        <NavigationBar />
        <MainBody />
      </SidebarProvider>
    </div>
  );
}
