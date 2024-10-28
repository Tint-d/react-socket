import React, { forwardRef, useState } from "react";
import MyInput from "./MyInput";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  withAstrisk?: boolean;
}
const PasswordInput = forwardRef<HTMLInputElement, PropsType>(
  ({ label, placeholder, withAstrisk, ...inputProps }, ref) => {
    const [toggle, setToggle] = useState(false);
    return (
      <div className="relative w-full">
        <MyInput
          withAstrisk={withAstrisk}
          ref={ref}
          label={label}
          type={toggle ? "text" : "password"}
          placeholder={placeholder}
          {...inputProps}
        />
        <p
          // type="button"
          onClick={(e) => {
            e.stopPropagation();
            setToggle((prev) => !prev);
          }}
          className={twMerge(
            "absolute right-3 top-10 cursor-pointer",
            label ? "top-10" : "top-3"
          )}
        >
          {toggle ? (
            <IoEyeOffOutline />
          ) : (
            <IoEyeOutline className="text-gray-500  bg-transparent" />
          )}
        </p>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
