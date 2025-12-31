"use client";

import React, { createContext, useState, useContext } from "react";

const VideoContext = createContext(undefined);

export const VideoProvider = ({ children }) => {
  const [videoData, setVideoData] = useState(null);

  return (
    <VideoContext.Provider value={{ videoData, setVideoData }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
