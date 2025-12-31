import React from "react";

const GradientBorderBox = ({ children }) => {
  const gradientBorderStyle = {
    border: "2px solid transparent", // Increased from 1px to 4px
    borderImageSource:
      "linear-gradient(240.02deg, #FFDD00 -22.43%, #FFCC0C -7.7%, #FFA82E 7.39%, #FF7F5B 45.96%, #8320F7 95.7%, #250944 135.08%)",
    borderImageSlice: 1,
    borderRadius: "8px",
    overflow: "hidden",
  };
  const contentStyle = {
    borderRadius: "8px", // Match the border radius here for inner content
    padding: "4px",
    background: "white", // Background for the inner content
  };
  return (
    <div style={gradientBorderStyle}>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default GradientBorderBox;
