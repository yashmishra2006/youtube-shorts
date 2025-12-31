import React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../imageUrlBuilder";
import BlogCard from "./blogCard";

const RelatedPosts = ({ blogs, blogId }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    checkScrollButtons();
    scrollContainerRef.current.addEventListener("scroll", checkScrollButtons);

    return () => {
      window.removeEventListener("resize", checkMobile);
      scrollContainerRef.current?.removeEventListener(
        "scroll",
        checkScrollButtons
      );
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = isMobile
      ? container.offsetWidth
      : container.offsetWidth * 0.8;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <div>
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-center justify-between">
          <div
            className="text-[24px] md:text-[32px] ml-2"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Related Posts
          </div>
          <Link href={"https://capsai.co/blog"} className="underline text-[14px] md:text-[18px] mt-7">
            View all
          </Link>
        </div>
        <div className="md:max-w-full max-w-[350px] py-1 h-full ml-2">
          <div
            className="flex min-h-full pb-4 space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex-shrink-0 w-[300px] md:w-[372px] h-[360px] md:h-full  transition-all duration-300 flex flex-col justify-between snap-center"
              >
                <div key={blog._id} className="">
                  <BlogCard blog={blog} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;
