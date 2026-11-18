"use client";

import { useId } from "react";

function GoldBand({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      className={className}
      viewBox="0 0 360 360"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-gold`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop stopColor="#765023" />
          <stop offset=".18" stopColor="#d6ae67" />
          <stop offset=".32" stopColor="#fff0c0" />
          <stop offset=".46" stopColor="#b58a45" />
          <stop offset=".62" stopColor="#f2d391" />
          <stop offset=".8" stopColor="#92682d" />
          <stop offset="1" stopColor="#e8c780" />
        </linearGradient>

        <linearGradient id={`${id}-edge`}>
          <stop stopColor="#fff5d1" />
          <stop offset=".45" stopColor="#b48b49" />
          <stop offset=".75" stopColor="#fff1bf" />
          <stop offset="1" stopColor="#8c632a" />
        </linearGradient>
      </defs>

      {/* The centre is genuinely transparent. */}
      <circle
        cx="180"
        cy="180"
        r="140"
        fill="none"
        stroke="#775326"
        strokeWidth="32"
      />

      <circle
        cx="180"
        cy="180"
        r="139"
        fill="none"
        stroke={`url(#${id}-gold)`}
        strokeWidth="27"
      />

      <circle
        cx="180"
        cy="180"
        r="152"
        fill="none"
        stroke={`url(#${id}-edge)`}
        strokeWidth="2"
      />

      <circle
        cx="180"
        cy="180"
        r="125"
        fill="none"
        stroke={`url(#${id}-edge)`}
        strokeWidth="3"
      />

      {/* A restrained reflection across the upper edge. */}
      <path
        className="band-reflection"
        d="M63 115A135 135 0 0 1 241 59"
        fill="none"
        stroke="#fff8de"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".65"
      />

      <text
        x="180"
        y="322"
        textAnchor="middle"
        fill="#805d2e"
        fontFamily="Georgia, serif"
        fontSize="8"
        letterSpacing="2"
      >
        K &amp; R · 18.04.2030
      </text>
    </svg>
  );
}

export default function WeddingRings() {
  return (
    <div className="ring-interlude" aria-hidden="true">
      <div className="ring-atmosphere" />

      <div className="ring-caption">
        <span>ONE PROMISE</span>
        <p>A lifetime of choosing you.</p>
      </div>

      <div className="ring-cushion">
        <div className="cushion-seam" />
        <div className="cushion-ribbon" />
      </div>

      <div className="ring-partner">
        <GoldBand />
      </div>

      <div className="ring-position">
        <div className="ring-portal">
          <GoldBand />
        </div>
      </div>
    </div>
  );
}

export function WeddingRingEmblem() {
  return (
    <div className="wedding-ring-emblem" aria-hidden="true">
      <GoldBand />
      <GoldBand />
    </div>
  );
}