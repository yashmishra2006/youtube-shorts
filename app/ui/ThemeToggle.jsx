"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

let useThemeSafe = null;

// Try importing ThemeContext safely
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  useThemeSafe = require("../../context/ThemeContext")?.useTheme;
} catch {
  useThemeSafe = null;
}

export default function ThemeToggle() {
  // Optional context
  const themeContext = useThemeSafe ? useThemeSafe() : null;

  const theme = themeContext?.theme ?? "light";
  const setTheme = themeContext?.setTheme ?? null;

  const [effectiveTheme, setEffectiveTheme] = useState("light");

  // Determine effective theme
  useEffect(() => {
    let currentTheme = "light";

    if (theme === "auto") {
      const now = new Date();
      const hourInIST = parseInt(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
        }),
        10
      );
      currentTheme = hourInIST >= 22 || hourInIST < 6 ? "dark" : "light";
    } else {
      currentTheme = theme;
    }

    setEffectiveTheme(currentTheme);

    // Apply to <html>
    document.documentElement.classList.toggle(
      "dark",
      currentTheme === "dark"
    );
  }, [theme]);

  // Toggle handler (context-aware OR static fallback)
  const handleToggle = () => {
    const newTheme = effectiveTheme === "dark" ? "light" : "dark";

    if (setTheme) {
      // Full app mode
      setTheme(newTheme);
    } else {
      // Static mode
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      setEffectiveTheme(newTheme);
    }
  };

  const isDarkMode = effectiveTheme === "dark";

  return (
    <div
      onClick={handleToggle}
      className="flex relative items-center p-1 w-16 h-8 bg-gray-200 rounded-full transition-colors duration-300 cursor-pointer dark:bg-[#1C1D1F]"
    >
      {/* Slider */}
      <div
        className={`absolute w-6 h-6 bg-white dark:bg-[#313131] border dark:border-[#313131] rounded-full transition-transform duration-300 ${
          isDarkMode ? "translate-x-[30px]" : "translate-x-[2px]"
        }`}
      />

      {/* Icons */}
      <div className="flex relative z-10 justify-between items-center px-1 w-full h-full">
        <FiSun
          className={`w-5 h-5 transition-colors duration-300 ${
            !isDarkMode ? "text-yellow-400" : "text-gray-400 dark:text-gray-500"
          }`}
        />
        <FiMoon
          className={`w-5 h-5 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-400 dark:text-gray-500"
          }`}
        />
      </div>
    </div>
  );
}
