"use client";

import React, { createContext, useContext, useState } from "react";
import {
  initialUserInfo,
  initialUserProgress,
  initialWeekStaticInfo,
} from "@/contexts/dashboard/dashboard-data";

const DashboardContext = createContext(undefined);

export default function DashboardProvider({ children }) {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [userProgress, setUserProgress] = useState(initialUserProgress);
  const weekStaticInfo = initialWeekStaticInfo;

  const value = {
    userInfo,
    setUserInfo,
    userProgress,
    setUserProgress,
    weekStaticInfo,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within the DashboardProvider",
    );
  }
  return context;
}
