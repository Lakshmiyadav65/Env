import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { container: "h-8 w-8", img: "h-4 w-4", border: "border-2" },
  md: { container: "h-16 w-16", img: "h-9 w-9", border: "border-[3px]" },
  lg: { container: "h-24 w-24", img: "h-14 w-14", border: "border-4" },
} as const;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const dims = SIZE_MAP[size];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`relative inline-flex items-center justify-center ${dims.container} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full border-green-200/60 border-t-green-600 ${dims.border} animate-spin`}
      />
      <img
        src="/logo.png"
        alt=""
        draggable={false}
        className={`${dims.img} object-contain select-none animate-enviraan-pulse`}
      />
    </div>
  );
};

export default LoadingSpinner;
