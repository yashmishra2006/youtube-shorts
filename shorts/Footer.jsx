"use client";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import logoDark from "../assets/logo-dark.svg";
import Link from "next/link";

export default function Footer() {
  // const [theme, setTheme] = useState('light');

  return (
    <>
      {/* mobile footer */}
      <div className="md:hidden flex flex-col justify-center items-center gap-8 bg-[#1D1C20] text-white py-20">
        <div className="flex justify-center">
          <Image width={140} height={140} src={logoDark} alt="Image" />
        </div>

        <h1
          className="px-10 text-2xl text-center md:text-3xl md:px-0 font-playfair italic"
        >
          Save around hundreds of hours with CapsAI
        </h1>

        <div className="flex items-center justify-center gap-5">
          <IconButton
            onClick={() =>
              window.open("https://www.instagram.com/caps_ai_/", "_blank")
            }
          >
            <FaFacebook />
          </IconButton>
          <IconButton
            onClick={() =>
              window.open("https://www.instagram.com/caps_ai_/", "_blank")
            }
          >
            <RiInstagramFill />
          </IconButton>
          <IconButton
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/capsai-co/",
                "_blank"
              )
            }
          >
            <FaLinkedin />
          </IconButton>
        </div>

        <div className="items-center justify-center md:hidden">
          <h3 className="text-center md:hidden ">Powered by</h3>
          <Image
            src="https://cdn.capsai.co/images/Poweredbyimages.png"
            width={2339}
            height={299}
            className="w-[300px] h-auto m-auto mt-2"
            alt="Powered by capsai"
          />
        </div>
        <div className="flex flex-col mb-6 item-center justify-center text-center gap-[24px]">
          <Link href={"https://capsai.co/auto-subtitle-generator"}>
            Subtitles in any language
          </Link>
          <Link href={"https://capsai.co/instagram-video-downloader"}>Instagram Video Downloader</Link>
          <Link href={"https://capsai.co/blog"}>Blogs</Link>
        </div>
        <div className="flex items-center justify-center gap-5 mb-2 text-sm font-light">
          <Link href={"/terms-and-conditions"} className="duration-300 ">
            Terms & Conditions
          </Link>
          <Link href={"/privacy-policy"} className="duration-300 ">
            Privacy Policy
          </Link>
          <a href="mailto:support@capsai.co" className="duration-300">
            Contact Us
          </a>
        </div>

        <div className="flex justify-center items-center gap-5 mb-5 text-[12px] text-[#B3B3B3] font-light">
          Made with love in 🇮🇳 - ©Copyright 2024 Capsai.co
        </div>
      </div>

      {/* desktop footer */}
      <div>
        <div className="md:flex hidden flex-col bg-[#1D1C20] text-white px-[30px] ">
          <div className="flex flex-row justify-between py-10 ">
            <div className="flex flex-col justify-between">
              {" "}
              <Image width={140} height={140} src={logoDark} alt="Image" />
              <h1 className="mt-5 text-xl ">
                Save around hundreds of hours with CapsAI
              </h1>
              <div className="mt-5 ">
                <h3 className="mb-2">Powered by</h3>
                <Image
                  src="https://cdn.capsai.co/images/Poweredbyimages.png"
                  width={2339}
                  height={299}
                  className="w-1/2 h-auto"
                  alt="Powered by capsai"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-end gap-6">
                <IconButton
                  onClick={() =>
                    window.open("https://www.instagram.com/caps_ai_/", "_blank")
                  }
                >
                  <FaFacebook />
                </IconButton>
                <IconButton
                  onClick={() =>
                    window.open("https://www.instagram.com/caps_ai_/", "_blank")
                  }
                >
                  <RiInstagramFill />
                </IconButton>
                <IconButton
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/capsai-co/",
                      "_blank"
                    )
                  }
                >
                  <FaLinkedin />
                </IconButton>
              </div>
              <div className="flex flex-row w-full gap-10">
                <div className="text-[14px] flex flex-col items-end justify-end">
                  <Link
                    href={"https://capsai.co/blog"}
                    className="hover:text- duration-300 py-2.5 whitespace-nowrap"
                  >
                    Blogs
                  </Link>

                  <Link
                    href={"https://capsai.co/instagram-video-downloader"}
                    className="hover:text- duration-300 py-2.5 whitespace-nowrap"
                  >
                    Instagram Video Downloader
                  </Link>
                  <Link
                    href={"https://capsai.co/youtube-short-downloader"}
                    className="hover:text- duration-300 py-2.5 whitespace-nowrap"
                  >
                    Youtube short downloader
                  </Link>
                  <Link
                    href={"https://capsai.co/auto-subtitle-generator"}
                    className="hover:text- duration-300 py-2.5 whitespace-nowrap"
                  >
                    Subtitles in any language
                  </Link>
                </div>
                <div className="text-[14px] flex flex-col items-end">
                  <Link
                    href={"https://capsai.co/"}
                    className="hover:text- duration-300 py-2.5 whitespace-nowrap"
                  >
                    About Us
                  </Link>
                  <Link
                    href={"https://capsai.co/"}
                    className="hover:text- duration-300 py-2.5 whitespace-nowrap"
                  >
                    Contact Us
                  </Link>

                  <Link
                    href={"https://capsai.co/privacy-policy"}
                    className="hover:text- duration-300 py-2.5 whitespace-nowrap"
                  >
                    Privacy policy
                  </Link>
                  <Link
                    href={"https://capsai.co/terms-and-conditions"}
                    className="hover:text- duration-300 py-2.5 whitespace-nowrap"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="mb-10">
            {" "}
            <hr class="border-t border-[#545454]  " />
            <div className="flex justify-center items-center gap-5 m-5 text-[12px] text-[#B3B3B3] font-light">
              Made with love in 🇮🇳 - ©Copyright 2025 Capsai.co
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function IconButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white bg-[#000000] px-4 py-4 hover:bg-gray-800 duration-300 rounded-full text-3xl"
    >
      {children}
    </button>
  );
}

