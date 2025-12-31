"use client";

import React, { useState } from "react";


const faqData = [
  {
    id: "item-1",
    question: "How can I download YouTube Shorts online without installing any app?",
    answer:
      "You can download YouTube Shorts online by copying the Shorts video link, pasting it into the CapsAI YouTube Shorts downloader, and clicking download. No app installation or software setup is required.",
  },
  {
    id: "item-2",
    question: "Is CapsAI a free YouTube Shorts downloader with no limits?",
    answer:
      "Yes, CapsAI is a completely free YouTube Shorts downloader. There are no daily limits, no subscriptions, and no hidden charges. You can download unlimited YouTube Shorts for free.",
  },
  {
    id: "item-3",
    question: "Can I download YouTube Shorts in MP4 format?",
    answer:
      "Yes, CapsAI allows you to download YouTube Shorts in MP4 format. The MP4 files are compatible with all devices including mobile phones, tablets, laptops, and smart TVs.",
  },
  {
    id: "item-4",
    question: "Does this tool support YouTube Shorts download in HD and Full HD?",
    answer:
      "CapsAI supports YouTube Shorts download in HD, Full HD (1080p), and higher resolutions when available, ensuring high-quality video downloads.",
  },
  {
    id: "item-5",
    question: "Can I download YouTube Shorts in 4K quality?",
    answer:
      "If the original YouTube Short is uploaded in 4K, CapsAI allows you to download the Shorts video in 4K resolution without quality loss.",
  },
  {
    id: "item-6",
    question: "Is it possible to download YouTube Shorts without watermark?",
    answer:
      "Yes, all YouTube Shorts downloaded using CapsAI are watermark-free. The videos are saved cleanly without any branding or logos.",
  },
  {
    id: "item-7",
    question: "How do I download YouTube Shorts by link?",
    answer:
      "To download YouTube Shorts by link, copy the Shorts URL from YouTube, paste it into the CapsAI Shorts downloader, select the quality, and download instantly.",
  },
  {
    id: "item-8",
    question: "Can I download YouTube Shorts on my mobile phone?",
    answer:
      "Yes, CapsAI works perfectly on Android and iPhone devices. You can download YouTube Shorts directly to your phone using any mobile browser.",
  },
  {
    id: "item-9",
    question: "Does CapsAI work on iPhone and iOS devices?",
    answer:
      "Yes, CapsAI is fully compatible with iOS. You can download YouTube Shorts on iPhone or iPad using Safari or any other browser.",
  },
  {
    id: "item-10",
    question: "Can I download YouTube Shorts on Android without an app?",
    answer:
      "Yes, CapsAI allows Android users to download YouTube Shorts directly from the browser without installing any APK or third-party app.",
  },
  {
    id: "item-11",
    question: "Can I save YouTube Shorts directly to my gallery?",
    answer:
      "After downloading a YouTube Short using CapsAI, the video is saved to your device storage and can be moved to your gallery easily.",
  },
  {
    id: "item-12",
    question: "Is login required to download YouTube Shorts?",
    answer:
      "No login or sign-up is required. CapsAI lets you download YouTube Shorts anonymously without creating an account.",
  },
  {
    id: "item-13",
    question: "Can I download YouTube Shorts audio as MP3?",
    answer:
      "Yes, CapsAI supports extracting audio from YouTube Shorts and downloading it as an MP3 file for music or voice content.",
  },
  {
    id: "item-14",
    question: "Is YouTube Shorts MP3 download free on CapsAI?",
    answer:
      "Yes, downloading YouTube Shorts audio in MP3 format using CapsAI is completely free with no restrictions.",
  },
  {
    id: "item-15",
    question: "How fast is the YouTube Shorts download process?",
    answer:
      "CapsAI processes YouTube Shorts downloads instantly. Most videos are ready to download within a few seconds depending on your internet speed.",
  },
  {
    id: "item-16",
    question: "Can I download YouTube Shorts for offline viewing?",
    answer:
      "Yes, once downloaded using CapsAI, YouTube Shorts can be watched offline anytime without an internet connection.",
  },
  {
    id: "item-17",
    question: "Does CapsAI support YouTube Shorts download in 1080p?",
    answer:
      "Yes, CapsAI supports downloading YouTube Shorts in 1080p Full HD if the original video quality supports it.",
  },
  {
    id: "item-18",
    question: "Is CapsAI safe to use for downloading YouTube Shorts?",
    answer:
      "CapsAI is safe and secure. It does not require software downloads, does not collect personal data, and works directly in your browser.",
  },
  {
    id: "item-19",
    question: "Are there any ads while downloading YouTube Shorts?",
    answer:
      "CapsAI offers an ad-free YouTube Shorts downloading experience without pop-ups or intrusive ads.",
  },
  {
    id: "item-20",
    question: "Can I use downloaded YouTube Shorts for Instagram Reels or TikTok?",
    answer:
      "Yes, downloaded YouTube Shorts can be reused for Instagram Reels, TikTok, or other platforms, provided you respect copyright rules.",
  },
  {
    id: "item-21",
    question: "Does CapsAI compress YouTube Shorts videos?",
    answer:
      "No, CapsAI downloads YouTube Shorts in original quality without compression or loss of resolution.",
  },
  {
    id: "item-22",
    question: "Why is my YouTube Shorts download not working?",
    answer:
      "If a download fails, ensure the Shorts link is correct, the video is public, and your internet connection is stable.",
  },
  {
    id: "item-23",
    question: "Can I download YouTube Shorts without copyright issues?",
    answer:
      "You should only download YouTube Shorts that you own or have permission to use. Always respect copyright laws.",
  },
  {
    id: "item-24",
    question: "Does CapsAI work worldwide?",
    answer:
      "Yes, CapsAI works globally and supports YouTube Shorts downloads from any country where YouTube is accessible.",
  },
  {
    id: "item-25",
    question: "Can I download multiple YouTube Shorts one by one?",
    answer:
      "Yes, you can download unlimited YouTube Shorts individually by pasting each Shorts link into CapsAI.",
  },
  {
    id: "item-26",
    question: "Is CapsAI better than YouTube Shorts downloader apps?",
    answer:
      "CapsAI is faster, safer, and more convenient than apps because it works online, requires no installation, and supports HD downloads.",
  },
  {
    id: "item-27",
    question: "Can I download YouTube Shorts in 720p?",
    answer:
      "Yes, CapsAI allows YouTube Shorts download in 720p for users who prefer smaller file sizes.",
  },
  {
    id: "item-28",
    question: "Does CapsAI support YouTube Shorts download in 2025?",
    answer:
      "Yes, CapsAI is updated regularly and fully supports YouTube Shorts downloads in 2025.",
  },
  {
    id: "item-29",
    question: "Can I download YouTube Shorts without login on mobile?",
    answer:
      "Yes, CapsAI allows YouTube Shorts downloads on mobile devices without login or registration.",
  },
  {
    id: "item-30",
    question: "Can I download YouTube Shorts directly from yt shorts links?",
    answer:
      "Yes, CapsAI supports all YouTube Shorts links including youtu.be and youtube.com/shorts URLs.",
  },
  {
    id: "item-31",
    question: "Does CapsAI support YouTube Shorts download without watermark in HD?",
    answer:
      "Yes, CapsAI downloads HD YouTube Shorts without watermark or branding.",
  },
  {
    id: "item-32",
    question: "Can I download YouTube Shorts on a tablet?",
    answer:
      "Yes, CapsAI works on tablets including iPad and Android tablets using a web browser.",
  },
  {
    id: "item-33",
    question: "Does CapsAI store my downloaded videos?",
    answer:
      "No, CapsAI does not store or track downloaded videos. All downloads happen directly in your browser.",
  },
  {
    id: "item-34",
    question: "Can I download YouTube Shorts with sound?",
    answer:
      "Yes, CapsAI downloads YouTube Shorts with full audio unless you choose MP3-only mode.",
  },
  {
    id: "item-35",
    question: "Can I convert YouTube Shorts to MP3 online?",
    answer:
      "Yes, CapsAI lets you convert YouTube Shorts to MP3 online without installing any tool.",
  },
  {
    id: "item-36",
    question: "Does CapsAI support YouTube Shorts download in Full HD?",
    answer:
      "Yes, Full HD YouTube Shorts downloads are supported when the original video quality allows.",
  },
  {
    id: "item-37",
    question: "Can I download YouTube Shorts instantly?",
    answer:
      "Yes, CapsAI processes YouTube Shorts links instantly and provides fast downloads.",
  },
  {
    id: "item-38",
    question: "Does CapsAI work on Chrome, Safari, and Firefox?",
    answer:
      "Yes, CapsAI works on all modern browsers including Chrome, Safari, Firefox, and Edge.",
  },
  {
    id: "item-39",
    question: "Can I download YouTube Shorts without installing software?",
    answer:
      "Yes, CapsAI is fully browser-based and requires no software installation.",
  },
  {
    id: "item-40",
    question: "Is CapsAI a secure YouTube Shorts downloader?",
    answer:
      "Yes, CapsAI uses a secure connection and does not require access to your YouTube account.",
  },
  {
    id: "item-41",
    question: "Can I download Shorts videos in high quality?",
    answer:
      "CapsAI allows high-quality YouTube Shorts downloads including HD and 4K when available.",
  },
  {
    id: "item-42",
    question: "Does CapsAI support Shorts download for creators?",
    answer:
      "Yes, creators can download their own YouTube Shorts using CapsAI for editing or repurposing.",
  },
  {
    id: "item-43",
    question: "Can I download YouTube Shorts without ads?",
    answer:
      "Yes, CapsAI offers an ad-free YouTube Shorts downloader experience.",
  },
  {
    id: "item-44",
    question: "Can I download YouTube Shorts for WhatsApp status?",
    answer:
      "Yes, downloaded YouTube Shorts can be used as WhatsApp status videos.",
  },
  {
    id: "item-45",
    question: "Does CapsAI reduce video resolution?",
    answer:
      "No, CapsAI preserves the original resolution of YouTube Shorts during download.",
  },
  {
    id: "item-46",
    question: "Can I download YouTube Shorts without copyright watermark?",
    answer:
      "CapsAI downloads Shorts exactly as uploaded without adding any copyright watermark.",
  },
  {
    id: "item-47",
    question: "Can I download YouTube Shorts directly to my phone storage?",
    answer:
      "Yes, YouTube Shorts downloaded via CapsAI are saved directly to your phone storage.",
  },
  {
    id: "item-48",
    question: "Does CapsAI support YouTube Shorts download in MP4 HD?",
    answer:
      "Yes, MP4 HD YouTube Shorts downloads are fully supported by CapsAI.",
  },
  {
    id: "item-49",
    question: "Can I download Shorts videos without creating an account?",
    answer:
      "Yes, CapsAI allows downloading YouTube Shorts without any registration.",
  },
  {
    id: "item-50",
    question: "Is CapsAI compatible with all devices?",
    answer:
      "Yes, CapsAI works on desktop, mobile, tablet, and all modern devices.",
  },
  {
    id: "item-51",
    question: "Can I download YouTube Shorts without losing quality?",
    answer:
      "Yes, CapsAI downloads YouTube Shorts in original quality with no loss.",
  },
  {
    id: "item-52",
    question: "Does CapsAI support Shorts download without restrictions?",
    answer:
      "Yes, CapsAI offers unrestricted YouTube Shorts downloads with no caps.",
  },
  {
    id: "item-53",
    question: "Can I download YouTube Shorts using a browser only?",
    answer:
      "Yes, CapsAI is a browser-only YouTube Shorts downloader with no extra tools required.",
  },
  {
    id: "item-54",
    question: "Is CapsAI the best YouTube Shorts downloader online?",
    answer:
      "CapsAI is one of the fastest and most reliable YouTube Shorts downloaders with HD, MP3, and watermark-free support.",
  },
  {
    id: "item-55",
    question: "Does CapsAI support Shorts download without login in 2025?",
    answer:
      "Yes, CapsAI continues to support YouTube Shorts download without login in 2025 and beyond.",
  },
];


