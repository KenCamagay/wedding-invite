"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EntranceBanners({
  ready,
}: {
  ready: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const entrance = gsap.timeline();

      entrance.fromTo(
        ".banner-brass-rail",
        { opacity: 0, scaleX: 0.8 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.35,
          stagger: 0.1,
          ease: "power2.out",
        },
        0,
      );

      entrance.fromTo(
        ".banner-unfurl",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.16,
          ease: "power2.inOut",
        },
        0.15,
      );

      entrance.fromTo(
        ".banner-settle",
        { rotationX: -12 },
        {
          rotationX: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "back.out(1.2)",
        },
        0.3,
      );

      entrance.fromTo(
        ".entrance-date-plaque",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
        },
        0.8,
      );
    }, root);

    return () => context.revert();
  }, [ready]);

  return (
    <div
      ref={root}
      className="entrance-stationery"
      data-ready={ready}
    >
      <h1 className="entrance-accessible-title">
        The beginning of always.
      </h1>

      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className={`church-banner banner-${side}`}
          aria-hidden="true"
        >
          {/* GSAP scrolling controls only this wrapper. */}
          <div className="banner-travel">
            <div className="banner-brass-rail" />

            {/* Entrance reveal and settling use separate wrappers. */}
            <div className="banner-unfurl">
              <div className="banner-settle">
                {/* Existing idle animation stays on the cloth. */}
                <div className="banner-cloth">
                  <span className="banner-crest">
                    {side === "left" ? "K" : "R"}
                  </span>

                  <span className="banner-fine-rule" />

                  <p className="banner-heading">
                    {side === "left" ? (
                      <>
                        The
                        <br />
                        beginning
                      </>
                    ) : (
                      <>
                        of
                        <br />
                        <em>always.</em>
                      </>
                    )}
                  </p>

                  <svg
                    className="banner-branch"
                    viewBox="0 0 80 110"
                  >
                    <g
                      transform={
                        side === "right"
                          ? "translate(80 0) scale(-1 1)"
                          : undefined
                      }
                    >
                      <path d="M40 105Q32 55 43 8" />
                      <path d="M39 80Q10 72 18 51Q38 56 39 80Z" />
                      <path d="M38 61Q62 55 63 34Q43 38 38 61Z" />
                      <path d="M39 41Q20 34 25 18Q40 23 39 41Z" />
                    </g>
                  </svg>

                  <span className="banner-footnote">
                    {side === "left"
                      ? "WITH FULL HEARTS"
                      : "KEN & RIZA"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="entrance-date-plaque">
        <span>18 APRIL 2030</span>
        <small>BATANGAS</small>
      </div>
    </div>
  );
}