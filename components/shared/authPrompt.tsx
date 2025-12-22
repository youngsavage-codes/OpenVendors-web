"use client";

import React from "react";
import Link from "next/link";

interface SignUpPromptProps {
  message?: string; // default message
  linkText?: string; // default link text
  href?: string; // default signup link
  className?: string;
}

const AuthPrompt = ({
  message = "Don't have an account?",
  linkText = "Sign Up",
  href = "/authentication/signup",
  className,
}: SignUpPromptProps) => {
  return (
    <div className={`text-center text-sm text-gray-600 font-light text-[18px] ${className}`}>
      {message}{" "}
      <Link
        href={href}
        className="text-[#1F363D] font-medium hover:underline"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthPrompt;
