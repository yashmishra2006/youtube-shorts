"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/firebaseConfig";

// Create the single context
const AppContext = createContext(null);

// Create the Provider that will hold all the logic
export const AppProvider = ({ children }) => {
  // --- Authentication State ---
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null); // null = loading

  // --- Sidebar State ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // --- Video Data State ---
  const [videoData, setVideoData] = useState(null);
  
  // --- Rendering Project State ---
  const [renderingProjectId, setRenderingProjectId] = useState(null);

  // Debug function to log video data changes
  const setVideoDataWithLogging = (data) => {
    // console.log("AppContext: Setting video data:", data);
    setVideoData(data);
  };

  // Debug: Track video data changes
  useEffect(() => {
    // console.log("AppContext: VideoData changed:", videoData);
  }, [videoData]);

  // The authentication logic from your old layout.js
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Combine all state and functions into one value object
  const value = {
    user,
    loggedIn,
    isSidebarOpen,
    toggleSidebar,
    videoData,
    setVideoData: setVideoDataWithLogging,
    renderingProjectId,
    setRenderingProjectId,
  };

  // Render children only after auth check is complete
  return (
    <AppContext.Provider value={value}>
      {loggedIn !== null ? children : <div>Loading...</div>}
    </AppContext.Provider>
  );
};

// Create the single custom hook to use everywhere
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};