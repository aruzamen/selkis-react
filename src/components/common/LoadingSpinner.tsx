import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading…" }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted text-sm">
    <div className="w-9 h-9 rounded-full border-[3px] border-border border-t-accent animate-spin" />
    <span>{message}</span>
  </div>
);

export default LoadingSpinner;