const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full max-w-6xl px-2 py-12 mx-auto sm:px-6 lg:px-1">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl sm:text-4xl text-foreground" style={{ fontFamily: 'Anton, sans-serif' }}>
          📌 Frequently Asked{" "}
          <span className="text-red-600 text-faq-accent" style={{ fontFamily: 'Anton, sans-serif' }}>Questions</span>
        </h2>
      </div>

        <div className="p-6 sm:p-8 dark:bg-black">
            <div className="w-full space-y-4">
                {faqData.map((faq, index) => (
                <div
                    key={faq.id}
                    className="px-4 py-2 transition-colors border-b rounded-lg border-faq-border sm:px-6 hover:bg-faq-background bg-[#F5F5F5] dark:bg-black"
                >
                    <button
                    className="flex items-center justify-between w-full font-medium text-left transition-colors sm:text-base text-foreground hover:text-faq-accent"
                    onClick={() => toggleItem(faq.id)}
                    >
                    <span className="mb-2 font-normal text-md" style={{ fontFamily: 'gilroy, sans-serif' }}>{`${index + 1}. ${faq.question}`}</span>
                    <svg
                        className={`w-5 h-5 transition-transform text-gray-400 ml-2 ${
                        openItem === faq.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                    </button>
                    {openItem === faq.id && (
                    <h2 className="pt-2 pb-4 my-2 text-sm leading-relaxed sm:text-base text-muted-foreground" style={{ fontFamily: 'gilroy, sans-serif' }}>
                        {faq.answer}
                    </h2>
                    )}
                </div>
                ))}
            </div>
        </div>

    </section>
  );
};

export default FAQ;
