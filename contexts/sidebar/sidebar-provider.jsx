// File: components/ui/sidebar/sidebar-provider.jsx

import React, { createContext, useContext, useState } from "react";

// Create a context for the sidebar state
const SidebarContext = createContext(undefined);

// Hook to use the sidebar context
export function useSidebar() {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}

// Provider component that wraps your app or specific pages
export function SidebarProvider({ children, defaultExpanded = true }) {
  // State for tracking if sidebar is expanded
  const [expanded, setExpanded] = useState(defaultExpanded);

  // Function to toggle sidebar expansion state
  const toggleSidebar = () => setExpanded((prev) => !prev);

  // Function to explicitly set sidebar state
  const setSidebarExpanded = (state) => setExpanded(state);

  // Create the value object for the context
  const value = {
    expanded,
    toggleSidebar,
    setSidebarExpanded,
  };

  // Provide the context to children
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
