import React from "react";

import { twMerge } from "tailwind-merge";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
  className?: string;
  children?: React.ReactNode;
  tag: HeadingTag;
  variant?: HeadingTag;
  serif?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  className,
  tag,
  variant,
  children,
  // serif = false,
}) => {
  return React.createElement(
    tag,
    {
      className: twMerge(
        conditionalClassNames(tag, variant),
        // serif && "font-notoSerif font-normal",
        className // Ensure className comes last
      ),
    },
    children
  );
};

export default Heading;

const conditionalClassNames = (
  tag: HeadingTag,
  variant: HeadingTag | undefined
) => {
  if (tag === "h1" || variant === "h1") {
    return "md:text-4xl text-[26px] sm:leading-[48px] dark:text-[#B6B9B7]";
  }

  if (tag === "h2" || variant === "h2") {
    return "lg:text-[32px] sm:text-[22px] text-[20px] text-greyscale-600 dark:text-[#B6B9B7]";
  }

  if (tag === "h3" || variant === "h3") {
    return "lg:text-[24px] text-lg text-greyscale-600 dark:text-[#B6B9B7]";
  }
  if (tag === "h4" || variant === "h4") {
    return "lg:text-xl  text-greyscale-600 dark:text-[#B6B9B7]";
  }
  if (tag === "h5" || variant === "h5") {
    return "text-[16px]  text-greyscale-600 dark:text-[#B6B9B7]";
  }

  if (tag === "h6" || variant === "h6") {
    return "text-base text-greyscale-600 font-[600] dark:text-[#B6B9B7]";
  }

  return "";
};
