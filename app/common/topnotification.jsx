// src/components/common/topnotification.jsx
"use client";
import React from "react";
import topbanner from "../../assets/banner.png";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "../../assets/arrow.json";

const TopRightNotification = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end md:hidden">
      <div className="absolute w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative">
        <Image src={topbanner} className="w-[340px] h-full" alt="Top Banner" />
        <div className="absolute top-0 right-0 transform rotate-180 w-14 h-14">
          <Lottie options={defaultOptions} height={50} width={50} />
        </div>
      </div>
    </div>
  );
};

export default TopRightNotification;
