import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const SIZE_MAP = {
  sm: { box: 40, logo: 18, stroke: 2 },
  md: { box: 88, logo: 40, stroke: 3 },
  lg: { box: 128, logo: 60, stroke: 3.5 },
} as const;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  label,
  className = "",
}) => {
  const d = SIZE_MAP[size];
  const center = d.box / 2;
  const outerR = center - d.stroke;
  const innerR = outerR - d.stroke * 2.4;
  const outerCirc = 2 * Math.PI * outerR;
  const innerCirc = 2 * Math.PI * innerR;

  return (
    <div
      role="status"
      aria-label={label ?? "Loading"}
      className={`inline-flex flex-col items-center ${className}`}
    >
      <div
        className="relative"
        style={{ width: d.box, height: d.box }}
      >
        {/* Soft radial halo */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full animate-enviraan-halo"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,197,94,0.22), rgba(34,197,94,0) 72%)",
          }}
        />

        {/* Concentric arcs (outer clockwise, inner counter-clockwise) */}
        <svg
          aria-hidden
          width={d.box}
          height={d.box}
          viewBox={`0 0 ${d.box} ${d.box}`}
          className="absolute inset-0"
        >
          <g
            className="animate-spin"
            style={{ transformOrigin: "center", animationDuration: "1.6s" }}
          >
            <circle
              cx={center}
              cy={center}
              r={outerR}
              fill="none"
              stroke="#16a34a"
              strokeWidth={d.stroke}
              strokeLinecap="round"
              strokeDasharray={`${outerCirc * 0.28} ${outerCirc * 0.72}`}
            />
          </g>
          <g
            className="animate-enviraan-spin-reverse"
            style={{ transformOrigin: "center" }}
          >
            <circle
              cx={center}
              cy={center}
              r={innerR}
              fill="none"
              stroke="#86efac"
              strokeWidth={d.stroke * 0.7}
              strokeLinecap="round"
              strokeDasharray={`${innerCirc * 0.14} ${innerCirc * 0.86}`}
            />
          </g>
        </svg>

        {/* Logo — breathes in center */}
        <img
          src="/logo.png"
          alt=""
          draggable={false}
          className="absolute select-none object-contain animate-enviraan-pulse"
          style={{
            width: d.logo,
            height: d.logo,
            top: "50%",
            left: "50%",
          }}
        />
      </div>

      {label && (
        <p className="mt-5 text-[13px] font-medium tracking-[0.08em] uppercase text-slate-500">
          {label}
          <span className="enviraan-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
