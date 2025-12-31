"use client";

import React from "react"
import "@fontsource/playfair-display/600-italic.css"
import Footer from "./Footer"
import FAQ from "./FAQ"
import HTDS from "./HTDS"
import Header from "./Header"
import DownloadWidget from "./DownloadWidget"

export default function YtShorts() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-black">
      <div className="flex flex-col md:flex-row w-full max-w-[1280px] mx-auto">
        {/* Main Content */}
        <div className="w-full md:w-[60%] mx-auto">
          <Header />
          <div className="max-w-3xl px-4 pb-16 mx-auto dark:bg-black">
            <DownloadWidget />
          </div>
        </div>
      </div>

      <HTDS />
      <FAQ />
      <Footer />
    </div>
  )
}
