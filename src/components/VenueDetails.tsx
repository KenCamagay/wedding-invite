"use client";

import { useId } from "react";

type VenueRoom = "ceremony" | "story" | "garden" | "beach";

export default function VenueDetails({
  room,
}: {
  room: VenueRoom;
}) {
  const id = useId().replace(/:/g, "");
  const stone = `${id}-stone`;
  const grain = `${id}-grain`;
  const view = `${id}-view`;

  const beach = room === "beach";
  const outside = room === "garden" || beach;

  return (
    <svg
      className={`venue-details venue-details-${room}`}
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={stone}>
          <stop stopColor="#9c8668" />
          <stop offset=".22" stopColor="#f0e2c8" />
          <stop offset=".6" stopColor="#d5be98" />
          <stop offset="1" stopColor="#a68c67" />
        </linearGradient>

        <linearGradient id={view} x2="0" y2="1">
          <stop stopColor={outside ? "#d9c9b0" : "#4b6153"} />
          <stop
            offset=".65"
            stopColor={outside ? "#9eb5ad" : "#273e34"}
          />
          <stop offset="1" stopColor="#bcaa87" />
        </linearGradient>

        <pattern
          id={grain}
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="7" cy="11" r=".7" fill="#6f604b" />
          <circle cx="31" cy="35" r=".5" fill="#6f604b" />

          <path
            d="M20 5h2M40 23h3M10 39h2"
            stroke="#fff5df"
            strokeWidth=".7"
          />
        </pattern>
      </defs>

      {/* A shared threshold connects the illustrated rooms. */}
      {!beach && (
        <g>
          <path
            d="M0 922H1600V1000H0Z"
            fill="#d7c3a3"
            fillOpacity=".72"
          />
          <path
            d="M0 932H1600M0 940H1600"
            stroke="#aa8e60"
            strokeWidth="2"
            opacity=".55"
          />

          {[200, 500, 800, 1100, 1400].map((x) => (
            <path
              key={x}
              d={`M800 760L${x} 1000`}
              stroke="#927b5e"
              opacity=".18"
            />
          ))}

          <path
            d="M-50 970Q240 935 480 973T1050 968T1650 961"
            fill="none"
            stroke="#fff5df"
            strokeWidth="2"
            opacity=".3"
          />
        </g>
      )}

      {/* Enter from the left; continue through the right arch. */}
      {!beach &&
        [-1, 1].map((side) => (
          <g
            key={side}
            transform={`translate(${side === -1 ? 60 : 1540} 0)`}
          >
            <path
              d="M-105 940V410Q0 185 105 410V940Z"
              fill={`url(#${view})`}
              stroke={`url(#${stone})`}
              strokeWidth="25"
            />

            <path
              d="M-85 940V414Q0 224 85 414V940"
              fill="none"
              stroke="#efd7a3"
              strokeWidth="2"
              opacity=".75"
            />

            {/* The same linen reappears in the transition. */}
            <path
              className="linen-sway"
              d="M-87 415Q-25 570-65 905H-95V415Z"
              fill="#fff0d8"
              opacity=".72"
            />

            <path
              d="M-120 935H120"
              stroke="#c3a16a"
              strokeWidth="9"
            />

            <path
              d="M-122 435V912M122 435V912"
              stroke="#f8ecd5"
              strokeWidth="4"
              opacity=".45"
            />

            {/* A restrained brass wall light. */}
            <g transform={`translate(${side === -1 ? 145 : -145} 550)`}>
              <ellipse
                rx="36"
                ry="65"
                fill="#ffdf9e"
                opacity=".08"
              />
              <path
                d="M0-28V35"
                stroke="#bb975d"
                strokeWidth="5"
              />
              <path
                d="M-12-24H12L18 0H-18Z"
                fill="#f5dfb5"
              />
            </g>
          </g>
        ))}

      {/* Texture affects the artwork, never the text. */}
    <rect
      width="1600"
      height="1000"
      fill={`url(#${grain})`}
      opacity=".12"
    />
    </svg>
  );
}