//theme toggle buttons

{
  /* <div className="flex items-center justify-center p-2 space-x-2 rounded-full">
        <span className="font-medium text-white cursor-pointer">Preferences</span>
        <div className="flex items-center p-1 space-x-2 bg-black rounded-full">
          <button
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <Image src={theme == "light" ? MoonF : Moon} className="h-7 w-7" />
          </button>
          <button
            className={`p-2 rounded-full ${theme === 'light' ? 'bg-gray-600' : ''}`}
            onClick={() => setTheme('light')}
          >
            <Image src={theme == "light" ? SunF : Sun} className="h-7 w-7" />
          </button>
          <button
            className={`p-2 rounded-full ${theme === 'system' ? 'bg-gray-600' : ''}`}
            onClick={() => setTheme('system')}
          >
            <Image src={theme == "light" ? DeskF : Desk} className="h-7 w-7" />
          </button>
        </div>
      </div> */
}

//theme toggle buttons

{
  /* <div className="flex items-center justify-center p-2 space-x-2 rounded-full">
        <span className="font-medium text-white cursor-pointer">Preferences</span>
        <div className="flex items-center p-1 space-x-2 bg-black rounded-full">
          <button
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <Image src={theme == "light" ? MoonF : Moon} className="h-7 w-7" />
          </button>
          <button
            className={`p-2 rounded-full ${theme === 'light' ? 'bg-gray-600' : ''}`}
            onClick={() => setTheme('light')}
          >
            <Image src={theme == "light" ? SunF : Sun} className="h-7 w-7" />
          </button>
          <button
            className={`p-2 rounded-full ${theme === 'system' ? 'bg-gray-600' : ''}`}
            onClick={() => setTheme('system')}
          >
            <Image src={theme == "light" ? DeskF : Desk} className="h-7 w-7" />
          </button>
        </div>
      </div> */
}
