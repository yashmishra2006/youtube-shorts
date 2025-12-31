import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = ["Smart Clips", "Subtitles", "Emoji Sync"];

const MessageCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % variants.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className="  overflow-hidden w-full"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
          >
            {" " + variants[index]}!
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageCarousel;
