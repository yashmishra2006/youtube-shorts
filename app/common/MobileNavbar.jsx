import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import Button from "./Button";
import { useRouter } from 'next/navigation';
import { RxCross1 } from "./Icons";
import logoDark from "../../assets/logo-dark.svg";
import logo from "../../assets/logo.svg";
import { useTheme } from "../../context/ThemeContext";
import iIcon from "../../assets/icon/iIcon.png";
import timeIcon from "../../assets/Vector.png";
import arrow from "../../assets/icon/logoutArrow.png";
import ThemeToggle from "../ui/ThemeToggle";
const MobileNavbar = ({
  open,
  setOpen,
  loggedIn,
  userData,
  handleLogout,
  router,
}) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    {
      icon: "https://cdn.capsai.co/folderIcon.png",
      label: "My Videos",
      href: "/workspace/projects",
    },
    {
      icon: "https://cdn.capsai.co/fuelMinIcon.png",
      label: "Fuel Mins",
      href: "/pricing",
    },
    {
      icon: "https://cdn.capsai.co/helpIcon.png",
      label: "Help",
      href: "/feedback",
    },
  ];

  const handleNavigate = (path) => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      const target = path && path.startsWith("http") ? path : `https://capsai.co${path}`;
      window.location.href = target;
    }
  };

  
  return (
    <div
      className={`md:hidden fixed top-0 left-0 
                ${open ? " visible" : " -translate-x-[50rem] invisible"} 
                flex flex-col gap-7 h-[100vh] border-r-2 border w-[80%] z-50 bg-white dark:bg-[#29292B] dark:border-[#29292B]  duration-300 p-5 pl-7 sm:pl-15`}
    >
      <div className="flex items-center justify-between text-black">
        <Link href="https://capsai.co/" className="">
          <Image
            width={150}
            height={60}
            src={theme === "dark" ? logoDark : logo}
            alt="Image"
          />
        </Link>
        <button onClick={() => setOpen(false)} className="rounded bg-tertiary">
          <RxCross1
            className="font-bold text-xl h-[35px] w-[35px] p-[8px] dark:text-white bg-[#E6E6E6] dark:bg-[#FFFFFF0F] border-[#E6E6E6] dark:border-1 dark:border-[#29292B] rounded-lg"
            style={{
              boxShadow:
                theme === "dark" ? "-13px 8px 18px 0px #FFFFFF29 inset" : "",
            }}
          />
        </button>
      </div>

      <div className={`flex flex-col ${!loggedIn ? 'mt-[50px] gap-7' : ''}`}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href && item.href.startsWith("http") ? item.href : `https://capsai.co${item.href}`}
                className="flex items-center p-4 hover:text-black hover:font-bold rounded-[8px] gap-4 text-gray-700 hover:bg-[#F5F5F5] dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt="Item Icon"
                    width={24}
                    height={24}
                  />
                )}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}

          {/* Free Tools Dropdown */}
          <li className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center w-full text-left p-4 rounded-[8px] gap-4 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <Image
                src={theme === 'dark' ? "https://cdn.capsai.co/toold.png" : "https://cdn.capsai.co/tool.jpeg"}
                alt="Free Tools"
                width={24}
                height={24}
              />
              <span>Free Tools</span>
            </button>

            {isOpen && (
              <div className="absolute left-0 top-10 z-10 mt-2 w-64 bg-white dark:bg-[#1f1f1f] rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => handleNavigate('/youtube-short-downloader')}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-blue-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    YouTube Shorts Downloader
                  </button>
                  <button
                    onClick={() => handleNavigate('/youtube-thumbnail-downloader')}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-blue-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    YouTube Thumbnail Downloader
                  </button>
                  <button
                    onClick={() => handleNavigate('/instagram-reels-downloader')}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-blue-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Instagam Reels Downloader
                  </button>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>


      {loggedIn ? (
        <div
          className="w-[252px] h-[191px] mt-[50px] p-5 rounded-lg flex flex-col gap-0"
          style={{
            background:
              theme === "dark"
              ? "black" // 🌑 dark mode bg
              : "linear-gradient(128.03deg, #FFF5FF 1.68%, #E8F4FF 40.87%, #FFE7E9 98.48%)",
          }}
        >
          <div className="flex flex-col items-start justify-center h-full gap-4">
            {userData && (
              <div
                className={`font-bold font-anton px-2 py-1 text-[14px] rounded-full ${
                  userData.usertype === "free"
                    ? "text-[#3FB81B] bg-[#E8FFE7] dark:bg-gray-700"
                    : "bg-[#FFFFFF] text-[#A043E4] dark:bg-gray-900"
                }`}
              >
                {userData.usertype === "free" ? "Free" : "Premium"}
              </div>
            )}

            <div className="w-full">
              <div>
                <span className="font-semibold mr-2 text-stone-800 dark:text-[#EDEDED]">
                  {userData?.videomins ?? 5}
                </span>
                <span className="text-stone-600 dark:text-[#EDEDED]">
                  mins remaining
                </span>
              </div>

              <div className="w-full bg-[#a5a8a5] rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    userData?.usertype === "free"
                      ? userData?.videomins <= 2
                        ? "bg-red-500"
                        : "bg-[#2E7D32]"
                      : getBackgroundColor(userData?.videomins)
                  }`}
                  style={{
                    width: `${
                      userData?.usertype === "free"
                        ? getBackgroundColor(userData?.videomins)
                        : getDynamicWidth(userData?.videomins)
                    }%`,
                  }}
                />
              </div>
            </div>

            {userData?.usertype === "free" ? (
              <div className="bg-[#FFFFFF] p-3 flex gap-2 item-center justify-center w-full rounded-lg dark:bg-black">
                <Image
                  src={iIcon}
                  className="w-[20px] h-[20px] mt-2"
                  alt="Info Icon"
                />
                <span className="text-[#007BFF] flex gap-1 font-semibold text-[14px]">
                  Never run out of mins switch to Premium
                </span>
              </div>
            ) : (
              <div className="bg-[#FFFFFF] dark:bg-gray-900 p-3 item-center justify-center flex gap-2 text-[14px] text-center font-bold   w-full rounded-lg">
                <Image
                  src={timeIcon}
                  className="w-[20px] h-[20px] mt-1"
                  alt="Time Icon"
                />
                <span className="underline text-[#007BFF]">
                  Increase Minutes
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="">
            <Button
            name={"Get Started"}
            buttonColor={
              theme === "dark"
                ? "bg-[#FFFFFF08] shadow-[inset_-2px_2px_20px_0px_#FFFFFFEB]"
                : "bg-black"
            }
            onClick={() => { if (typeof window !== "undefined") window.location.href = "https://capsai.co/login" }}
          />
        </div>
      )}
      {loggedIn && (
        <Link
          href="https://capsai.co/"
          className="flex items-center justify-center gap-3 px-0 py-2 border rounded-full border-stone-300 text-stone-700 dark:text-stone-400 w-[75%]"
          onClick={handleLogout}
        >
          <h2 className="font-bold">Logout</h2>
          <Image src={arrow} alt="logout" />
        </Link>
      )}
      <ThemeToggle/>
    </div>
  );
};

export default MobileNavbar;
function getBackgroundColor(videomins) {
  const width = getDynamicWidth(videomins);
  if (width < 30) return "bg-red-500";
  return "bg-[#00BE13]";
}
function getDynamicWidth(videomins) {
  const maxMins = 10; // Set the max minutes
  if (videomins === undefined || videomins <= 0) return 0;

  // Cap the videomins at the maxMins
  const cappedMins = Math.min(videomins, maxMins);

  // Calculate the width percentage based on the capped videomins
  return (cappedMins / maxMins) * 100;
}
