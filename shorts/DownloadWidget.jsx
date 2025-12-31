"use client";

import { useRef, useState, useEffect } from "react";
import { Download } from "lucide-react";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import POP from "./POP";

export default function DownloadWidget() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [showPromo, setShowPromo] = useState(false);

  const [videoInfo, setVideoInfo] = useState(null); // title + thumbnail
  const [sessionId, setSessionId] = useState(null);

  const [isFetching, setIsFetching] = useState(false);
  const [fetchPercentage, setFetchPercentage] = useState(0);

  const [selectedQuality, setSelectedQuality] = useState("1080");
  const [showQualityDropdown, setShowQualityDropdown] = useState(false);
  const [showMobileQualityDropdown, setShowMobileQualityDropdown] = useState(false);

  const promoRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  /* -------------------- Progress animation -------------------- */
  useEffect(() => {
    let id;
    if (isFetching) {
      id = setInterval(() => {
        setFetchPercentage((p) => (p >= 90 ? 90 : p + 1));
      }, 150);
    } else {
      setFetchPercentage(0);
    }
    return () => clearInterval(id);
  }, [isFetching]);

  /* -------------------- Click outside dropdown -------------------- */
  useEffect(() => {
    const handler = (e) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target)) {
        setShowQualityDropdown(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)) {
        setShowMobileQualityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* -------------------- Utils -------------------- */
  const validateYouTubeShorts = (v) =>
    /youtube\.com\/shorts\/[a-zA-Z0-9_-]+/.test(v);

  /* ===============================================================
     STEP 1: FETCH INFO ONLY
     =============================================================== */
  const handleGetInfo = async () => {
    if (isFetching || sessionId) return;

    setError("");
    setIsFetching(true);

    if (!url.trim() || !validateYouTubeShorts(url)) {
      setError("Please enter a valid YouTube Shorts URL.");
      setIsFetching(false);
      return;
    }

    try {
      const res = await fetch("https://capsaiop.shop/api/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (res.status === 429) {
        throw new Error("Too many requests. Please wait a few seconds.");
      }

      if (!res.ok) {
        throw new Error(`Info failed (${res.status})`);
      }

      const data = await res.json();

      if (!data?.session_id) {
        throw new Error("No session ID returned.");
      }

      setSessionId(data.session_id);
      setVideoInfo({
        title: data.title || "video",
        thumbnail: data.thumbnail,
      });

    } catch (err) {
      setError(err.message || "Failed to fetch video info.");
      setSessionId(null);
      setVideoInfo(null);
    } finally {
      setIsFetching(false);
    }
  };

  /* ===============================================================
     STEP 2: DOWNLOAD ONLY (USER CLICK)
     =============================================================== */
  const handleDownloadVideo = async () => {
    if (!sessionId || isFetching) return;

    setError("");
    setIsFetching(true);

    try {
      const res = await fetch("https://capsaiop.shop/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          quality: selectedQuality,
        }),
      });

      if (res.status === 429) {
        throw new Error("Download rate-limited. Try again shortly.");
      }

      if (!res.ok) {
        throw new Error(`Download failed (${res.status})`);
      }

      const blob = await res.blob();

      if (blob.size < 1000) {
        throw new Error("Downloaded file is empty.");
      }

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${videoInfo?.title || "video"}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setShowPromo(true);
      setTimeout(() => promoRef.current?.scrollIntoView({ behavior: "smooth" }), 200);

      // Reset state after successful download
      setUrl("");
      setSessionId(null);
      setVideoInfo(null);

    } catch (err) {
      setError(err.message || "Download failed.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleClear = () => {
    setUrl("");
    setError("");
    setSessionId(null);
    setVideoInfo(null);
    setShowPromo(false);
  };

  /* ============================= UI ============================= */
  return (
    <>
      <div className="p-5 bg-white rounded-3xl shadow-lg dark:bg-[#27272A]">

        {/* ================= INPUT STATE ================= */}
        {!sessionId && (
          <>
            <div className="flex gap-3">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Drop YouTube Shorts link"
                className="flex-1 p-3 rounded-xl bg-gray-100 dark:bg-black"
              />

              <button
                type="button"
                onClick={handleGetInfo}
                disabled={isFetching}
                className="px-6 py-3 rounded-xl bg-black text-white"
              >
                {isFetching ? (
                  <span className="flex items-center gap-2">
                    <HashLoader size={16} color="#ff0000" />
                    {fetchPercentage}%
                  </span>
                ) : (
                  "Get Video"
                )}
              </button>
            </div>

            {error && <p className="mt-2 text-red-500">{error}</p>}
          </>
        )}

        {/* ================= INFO + DOWNLOAD ================= */}
        {sessionId && videoInfo && (
          <>
            <div className="mt-6 flex gap-4">
              <Image
                src={videoInfo.thumbnail}
                alt="Thumbnail"
                width={120}
                height={120}
                className="rounded-xl"
              />
              <div>
                <h3 className="font-semibold">{videoInfo.title}</h3>
                <p className="text-sm text-gray-500">Quality: {selectedQuality}p</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadVideo}
              disabled={isFetching}
              className="mt-4 w-full px-4 py-3 rounded-xl bg-black text-white"
            >
              {isFetching ? "Downloading..." : "Download Video"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="mt-2 w-full text-sm text-gray-500"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {showPromo && (
        <div ref={promoRef}>
          <POP />
        </div>
      )}
    </>
  );
}
