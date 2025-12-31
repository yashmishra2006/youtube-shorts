import React from "react";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import logoDark from "../../assets/logo-dark.svg";
const BottomSheet = ({ isVisible, onClose ,theme}) => {
  if (!isVisible) return null;

  return (
    <>
      <div class=" md:hidden bg-white dark:bg-black bottom-5 left-0 right-0 h-17 justify-around items-center">
        <div class="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-40"></div>
        <div className="w-80 p-5 border-2 border-gray-300 dark:border-[#29292B] rounded-2xl text-center shadow-lg bg-white dark:bg-[#1D1C20] z-50">
          <div className="mb-3 flex justify-center">
            <Image
              src={theme === "dark" ? logoDark : logo}
              className="w-full h-[30px]"
             
            />
          </div>
          <h2 className="text-[24px] font-bold text-black-400 font-anton dark:text-white">
            Please use your browser
          </h2>
          <p className="text-[18px] text-black-500 dark:text-[#D0D0DA] ">
           To continue, use your device's default browser.
          </p>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
