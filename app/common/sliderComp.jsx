import * as React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const PrettoSlider = styled(Slider)(({ theme, SliderIndex }) => ({
  color: "#000000",
  height: 20,
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: SliderIndex ? "#E8E8E8" : "#000000",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: SliderIndex ? "#FFFFFF" : "#000000",
    border: SliderIndex ? "4px solid black" : "4px solid white",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
  "& .MuiSlider-mark": {
    display: "none", // Hide the marks
  },
  "& .MuiSlider-markLabel": {
    display: "none", // Hide the labels of the marks
  },
  "& .MuiSlider-rail": {
    backgroundColor: (theme === "dark") ? "#4A494D" : "#d3d3d3", // Change the background color of the unselected track
  },
}));

const CustomizedSlider = ({ marks, onChange, SliderIndex }) => {
  return (
    <PrettoSlider
      SliderIndex={SliderIndex}
      valueLabelDisplay="off"
      aria-label="pretto slider"
      defaultValue={2}
      min={0}
      max={9}
      onChange={(event, newValue) => {
        // Ensure the value is adjusted to be zero-based if necessary
        if (newValue >= 1) {
          onChange(newValue - 1); // Adjust value to be zero-based index
        }
      }}
    />
  );
};
export default CustomizedSlider;
