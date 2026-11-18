"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ArrivalCopy({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const entrance = gsap.timeline();

      entrance.fromTo(
        ".arrival-enter-label",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        0,
      );

      entrance.fromTo(
        ".arrival-enter-first",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        0.15,
      );

      entrance.fromTo(
        ".arrival-enter-of",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.75,
          ease: "power3.out",
        },
        0.35,
      );

      entrance.fromTo(
        ".arrival-enter-always",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.95,
          ease: "power1.inOut",
        },
        0.55,
      );

      entrance.fromTo(
        ".arrival-underline-ink",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        1.05,
      );

      entrance.fromTo(
        ".arrival-enter-note",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        1.15,
      );
    }, ref);

    return () => context.revert();
  }, [ready]);

  return (
    <div
      ref={ref}
      className="arrival-copy arrival-editorial"
      data-ready={ready}
    >
      <p className="eyebrow arrival-text-mask">
        <span className="arrival-exit-label">
          <span className="arrival-enter-label">
            A WEDDING INVITATION
          </span>
        </span>
      </p>

      <h1>
        <span className="arrival-text-mask arrival-first-line">
          <span className="arrival-exit-first">
            <span className="arrival-enter-first">
              The beginning
            </span>
          </span>
        </span>

        <span className="arrival-second-line">
          <span className="arrival-text-mask arrival-of-mask">
            <span className="arrival-exit-of">
              <span className="arrival-enter-of">of</span>
            </span>
          </span>

          {" "}

          <span className="arrival-always-group">
            <span className="arrival-text-mask">
              <span className="arrival-exit-always">
                <em className="arrival-enter-always">always.</em>
              </span>
            </span>

            <span className="arrival-underline-track" aria-hidden="true">
              <span className="arrival-underline-ink" />
            </span>
          </span>
        </span>
      </h1>

      <p className="arrival-note arrival-text-mask">
        <span className="arrival-exit-note">
          <span className="arrival-enter-note">
            Come in. Our next chapter begins here.
          </span>
        </span>
      </p>
    </div>
  );
}