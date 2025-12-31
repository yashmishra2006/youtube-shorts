"use client";

import React from 'react'
import Image from 'next/image'
import { useTheme } from '../context/ThemeContext';

const HTDS = () => {
  const { theme } = useTheme();
  const steps = [
    {
      id: 1,
      text: "Copy the URL of any YouTube Shorts video.",
      image: "https://cdn.capsai.co/g1.png", // Replace with actual path
    },
    {
      id: 2,
      text: "Paste it in the input field above.",
      image: "https://cdn.capsai.co/g2.png",
    },
    {
      id: 3,
      text: "Click Get Video and get the MP4 file instantly.",
      image: "https://cdn.capsai.co/g3.png",
    },
  ];


  return (

    <div className="py-5 bg-[#F5F5F5] dark:bg-black">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-4xl" style={{ fontFamily: 'var(--font-anton)' }}>
            How to Download <span className="text-red-500" style={{ fontFamily: 'var(--font-anton)' }}>YouTube</span> Shorts
          </h2>
          <h3 className="text-4xl font-semibold text-transparent bg-clip-text" style={{ fontFamily: 'var(--font-playfair-display)', backgroundImage: 'linear-gradient(91.12deg, #D100D5 32.8%, #FF9820 54.02%, #FF371E 76.11%)', }}>
            in 3 steps
          </h3>
        </div>
        <div
          className="px-4 py-12"
        >
          <div className="flex flex-col items-stretch justify-between gap-8 lg:flex-row">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex-1 p-10 rounded-3xl bg-opacity-60" style={{
                  background: theme === 'dark' ? '#262729' : 'linear-gradient(123.98deg, #FFF5FF 4.25%, #E8F4FF 49.4%, #FFE7E9 100.03%)',
                }}
              >
                <h2 className="mb-4 text-4xl font-normal text-black dark:text-white">{step.id}</h2>
                <h3 className="mb-6 text-xl font-normal text-black dark:text-white">{step.text}</h3>
                <Image
                  src={step.image}
                  alt={`Step ${step.id}: ${step.text}`}
                  width={400}
                  height={300}
                  className="w-full rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default HTDS 