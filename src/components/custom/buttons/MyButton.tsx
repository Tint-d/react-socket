import { FiChevronRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { ImSpinner2 } from "react-icons/im";
import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

interface PropsType extends ButtonProps {
  href?: string;
  target?: React.HTMLAttributeAnchorTarget | undefined;
  hasIcon?: boolean;
  srOnly?: string;
  isLoading?: boolean;
  loadingClassName?: string;
  ringSizeicon?: React.ReactNode;
}

const MyButton = React.forwardRef<HTMLButtonElement, PropsType>(
  (
    {
      href,
      target,
      children,
      hasIcon = false,
      ringSizeicon = false,
      srOnly,
      ...props
    },
    ref
  ) => {
    return href ? (
      <Link to={href} target={target}>
        <CustomButton {...props} hasIcon={hasIcon} ref={ref}>
          {children}
        </CustomButton>
      </Link>
    ) : (
      <CustomButton {...props} hasIcon={hasIcon} ref={ref}>
        {children}
      </CustomButton>
    );
  }
);

MyButton.displayName = "MyButton";

export default MyButton;

const CustomButton = React.forwardRef<HTMLButtonElement, PropsType>(
  (
    {
      hasIcon,
      srOnly,
      children,
      isLoading,
      disabled,
      loadingClassName,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        {...props}
        className={twMerge(
          "group flex w-28 items-center gap-x-2 rounded-full  text-white py-1.5 hover:bg-maya-blue-600 dark:bg-[#162950] dark:text-[#B6B9B7]",
          props.className
        )}
        disabled={isLoading ? isLoading : disabled}
        aria-label={srOnly ? srOnly : undefined}
        ref={ref}
      >
        {isLoading ? (
          <ImSpinner2
            size={20}
            className={twMerge(
              "animate-spin fill-white stroke-white",
              loadingClassName
            )}
          />
        ) : (
          children
        )}

        {srOnly && <span className="sr-only">{srOnly}</span>}

        {hasIcon && (
          <FiChevronRight
            className={twMerge(
              "stroke-white text-base duration-300 group-hover:translate-x-1",
              "stroke-primary font-bold"
            )}
          />
        )}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";
