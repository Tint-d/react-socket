import { Input } from "@/components/ui/input";
import React, { forwardRef } from "react";
import { BiEnvelope } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { IoSearch } from "react-icons/io5";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  withAstrisk?: boolean;
  variant?: "default" | "outline" | "underline" | "phone" | "search" | "CRUD";
  isEmail?: boolean;
  isSearchIcon?: boolean;
}

const MyInput = forwardRef<HTMLInputElement, PropsType>(
  (
    {
      label,
      labelClassName,
      inputClassName,
      withAstrisk,
      variant = "default",
      isEmail = false,
      isSearchIcon = false,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-[2px]">
        {label && (
          <label
            htmlFor=""
            className={twMerge(
              "text-lightGray text-sm font-[400]",
              labelClassName
            )}
          >
            {label}
            {withAstrisk && (
              <span className="ml-1 -translate-y-2 text-sm text-red-500">
                *
              </span>
            )}
          </label>
        )}
        <div className=" relative">
          {isSearchIcon && (
            <IoSearch className="absolute top-3 left-3 text-greyscale-700 " />
          )}
          <Input
            {...inputProps} // Spread the input attributes
            ref={ref} // Attach the ref
            className={twMerge(
              (variant === "default" || variant === "outline") &&
                "focus:ring-purple- rounded-full border-2 border-gray-500 bg-transparent text-sm font-normal text-slate-700 placeholder:text-sm placeholder:font-normal placeholder:text-gray-400 focus:border-opacity-100 focus:ring-2 focus:ring-opacity-50 focus-visible:border-purple-600 focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-offset-[0px]",
              variant === "underline" &&
                "focus:border-primary-500 placeholder:text-lightGray border-lightGray text-lightGray 0 rounded-none border-b border-l-0 border-r-0 border-t-0 border-opacity-40 bg-white text-sm font-normal placeholder:text-sm placeholder:!font-light focus:border-opacity-100 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-[0px]",
              variant === "phone" &&
                "focus:ring-primary-500 rounded-full border border-purple-500 bg-transparent pl-28 text-sm font-normal text-slate-500 placeholder:text-base placeholder:font-normal placeholder:text-gray-400 focus:border-opacity-100 focus:ring-2 focus:ring-opacity-50 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-offset-[0px]",
              variant === "search" &&
                "focus:ring-primary-500 pl-8 w-80 rounded-full border border-purple-500 bg-maya-blue-50 text-sm font-normal text-slate-500 placeholder:text-base placeholder:font-normal placeholder:text-gray-400 focus:border-opacity-100 focus:ring-2 focus:ring-opacity-50 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-offset-[0px]",
              variant === "CRUD" &&
                "focus:ring-primary-500  w-full rounded-xl   bg-white text-sm font-normal text-slate-500 placeholder:text-base placeholder:font-normal placeholder:text-gray-400 focus:border-opacity-100 focus:ring-2 focus:ring-opacity-50 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-offset-[0px]",

              // "placeholder:text-lightGray text h-11 rounded-none border-y border-l border-r-0 border-secondary border-opacity-40 px-4 text-base font-normal outline-none placeholder:text-right placeholder:font-normal focus-visible:border-accent focus-visible:ring-0 focus-visible:ring-offset-0",
              inputClassName
            )}
          />
          {isEmail && (
            <BiEnvelope className="absolute top-3 right-3 text-gray-500 " />
          )}{" "}
        </div>
      </div>
    );
  }
);

MyInput.displayName = "MyInput";

export default MyInput;
