"use client";

import React from "react";
import { useDashboardContext } from "@/contexts/dashboard/dashboard-provider";

export default function WeekCard({ week, status, title, progress }) {
  // Get user progress data from context
  const { userProgress } = useDashboardContext();

  // Determine how many days are completed for this week
  const weekKey = `week${week}`;
  const daysCompleted = userProgress.daysCompleted[weekKey] || 0;

  // Total days per week (assuming 7)
  const totalDaysPerWeek = 7;

  // Generate array for progress bars
  const progressBars = Array.from({ length: totalDaysPerWeek }, (_, index) => {
    // Return true if this day is completed, false otherwise
    return index < daysCompleted;
  });

  return (
    <div className="h-[290px] w-[320px] flex-col items-center justify-center rounded-3xl bg-lesson-card bg-top bg-no-repeat shadow-lg">
      <div className="h-[158px] w-full" />
      <div className="flex h-[132px] w-full items-center justify-center rounded-bl-3xl rounded-br-3xl">
        <div className="flex h-[86px] w-[280px] flex-col justify-evenly gap-y-2">
          <div className="inline-flex w-full items-start justify-between self-stretch">
            <div className="text-[10px] font-medium uppercase leading-[14px] tracking-wide text-slate-500">
              Week {week}
            </div>
            <div className="inline-flex h-[18px] w-[69px] items-center justify-center gap-2.5 rounded-2xl bg-lime-500/20 px-1.5 py-px">
              <div className="text-[8px] font-medium uppercase leading-none text-lime-500">
                {status}
              </div>
            </div>
          </div>
          <div className="text-base font-medium capitalize leading-relaxed text-zinc-900">
            {title}
          </div>
          <div className="relative h-1.5 w-[279.02px]">
            <div className="absolute left-0 top-0 h-1.5 w-[279.02px] rounded-[52px] bg-gray-200 opacity-60" />
            <div className="absolute left-0 top-0 inline-flex h-1.5 w-[279.01px] items-start justify-start gap-0.5 rounded-[52px]">
              {/* Dynamically render progress bars based on days completed */}
              {progressBars.map((isCompleted, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-[38.43px] rounded-[52px] ${isCompleted ? "bg-lime-500" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 inline-flex w-full items-start justify-between self-stretch">
            <div className="text-xs font-medium capitalize leading-[18px] text-slate-500">
              Progress
            </div>
            <div className="text-xs font-bold capitalize leading-[18px] text-zinc-900">
              {progress}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
