"use client";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";
import Lottie from "lottie-react";
import animationData from "../../assets/exportanimation.json";
const button = ({ buttonname }) => {
  const { theme } = useTheme();
  return (
    <>
      <Link className="" href="/">
        <div
          className="flex h-[51px] justify-center items-center py-4 px-8 rounded-full"
          style={
            theme === "dark"
              ? {
                  background: "#FFFFFF08",
                  boxShadow: "-2px 2px 20px 0px #FFFFFFEB inset",
                  border: "1px solid #373739",
                }
              : {
                  background: "#1F1F1F",
                  boxShadow: "inset 4px 6px 8px rgba(255, 255, 255, 0.16)",
                }
          }
        >
          <div>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={24}
              width={24}
            />
          </div>
          <h1 className="ml-2 text-lg text-white">{buttonname}</h1>
        </div>
      </Link>
    </>
  );
};

export default button;
