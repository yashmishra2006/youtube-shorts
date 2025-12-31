"use client"

import { useRef, useState, useEffect } from "react"
import { Download } from "lucide-react"
import { HashLoader } from "react-spinners"
import "@fontsource/playfair-display/600-italic.css"
import dynamic from "next/dynamic"
import Image from "next/image"
import Footer from "./Footer"
import FAQ from "./FAQ"
import HTDS from "./HTDS"
import Header from "./Header"
import POP from "./POP"


export default function YtShorts() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [showPromo, setShowPromo] = useState(false)
  const promoRef = useRef(null)
  const [videoData, setVideoData] = useState(null)
  const [videoInfo, setVideoInfo] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [fetchPercentage, setFetchPercentage] = useState(0)
  const [selectedQuality, setSelectedQuality] = useState("1080")
  const [showQualityDropdown, setShowQualityDropdown] = useState(false)
  const [showMobileQualityDropdown, setShowMobileQualityDropdown] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const desktopDropdownRef = useRef(null)
  const mobileDropdownRef = useRef(null)

  useEffect(() => {
    return () => {
      if (videoData?.localUrl) URL.revokeObjectURL(videoData.localUrl)
    }
  }, [videoData])

  useEffect(() => {
    let intervalId
    if (isFetching) {
      intervalId = setInterval(() => {
        setFetchPercentage((prev) => {
          if (prev >= 90) {
            clearInterval(intervalId)
            return 90
          }
          return prev + 1
        })
      }, 150)
    } else {
      setFetchPercentage(0)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isFetching])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setShowQualityDropdown(false)
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setShowMobileQualityDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const validateYouTubeShorts = (value) => {
    const shortsPattern = /youtube\.com\/shorts\/[a-zA-Z0-9_-]+/
    return shortsPattern.test(value)
  }

  // Updated function to work with new backend endpoints
  const handleDownload = async () => {
    setError("")
    setVideoData(null)
    setVideoInfo(null)
    setIsFetching(true)
    setSessionId(null)

    if (!url.trim() || !validateYouTubeShorts(url)) {
      setError("Please enter a valid YouTube Shorts URL.")
      setIsFetching(false)
      return
    }

    try {
      // Step 1: Get video info and session ID
      const infoResponse = await fetch("https://capsaiop.shop/api/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!infoResponse.ok) {
        const errorData = await infoResponse.json().catch(() => ({}))
        throw new Error(errorData?.detail || `Server error: ${infoResponse.status}`)
      }

      const infoData = await infoResponse.json()
      if (!infoData?.session_id) {
        throw new Error("Failed to get video information.")
      }

      // Store video info separately
      setVideoInfo({
        title: infoData.title,
        duration: infoData.duration,
        thumbnail: infoData.thumbnail,
      })

      setSessionId(infoData.session_id)
      setFetchPercentage(50)
      setIsFetching(false)

    } catch (err) {
      console.error("Download error:", err)
      setError(err?.message || "Something went wrong. Please try again.")
      setVideoData(null)
      setVideoInfo(null)
      setSessionId(null)
      setIsFetching(false)
    }
  }

const handleActualDownload = async () => {
    if (!sessionId) {
      setError("No session found. Please try again.")
      return
    }

    setError("")
    setIsFetching(true)

    try {
      // Download the video using session ID
      const downloadResponse = await fetch(
        `https://capsaiop.shop/api/download/${sessionId}?quality=${selectedQuality}`,
        {
          method: "GET",
          headers: {
            "Accept": "video/mp4,video/*",
          }
        }
      )

      if (!downloadResponse.ok) {
        const errorText = await downloadResponse.text().catch(() => "")
        throw new Error(`Failed to download video: ${downloadResponse.status} ${errorText}`)
      }

      // Check content type
      const contentType = downloadResponse.headers.get("content-type")
      console.log("Content-Type:", contentType)
      
      // Check content length
      const contentLength = downloadResponse.headers.get("content-length")
      console.log("Content-Length:", contentLength)

      if (contentLength && parseInt(contentLength) < 1000) {
        throw new Error("Video file is too small or empty")
      }

      const videoBlob = await downloadResponse.blob()
      console.log("Blob size:", videoBlob.size, "Blob type:", videoBlob.type)

      if (videoBlob.size < 1000) {
        throw new Error("Downloaded video is empty or corrupted")
      }

      const localUrl = URL.createObjectURL(videoBlob)
      setFetchPercentage(100)

      // Directly trigger download without showing preview
      const a = document.createElement("a")
      a.href = localUrl
      a.download = `${videoInfo?.title || "video"}.mp4`
      a.style.display = "none"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      // Clean up blob URL
      URL.revokeObjectURL(localUrl)
      
      // Show promo and reset state
      setShowPromo(true)
      setTimeout(() => {
        promoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 200)
      
      // Reset to initial state
      setVideoData(null)
      setVideoInfo(null)
      setSessionId(null)
      setUrl("")
      
    } catch (err) {
      console.error("Download error:", err)
      setError(err?.message || "Something went wrong. Please try again.")
      setVideoData(null)
      setSessionId(null)
    } finally {
      setIsFetching(false)
    }
  }

  const revokeCurrentBlobUrl = () => {
    if (videoData?.localUrl) URL.revokeObjectURL(videoData.localUrl)
  }

  const handleClear = () => {
    revokeCurrentBlobUrl()
    setUrl("")
    setError("")
    setVideoData(null)
    setVideoInfo(null)
    setShowPromo(false)
    setShowQualityDropdown(false)
    setShowMobileQualityDropdown(false)
    setSessionId(null)
  }

  const handleDownloadVideo = () => {
    if (!videoData?.localUrl) {
      setError("No video to download.")
      return
    }
    const a = document.createElement("a")
    a.href = videoData.localUrl
    a.download = `${videoData.title || "video"}.mp4`
    a.style.display = "none"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setShowPromo(true)

    setTimeout(() => {
      promoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 200)
  }

  const resetToInput = () => {
    revokeCurrentBlobUrl()
    setVideoData(null)
    setError("")
    setShowPromo(false)
    setShowQualityDropdown(false)
    setSessionId(null)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-black">
      <div className="flex flex-col md:flex-row w-full max-w-[1280px] mx-auto">

        {/* Main Content */}
        <div className="w-full md:w-[60%] mx-auto">
          <Header />
          <div className="max-w-3xl px-4 pb-16 mx-auto dark:bg-black">
            <div className="p-5 w-full sm:w-[340px] md:w-full bg-white shadow-lg rounded-3xl dark:bg-[#27272A] mx-auto">
              {!videoData && !sessionId ? (
                <>
                  <div className="flex flex-col gap-4 mb-2 md:flex-row">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center w-full gap-3 p-4 border rounded-2xl bg-[#F5F5F5] dark:bg-black">
                        <Image
                          src="https://cdn.capsai.co/icons/YTshorts.png"
                          alt="YT shorts icon"
                          width={24}
                          height={24}
                          className="inline-block w-6 h-6 shrink-0"
                        />
                        <input
                          type="text"
                          placeholder="Drop YouTube Shorts link"
                          value={url}
                          onChange={(e) => {
                            const input = e.target.value
                            setUrl(input)
                            if (input.trim() === "") setError("")
                          }}
                          className="flex-1 min-w-0 text-lg border-0 textbg-transparent focus:ring-0 focus:outline-none bg-[#F5F5F5] dark:bg-black"
                        />
                        <div className="hidden lg:block relative" ref={desktopDropdownRef}>
                          <button
                            onClick={() => setShowQualityDropdown(!showQualityDropdown)}
                            aria-haspopup="listbox"
                            aria-expanded={showQualityDropdown}
                            className="flex items-center justify-between px-4 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-xl dark:bg-[#27272A] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 min-w-[120px] shadow-sm"
                          >
                            <span className="font-bold">{selectedQuality}p</span>
                            <svg
                              className={`w-4 h-4 ml-2 transition-transform ${showQualityDropdown ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {showQualityDropdown && (
                            <div className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-[#27272A] dark:border-gray-600 min-w-[120px] py-1">
                              {["360", "480", "720", "1080"].map((quality) => (
                                <button
                                  key={quality}
                                  onClick={() => {
                                    setSelectedQuality(quality)
                                    setShowQualityDropdown(false)
                                  }}
                                  className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 font-medium ${selectedQuality === quality ? "bg-gray-100 dark:bg-gray-700 font-bold text-black dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                                >
                                  {quality}p
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quality selector for mobile/tablet screens */}
                      <div className="mt-4 lg:hidden">
                        <span className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Select Quality
                        </span>
                        <div className="relative" ref={mobileDropdownRef}>
                          <button
                            onClick={() => setShowMobileQualityDropdown(!showMobileQualityDropdown)}
                            aria-haspopup="listbox"
                            aria-expanded={showMobileQualityDropdown}
                            className="flex items-center justify-between w-full px-4 py-3 text-lg font-semibold bg-white border border-gray-200 rounded-xl dark:bg-[#27272A] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <span>mp4 ({selectedQuality}p)</span>
                            <svg
                              className={`w-4 h-4 transition-transform ${showMobileQualityDropdown ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {showMobileQualityDropdown && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:bg-[#27272A] dark:border-gray-600">
                              {["360", "480", "720", "1080"].map((quality) => (
                                <button
                                  key={quality}
                                  onClick={() => {
                                    setSelectedQuality(quality)
                                    setShowMobileQualityDropdown(false)
                                  }}
                                  className={`w-full px-4 py-3 text-left text-lg hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-2xl last:rounded-b-2xl ${selectedQuality === quality ? "bg-gray-100 dark:bg-gray-700 font-semibold" : ""}`}
                                >
                                  {quality}p
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      disabled={isFetching}
                      className={`flex items-center justify-center gap-2 px-4 py-3 text-lg font-semibold rounded-2xl md:w-[170px] ${
                        isFetching
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                          : "text-white bg-black hover:bg-gray-800 dark:bg-[#FFFFFF08] dark:shadow-[inset_-2px_2px_20px_0px_#FFFFFFEB]"
                      }`}
                    >
                      {isFetching ? (
                        <span className="flex items-center">
                          <HashLoader size={20} color="#ff0000" speedMultiplier={1.5} />
                          <span className="ml-2">{fetchPercentage}%</span>
                        </span>
                      ) : (
                        <>
                          <Download />
                          Get Video
                        </>
                      )}
                    </button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 mb-2 text-red-500">
                      <div className="flex items-center justify-center w-6 h-6 border-2 border-red-500 rounded-full">
                        <span className="text-sm font-bold">!</span>
                      </div>
                      <span className="text-lg">{error}</span>
                    </div>
                  )}
                </>
              ) : sessionId && !videoData ? (
                <>
                  {/* Video Info Display */}
                  <div className="flex flex-col gap-4">
                    {/* URL summary row */}
                    <div className="flex items-center gap-3 p-4 border rounded-2xl bg-gray-50 dark:bg-black">
                      <Image
                        src="https://cdn.capsai.co/icons/YTshorts.png"
                        alt="YT shorts icon"
                        width={24}
                        height={24}
                        className="inline-block w-6 h-6 align-middle"
                      />
                      <span className="overflow-hidden text-lg text-gray-500 truncate whitespace-nowrap">{url}</span>
                    </div>

                    {/* Thumbnail and Info */}
                    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-2xl bg-white dark:bg-[#27272A]">
                      <Image
                        src={videoInfo?.thumbnail || "https://via.placeholder.com/120x120?text=No+Thumbnail"}
                        alt="Video thumbnail"
                        width={128}
                        height={128}
                        className="w-full sm:w-32 h-32 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{videoInfo?.title || "Loading..."}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Duration: {videoInfo?.duration ? `${videoInfo.duration}s` : "Unknown"}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Quality: {selectedQuality}p</p>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={handleActualDownload}
                      disabled={isFetching}
                      className={`flex items-center justify-center gap-2 px-4 py-3 text-lg font-semibold rounded-2xl w-full ${
                        isFetching
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                          : "text-white bg-black hover:bg-gray-800 dark:bg-[#FFFFFF08] dark:shadow-[inset_-2px_2px_20px_0px_#FFFFFFEB]"
                      }`}
                    >
                      {isFetching ? (
                        <span className="flex items-center">
                          <HashLoader size={20} color="#ff0000" speedMultiplier={1.5} />
                          <span className="ml-2">Downloading... {fetchPercentage}%</span>
                        </span>
                      ) : (
                        <>
                          <Download />
                          Download Video
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleClear}
                      className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-black dark:text-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* URL summary row */}
                  <div className="flex flex-col w-full gap-4 mb-6 md:flex-row">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 p-4 border rounded-2xl bg-gray-50 dark:bg-black">
                        <Image
                          src="https://cdn.capsai.co/icons/YTshorts.png"
                          alt="YT shorts icon"
                          width={24}
                          height={24}
                          className="inline-block w-6 h-6 align-middle"
                        />
                        <span className="overflow-hidden text-lg text-gray-500 truncate whitespace-nowrap">{url}</span>
                      </div>
                    </div>
                    <button
                      disabled
                      className="flex items-center justify-center gap-2 px-4 py-3 text-lg font-semibold text-gray-500 bg-gray-200 cursor-not-allowed rounded-2xl md:w-[170px] dark:bg-gray-700 dark:text-gray-400"
                    >
                      <Download />
                      Get Video
                    </button>
                  </div>

                  <hr className="my-6 border-gray-300 dark:border-gray-500" />

                  {/* Video preview + actions */}
                  <div className="relative w-full overflow-hidden">
                    <div className="flex sm:flex-row flex-col gap-6">
                      {/* Video container */}
                      <div className="w-full mx-auto max-w-[480px] border-2 bg-slate-500 aspect-[4/3] rounded-xl overflow-hidden relative">
                        <video
                          src={videoData?.localUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                        <button
                          onClick={resetToInput}
                          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white hover:bg-gray-100"
                        >
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13M1 13L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row md:flex-col gap-3 md:gap-4 justify-center md:col-span-1 col-span-full max-w-[480px] w-full mx-auto md:max-w-full">
                        <button
                          onClick={resetToInput}
                          className="flex items-center justify-center px-8 h-10 md:h-14 text-xs md:text-base font-semibold bg-gray-100 border border-gray-200 rounded-lg dark:bg-black"
                        >
                          Clear
                        </button>
                        <button
                          onClick={handleDownloadVideo}
                          className="flex items-center justify-center px-4 h-10 md:h-14 text-xs md:text-base font-semibold text-white bg-black hover:bg-gray-800 rounded-lg dark:bg-[#FFFFFF08] dark:shadow-[inset_-2px_2px_20px_0px_#FFFFFFEB]"
                        >
                          <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                          Download Now
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {showPromo && <POP />}
          </div>
        </div>

      </div>

      <HTDS />
      <FAQ />
      <Footer />
    </div>
  )
}
