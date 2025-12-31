import React, { useState } from "react";
import Union from "../../assets/Union.png";
import Image from "next/image";
export default function Adpopup() {
  const [isClosed, setisClosed] = useState(false);

  const handleClick = () => {
    setisClosed(true);
   // console.log(isClosed);
  };
  if (isClosed) {
    return null; // Render nothing if closed
  }
  return (
    <div className="flex flex-col justify-center  bg-pink-100 ">
      <div className="flex justify-center items-center px-9 py-3 max-md:px-5 gap-4 ">
        {/* <img
          src={require("../../assets/Union.png")}
          className="shrink-0 my-auto aspect-[1.09] w-[26px]"
        /> */}
        <Image width={20} height={20} src={Union} alt="Image" />
        <div className="font-medium leading-4 text-blue-800">
          Watermark alert! 🚨Upgrade now to banish it forever.
        </div>
        <div className="justify-center px-2 py-2 font-semibold text-white whitespace-nowrap bg-[#1DAE4E] rounded-[55.54px]">
          Upgrade
        </div>
        <button
          onClick={() => {
            // Implement close functionality here
            handleClick();
          }}
          className="text-gray-600 ml-4 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.293 5.293a1 1 0 0 0-1.414 0L10 8.586 6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 0 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0 0-1.414z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
