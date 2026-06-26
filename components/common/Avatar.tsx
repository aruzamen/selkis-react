"use client";

import React from "react";

interface AvatarProps {
  initials: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

const Avatar: React.FC<AvatarProps> = ({ initials, color = "#6366f1", size = "md" }) => (
  <div
    className={`${sizeMap[size]} rounded-full flex items-center justify-center font-display font-bold text-white shrink-0 tracking-wide select-none`}
    style={{ backgroundColor: color }}
  >
    {initials}
  </div>
);

export default Avatar;
