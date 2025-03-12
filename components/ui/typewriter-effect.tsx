"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const  TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(150);

  const currentWord = words[currentWordIndex].text;
  const wordClassName = words[currentWordIndex].className;

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && displayedText.length < currentWord.length) {
        // Typing characters
        setDisplayedText((prev) => currentWord.slice(0, prev.length + 1));
        setTypingSpeed(150); // Normal typing speed
      } else if (isDeleting && displayedText.length > 0) {
        // Deleting characters
        setDisplayedText((prev) => currentWord.slice(0, prev.length - 1));
        setTypingSpeed(50); // Faster deleting speed
      } else if (!isDeleting && displayedText.length === currentWord.length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedText.length === 0) {
        // Move to the next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, typingSpeed, currentWord]);

  return (
    <div
      className={cn(
        "flex justify-center items-center text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      <motion.span
        className={cn(
          "inline-block dark:text-white text-black",
          wordClassName
        )}
      >
        {displayedText}
      </motion.span>
      <motion.span
        animate={{
          opacity: [1, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-5 sm:h-6 lg:h-8 bg-blue-500 ml-1",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
