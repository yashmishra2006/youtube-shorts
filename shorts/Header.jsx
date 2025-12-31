"use client";

import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div className="px-4 py-10 text-center" style={{ minHeight: '280px' }}>
      <h1 className="mb-4 text-4xl md:text-6xl" style={{ fontFamily: 'var(--font-anton)' }}>
        <span className="inline-flex items-center gap-2 text-red-500" style={{ fontFamily: 'var(--font-anton)' }}>
          YouTube
          <Image
            src="https://cdn.capsai.co/icons/YTshorts.png"
            alt="YouTube Shorts downloader icon"
            width={56}
            height={56}
            priority
            fetchPriority="high"
            className="inline-block align-middle h-14 w-14"
            sizes="56px"
          />
        </span>
        <span className="text-black dark:text-white" style={{ fontFamily: 'var(--font-anton)' }}> Shorts</span>
      </h1>
      <h2 className="mb-6 text-4xl text-black dark:text-white md:text-6xl" style={{ fontFamily: 'var(--font-anton)' }}>
        Downloader
      </h2>
      <h3 className="max-w-xl mx-auto text-gray-500 text-md dark:text-white">
        Download any YouTube Shorts video in HD format - no <span className='hidden sm:block'></span> watermark, no signup. Fast, <span className='sm:hidden'><br /></span> free & mobile-optimized.
      </h3>

    </div>
  )
}

export default Header