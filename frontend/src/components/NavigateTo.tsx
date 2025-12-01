import React, { ComponentProps, ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import { motion } from "framer-motion";

type NavigateToProps = LinkProps & { icon?: ReactNode };

const NavigateTo = ({
  to,
  className,
  children,
  icon = null,
}: NavigateToProps) => {
  return (
    <Link
      to={to}
      className={`justify-center tracking-tight bg-accent text-gray-100 font-[500] inline-flex items-center px-4 rounded-md h-10 group ${className}`}
    >
      {!!icon && (
        <motion.span
          className={"block mr-2 transform transition group-hover:rotate-90"}
        >
          {icon}
        </motion.span>
      )}
      {children}
    </Link>
  );
};

export default NavigateTo;
