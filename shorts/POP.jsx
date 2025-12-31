"use client";

import React from 'react'
import Link from 'next/link';

const POP = () => {
  return (
    <div className="mt-8 dark:bg-black">
      <div className="overflow-hidden text-white shadow-lg rounded-3xl">
        <Link href="/">
          {/* Large screen image */}
          <img
            src="https://cdn.capsai.co/pop3.webp"
            alt="Text to subtitle"
            className="hidden w-full cursor-pointer sm:block"
          />
          {/* Small screen image */}
          <img
            src="https://cdn.capsai.co/pop2.webp"
            alt="Text to subtitle"
            className="block w-full cursor-pointer sm:hidden"
          />
        </Link>
      </div>
    </div>
  )
}

export default POP