"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import logo from "../../assets/logo.svg";
import logoDark from "../../assets/logo-dark.svg";
import ThemeToggle from "../ui/ThemeToggle";
import MobileNavbar from "./MobileNavbar";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routeText, setRouteText] = useState("");

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    switch (pathname) {
      case "/pricing":
        setRouteText("Pricing");
        break;
      case "/blog":
        setRouteText("Blogs");
        break;
      default:
        setRouteText("");
    }
  }, [pathname]);

  const handleSelect = (path) => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      const target = path && path.startsWith("http") ? path : `https://capsai.co${path}`;
      window.location.href = target;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-black" style={{ fontFamily: 'var(--font-gilroy)' }}>
      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between px-7 pt-8 pb-3">
        <Link href="https://capsai.co/">
          <Image
            width={140}
            height={140}
            src={theme === "dark" ? logoDark : logo}
            alt="CapsAI"
          />
        </Link>

        <div className="flex items-center gap-10">
          <Link href="https://capsai.co/pricing" className="dark:text-[#B3B3B3]">
            Pricing
          </Link>

          <Link href="https://capsai.co/blog" className="dark:text-[#B3B3B3]">
            Blogs
          </Link>

          {/* Free Tools dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="dark:text-[#B3B3B3]"
            >
              Free Tools ▾
            </button>

            {isOpen && (
              <div className="absolute left-0 mt-2 w-60 bg-white dark:bg-[#1f1f1f] rounded-md shadow-lg z-50">
                <button
                  onClick={() => handleSelect("/youtube-short-downloader")}
                  className="block w-full text-left px-4 py-2 font-semibold text-blue-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  YouTube Shorts Downloader
                </button>
                <button
                  onClick={() => handleSelect("/youtube-thumbnail-downloader")}
                  className="block w-full text-left px-4 py-2 font-semibold text-blue-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  YouTube Thumbnail Downloader
                </button>
                <button
                  onClick={() => handleSelect("/instagram-reels-downloader")}
                  className="block w-full text-left px-4 py-2 font-semibold text-blue-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Instagram Reels Downloader
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (typeof window !== "undefined") window.location.href = "https://capsai.co/login";
            }}
            className="px-6 py-3 rounded-full bg-black text-white dark:bg-[#FFFFFF08] dark:shadow-[inset_-2px_2px_20px_0px_#FFFFFFEB]"
          >
            Get Started
          </button>

          <ThemeToggle />
        </div>
      </div>

      {/* MOBILE */}
      <div className="fixed top-0 left-0 z-50 md:hidden w-full flex items-center justify-between px-5 py-3 bg-white dark:bg-[#121214] border-b">
        <Link href="https://capsai.co/">
          <Image
            width={100}
            src={theme === "dark" ? logoDark : logo}
            alt="CapsAI"
          />
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-2xl border rounded-full"
        >
          <IoMenu />
        </button>
      </div>

      <MobileNavbar
        open={mobileOpen}
        setOpen={setMobileOpen}
        theme={theme}
        router={router}
        loggedIn={false} // ALWAYS FREE USER
      />
    </div>
  );
}
