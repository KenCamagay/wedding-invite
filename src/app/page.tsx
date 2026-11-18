"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LivingScenes, { type RoomKind } from "@/components/LivingScenes";
import {
  RoomBackdrop,
  InteriorDetails,
  SeatingPanel,
  CelebrationPanel,
  TransitionFlowers,
} from "@/components/GuestRooms";
import RoomFit from "@/components/RoomFit";
import VenueDetails from "@/components/VenueDetails";
import WeddingRings, {
  WeddingRingEmblem,
} from "@/components/WeddingRings";
import InvitationIntro from "@/components/InvitationIntro";
import ArrivalCopy from "@/components/ArrivalCopy";
import EntranceBanners from "@/components/EntranceBanners";
import WeddingMusic from "@/components/WeddingMusic";


const rooms: RoomKind[] = ["ceremony", "story", "garden", "beach"];

const chapterNames = [
  "THE ARRIVAL",
  "THE VOWS",
  "YOUR PLACE",
  "THE CELEBRATION",
  "FOREVER, FROM HERE",
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [programmeRevealed, setProgrammeRevealed] = useState(false);
const programmeRevealStarted = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [activeMemory, setActiveMemory] = useState(0);
  const [celebrationMoment, setCelebrationMoment] = useState<
    "ceremony" | "reception"
  >("ceremony");
  const [vowsRevealed, setVowsRevealed] = useState(false);
const vowsRevealStarted = useRef(false);
const [seatingRevealed, setSeatingRevealed] = useState(false);
const seatingRevealStarted = useRef(false);
  const [introReady, setIntroReady] = useState(false);
  const [beachRevealed, setBeachRevealed] = useState(false);
const beachRevealStarted = useRef(false);
  const handleIntroComplete = useCallback(() => {
    setIntroReady(true);
  }, []);
  const memories = [
    {
      title: "The first hello",
      text: "The story of how we met will live here, in our own words.",
    },
    {
      title: "The little things",
      text: "A favorite memory together will become this chapter.",
    },
    {
      title: "Choosing forever",
      text: "Our proposal story, or another moment we choose to share.",
    },
  ];

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
  if (reduced) return;

  gsap.registerPlugin(ScrollTrigger);

  const context = gsap.context(() => {

    const getRingExitScale = () => {
      const viewport =
        root.current?.querySelector<HTMLElement>(".journey-viewport");

      const ring =
        root.current?.querySelector<HTMLElement>(".ring-position");

      if (!viewport || !ring || !ring.clientWidth) return 12;

      const halfDiagonal =
        Math.hypot(viewport.clientWidth, viewport.clientHeight) / 2;

      // The ring's clear inner radius is approximately
      // 123 units within its 360-unit SVG.
      const innerRadius = ring.clientWidth * (123 / 360);

      return Math.max(1, (halfDiagonal / innerRadius) * 1.08);
    };
    // Reset the pixel offset so GSAP controls movement entirely
    // through xPercent.
    gsap.set(".stone-passage, .floral-passage", {
      x: 0,
      xPercent: 110,
    });

    let previousChapter = -1;

    const tl = gsap.timeline({
      defaults: { ease: "none" },

      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.3,
        invalidateOnRefresh: true,
      },

      onUpdate() {
        const time = this.time();
          // Start once the doorway dissolve has cleared.
          if (time >= 0.92 && time < 2.3 && !vowsRevealStarted.current) {
            vowsRevealStarted.current = true;
            setVowsRevealed(true);
          }
          // The ring clears at 6.52, before the 0.85 timeline shift.
if (time >= 6.52 - 0.85 && !beachRevealStarted.current) {
  beachRevealStarted.current = true;
  setBeachRevealed(true);
}
          // The curtains finish opening at 5.03 before the 0.85 shift.
if (time >= 4.18 && time < 5.67 && !programmeRevealStarted.current) {
  programmeRevealStarted.current = true;
  setProgrammeRevealed(true);
}
          // The stone passage clears at about 2.77 after shiftChildren.
if (time >= 2.78 && time < 3.5 && !seatingRevealStarted.current) {
  seatingRevealStarted.current = true;
  setSeatingRevealed(true);
}
      const current =
        time < 0.9 ? 0 :
        time < 2.3 ? 1 :
        time < 3.5 ? 2 :
        time < 5.67 ? 3 : 4;

        if (current !== previousChapter) {
          previousChapter = current;
          setChapter(current);
        }
      },
    });

    timeline.current = tl;

/* Banners gently open a path toward the church doors. */

tl.fromTo(
  ".banner-left .banner-travel",
  {
    xPercent: 0,
    rotation: 0,
    rotationY: 0,
  },
  {
    xPercent: -18,
    rotation: 7,
    rotationY: -20,
    duration: 0.42,
    ease: "power1.inOut",
  },
  0.04,
);

tl.fromTo(
  ".banner-right .banner-travel",
  {
    xPercent: 0,
    rotation: 0,
    rotationY: 0,
  },
  {
    xPercent: 18,
    rotation: -7,
    rotationY: 20,
    duration: 0.42,
    ease: "power1.inOut",
  },
  0.07,
);    /*
     * ARRIVAL
     * Keep the door animation, but replace the bright flash
     * with a warm, slower dissolve through the entrance.
     */
  /* Exterior text leaves in reverse reading order. */



tl.to(
  ".arrival-exit-label",
  {
    yPercent: 115,
    opacity: 0,
    duration: 0.12,
    ease: "power1.in",
  },
  0.21,
);

    tl.to(
      ".exterior-board",
      
      {
        scale: 2.4,
        duration: 0.48,
        ease: "power1.inOut",
      },
      
      0.05,
      
    );

    tl.to(
      ".left-door",
      {
        rotationY: -105,
        duration: 0.3,
        ease: "power1.inOut",
      },
      0.32,
    );

    tl.to(
      ".right-door",
      {
        rotationY: 105,
        duration: 0.3,
        ease: "power1.inOut",
      },
      0.32,
    );

    tl.to(
      ".entrance-light",
      {
        opacity: 0.45,
        duration: 0.28,
      },
      0.42,
    );

    tl.to(
      ".exterior-board",
      {
        scale: 5,
        duration: 0.33,
        ease: "power2.in",
      },
      0.55,
    );

  tl.fromTo(
  ".room-ceremony",
  { autoAlpha: 0 },
  { autoAlpha: 1, duration: 0.22, ease: "sine.inOut" },
  0.7,
);

tl.set(".arrival-scene", { autoAlpha: 0 }, 0.92);

tl.fromTo(
  ".room-ceremony .room-art",
  { scale: 1.12 },
  { scale: 1, duration: 0.5, ease: "power1.out" },
  0.92,
);

  
    /*
     * Rooms are changed while a foreground object covers
     * the camera. No white flashes.
     */
    function passBehind(
      from: string,
      to: string,
      at: number,
      foreground: string,
    ) {
      if (from !== "ceremony") {
        tl.to(
          `.room-${from} .room-copy`,
          { opacity: 0, y: -12, duration: 0.18 },
          at,
        );
      }

     tl.to(
      `.room-${from} .room-art`,
      {
        scale: 1.28,
        xPercent: -10,
        duration: 0.55,
        ease: "power1.in",
      },
      at,
    );

      tl.fromTo(
        foreground,
        {
          x: 0,
          xPercent: 110,
        },
        {
          x: 0,
          xPercent: 0,
          duration: 0.4,
          ease: "power1.inOut",
          immediateRender: false,
        },
        at + 0.1,
      );

      // The foreground now completely covers the scene.
      tl.set(`.room-${from}`, { autoAlpha: 0 }, at + 0.5);
      tl.set(`.room-${to}`, { autoAlpha: 1 }, at + 0.5);

      tl.fromTo(
        `.room-${to} .room-art`,
        {
          scale: 1.16,
          xPercent: 8,
        },
        {
          scale: 1,
          xPercent: 0,
          duration: 0.6,
          ease: "power1.out",
          immediateRender: false,
        },
        at + 0.5,
      );

      tl.to(
        foreground,
        {
          x: 0,
          xPercent: -110,
          duration: 0.45,
          ease: "power1.inOut",
        },
        at + 0.52,
      );
       }
  


    // The lower details recede first. The names part as the aisle opens.
tl.to(
  ".vows-poem, .vows-date, .room-ceremony .journey-hashtag, .vows-rings",
  { opacity: 0, y: 6, duration: 0.13, stagger: 0.025 },
  2.65,
);

tl.to(".vows-rule-ink", { scaleY: 0, duration: 0.18 }, 2.68);

tl.to(
  ".vows-ken",
  {
    xPercent: -15,
    clipPath: "inset(0% 100% 0% 0%)",
    duration: 0.29,
    ease: "power2.inOut",
  },
  2.72,
);

tl.to(
  ".vows-riza",
  {
    xPercent: 15,
    clipPath: "inset(0% 0% 0% 100%)",
    duration: 0.29,
    ease: "power2.inOut",
  },
  2.72,
);

tl.to(
  ".vows-ampersand, .vows-eyebrow",
  { opacity: 0, duration: 0.15 },
  2.86,
);
   /* CHURCH → SEATING */
passBehind(
  "ceremony",
  "story",
  2.65,
  ".stone-passage",
);



/* Initial states for the reused transition elements. */
tl.set(
  ".shore-curtains",
  { opacity: 0 },
  0,
);

tl.set(
  ".curtain-left, .curtain-right",
  { xPercent: 0 },
  0,
);

tl.set(
  ".curtain-valance",
  { yPercent: 0 },
  0,
);

tl.set(
  ".ring-interlude",
  { autoAlpha: 0 },
  0,
);

tl.set(
  ".ring-portal",
  {
    scale: 0.82,
    rotation: -12,
    y: 35,
  },
  0,
);



tl.to(
  ".room-story .seating-panel",
  {
    y: 18,
    scale: 0.98,
    duration: 0.22,
    ease: "power1.in",
  },
  4.05,
);

tl.to(
  ".room-story .room-art",
  {
    scale: 1.2,
    xPercent: -5,
    duration: 0.5,
    ease: "power1.in",
  },
  3.85,
);

tl.to(
  ".shore-curtains",
  {
    opacity: 1,
    duration: 0.3,
    ease: "power1.inOut",
  },
  4.02,
);

/* Swap rooms while the fabric covers the viewport. */
tl.set(".room-story", { autoAlpha: 0 }, 4.35);
tl.set(".room-garden", { autoAlpha: 1 }, 4.35);

tl.fromTo(
  ".room-garden .room-art",
  {
    scale: 1.12,
    xPercent: 0,
  },
  {
    scale: 1,
    xPercent: 0,
    duration: 0.65,
    ease: "power1.out",
    immediateRender: false,
  },
  4.35,
);

tl.to(
  ".curtain-left",
  {
    xPercent: -108,
    duration: 0.65,
    ease: "power2.inOut",
  },
  4.38,
);

tl.to(
  ".curtain-right",
  {
    xPercent: 108,
    duration: 0.65,
    ease: "power2.inOut",
  },
  4.38,
);

tl.to(
  ".curtain-valance",
  {
    yPercent: -110,
    duration: 0.55,
    ease: "power2.inOut",
  },
  4.42,
);


/* SCHEDULE → BEACH
   The beach appears inside the ring's opening.
   Both the opening and the ring expand together. */

const getRingGeometry = () => {
  const viewport =
    root.current?.querySelector<HTMLElement>(".journey-viewport");

  const ring =
    root.current?.querySelector<HTMLElement>(".ring-position");

  const width = viewport?.clientWidth ?? window.innerWidth;
  const height = viewport?.clientHeight ?? window.innerHeight;
  const ringWidth = ring?.clientWidth || 220;

  const innerRadius = ringWidth * (123 / 360);

  const exitScale = Math.max(
    1,
    (Math.hypot(width, height) / 2 / innerRadius) * 1.08,
  );

  return { innerRadius, exitScale };
};

// Lift the whole programme as the ring arrives.
tl.to(
  ".room-garden .wedding-programme",
  {
    autoAlpha: 0,
    y: -26,
    duration: 0.32,
    ease: "power2.inOut",
  },
  5.15,
);

/* Keep the pavilion steady behind the rings. */
tl.to(
  ".ring-interlude",
  {
    autoAlpha: 1,
    duration: 0.2,
    ease: "power1.out",
  },
  5.25,
);

tl.to(
  ".ring-portal",
  {
    scale: 1,
    rotation: 0,
    y: 0,
    duration: 0.28,
    ease: "power2.out",
  },
  5.35,
);

tl.fromTo(
  ".ring-portal .band-reflection",
  { opacity: 0.25 },
  {
    opacity: 0.95,
    duration: 0.2,
    immediateRender: false,
  },
  5.45,
);

tl.to(
  ".ring-caption",
  {
    opacity: 0,
    duration: 0.16,
  },
  5.67,
);

tl.to(
  ".ring-cushion, .ring-partner",
  {
    opacity: 0,
    duration: 0.22,
  },
  5.67,
);

tl.to(
  ".ring-atmosphere",
  {
    opacity: 0,
    duration: 0.3,
  },
  5.67,
);

/* Reveal the destination through the transparent ring centre. */
tl.fromTo(
  ".room-beach",
  {
    autoAlpha: 0,
    clipPath: () => {
      const { innerRadius } = getRingGeometry();
      return `circle(${innerRadius}px at 50% 50%)`;
    },
  },
  {
    autoAlpha: 1,
    duration: 0.15,
    immediateRender: false,
  },
  5.7,
);

/* Start both expansions together, with matching easing. */
tl.to(
  ".ring-portal",
  {
    scale: () => getRingGeometry().exitScale,
    duration: 0.65,
    ease: "power2.in",
  },
  5.85,
);

tl.to(
  ".room-beach",
  {
    clipPath: () => {
      const { innerRadius, exitScale } = getRingGeometry();

      return `circle(${
        innerRadius * exitScale
      }px at 50% 50%)`;
    },
    duration: 0.65,
    ease: "power2.in",
  },
  5.85,
);

/* The opening now covers the whole screen. */
tl.set(".room-garden", { autoAlpha: 0 }, 6.52);
tl.set(".ring-interlude", { autoAlpha: 0 }, 6.52);
tl.set(".room-beach", { clipPath: "none" }, 6.52);

tl.to({}, { duration: 0.97 }, 6.52);
tl.shiftChildren(-0.85, false, 2.65);
  }, root);

  return () => {
    context.revert();
    timeline.current = null;
  };
}, [reduced]);

  function goToChapter(index: number) {
    if (reduced) {
      const targets = ["arrival", ...rooms];
      document.getElementById(targets[index])?.scrollIntoView();
      return;
    }

    const trigger = timeline.current?.scrollTrigger;
    const duration = timeline.current?.duration();

    if (!trigger || !duration) return;

    // These land after each room's entrance animation.
    const times = [0, 1.6, 2.93, 4.2, 6.3];
    const progress = times[index] / duration;

    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: "instant",
    });
  }

  function saveDate() {
    const contents = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ken and Riza//Wedding//EN",
      "BEGIN:VEVENT",
      "UID:ken-riza-20300418@wedding-invite",
      "DTSTAMP:20261116T000000Z",
      "DTSTART;VALUE=DATE:20300418",
      "DTEND;VALUE=DATE:20300419",
      "SUMMARY:Ken & Riza Wedding",
      "LOCATION:Batangas",
      "DESCRIPTION:Church and ceremony time to follow.",
      "END:VEVENT",
      "END:VCALENDAR",
      "",
    ].join("\r\n");

    const url = URL.createObjectURL(
      new Blob([contents], { type: "text/calendar;charset=utf-8" }),
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "ken-and-riza-wedding.ics";
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <main
      ref={root}
      className={`church-journey ${reduced ? "reduced-journey" : ""}`}
    >
     <InvitationIntro onComplete={handleIntroComplete} />
      <div className="journey-viewport">
        <header className="journey-header">
  <button
    type="button"
    className="journey-monogram"
    onClick={() => goToChapter(0)}
    aria-label="Return to the beginning"
  >
    K<span>&amp;</span>R
  </button>

  <span>18 APRIL 2030 · BATANGAS</span>

  <div className="journey-header-actions">
    <WeddingMusic />

    <button
      type="button"
      className="header-action"
      onClick={() => goToChapter(4)}
    >
      SAVE THE DATE ↗
    </button>
  </div>
</header>

        {/* Existing exterior artwork and animated doors */}
        <section
          id="arrival"
          className="arrival-scene"
          aria-label="Arrival at the church"
          aria-hidden={!reduced && chapter !== 0}
        >
          <div className="exterior-position">
            <div className="exterior-board">
              <div className="exterior-picture" />

              <EntranceBanners ready={introReady} />

              <div className="entrance">
                <div className="entrance-light" />
                <div className="door-leaf left-door" />
                <div className="door-leaf right-door" />
              </div>
            </div>
          </div>

          <div className="arrival-shade" />

         
        </section>
        <WeddingRings />
        {/* All rooms occupy the same viewport. */}
        {rooms.map((kind, index) => (
          <section
            key={kind}
            id={kind}
            className={`journey-room room-${kind}`}
            aria-label={chapterNames[index + 1]}
            aria-hidden={!reduced && chapter !== index + 1}
            inert={!reduced && chapter !== index + 1}
            data-moment={
              kind === "garden" ? celebrationMoment : undefined
            }
            data-seating-revealed={kind === "story" ? seatingRevealed : undefined}
            data-programme-revealed={kind === "garden" ? programmeRevealed : undefined}
            data-beach-revealed={kind === "beach" ? beachRevealed : undefined}
          >
           <div className="room-art">
              {kind === "story" ? (
                <RoomBackdrop kind="seating" />
              ) : kind === "garden" ? (
                <RoomBackdrop kind="celebration" />
              ) : (
                <>
                  <LivingScenes kind={kind} />

                 
                </>
              )}
              <VenueDetails room={kind} />
            </div>

            <div className="room-readability" />
            {kind === "beach" && (
  <div className="beach-celebration-sky" aria-hidden="true">
    <div className="beach-sunset-wash" />

    <div className="beach-water-reflection">
      <span />
      <span />
      <span />
    </div>

    <svg viewBox="0 0 1000 460" className="beach-fireworks">
      {[
        { x: 170, y: 172, size: 1.13, color: "#ffd49a", delay: 0.05 },
        { x: 829, y: 150, size: 1.22, color: "#ffe4a8", delay: 0.3 },
        { x: 500, y: 110, size: 1.42, color: "#ffedbe", delay: 0.73 },
        { x: 278, y: 255, size: 0.74, color: "#f5afa4", delay: 1.16 },
        { x: 723, y: 240, size: 0.8, color: "#ffd5a2", delay: 1.16 },
      ].map(({ x, y, size, color, delay }) => (
        <g key={x} stroke={color} fill={color}>
          <path
            className="beach-firework-trail"
            d={`M${x - 12} 440Q${x + 12} ${y + 130} ${x} ${y}`}
            pathLength="1"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ animationDelay: `${delay}s` }}
          />

          <g transform={`translate(${x} ${y}) scale(${size})`}>
            <g
              className="beach-sky-burst"
              style={{ animationDelay: `${delay + 0.36}s` }}
            >
              {Array.from({ length: 18 }, (_, index) => (
                <g key={index} transform={`rotate(${index * 20})`}>
                  <path
                    d={index % 2 ? "M0-20Q-3-51 2-77" : "M0-34Q4-65 0-92"}
                    fill="none"
                    strokeWidth={index % 2 ? 1 : 1.8}
                    strokeLinecap="round"
                  />
                  <circle cy={index % 2 ? -86 : -102} r="1.8" stroke="none" />
                  <circle cx="5" cy="-52" r="1.1" stroke="none" opacity=".7" />
                </g>
              ))}
              <circle r="5" fill="#fff1ce" stroke="none" />
            </g>
          </g>
        </g>
      ))}
    </svg>
  </div>
)}

<div
  className="room-copy"
  data-vows-revealed={kind === "ceremony" ? vowsRevealed : undefined}
>
{kind === "ceremony" && (
  <>
  <div className="vows-altar-scene" aria-hidden="true">
  <div className="vows-nave-shade" />

  <div className="vows-triptych">
    {(["amber", "ivory", "rose"] as const).map((pane) => (
      <div key={pane} className={`vows-lancet vows-lancet--${pane}`}>
        <div className="vows-glass" />
      </div>
    ))}
  </div>

  <div className="vows-floor-light" />
</div>
    <p className="eyebrow vows-eyebrow">WITH FULL HEARTS</p>

    <div className="vows-inscription">
      <p className="journey-names vows-names">
        <span>Ken</span>{" "}
        <i className="vows-ampersand">&amp;</i>{" "}
        <span>Riza</span>
      </p>
      <span className="vows-inscription-light" aria-hidden="true" />
    </div>

    <div className="vows-rings">
      <WeddingRingEmblem />
    </div>

    <h2 className="journey-hashtag">#KENfoundhisRIZAn</h2>

    <span className="gold-rule vows-rule" aria-hidden="true">
      <span className="vows-rule-ink" />
    </span>

    <p className="room-date vows-date">APRIL 18, 2030 · BATANGAS</p>

    <p className="room-poem vows-poem">
      With the people we love beside us,
      <br />
      we begin our forever.
    </p>
  </>
)}

              {kind === "story" && (
                  <RoomFit>
                    <h2 className="room-accessible-title">
                      Your reserved seats
                    </h2>
                    <div className="seating-display">
                      <SeatingPanel />
                      <div className="seating-display-stand" aria-hidden="true" />
                    </div>
                  </RoomFit>
                )}

                {kind === "garden" && (
                  <RoomFit>
                    <h2 className="room-accessible-title">
                      The celebration schedule
                    </h2>
                    <CelebrationPanel
                      moment={celebrationMoment}
                      onMomentChange={setCelebrationMoment}
                    />
                  </RoomFit>
                )}

             {kind === "beach" && (
  <>
    <p className="eyebrow beach-finale-eyebrow">FOREVER, FROM HERE</p>

    <h2 className="beach-finale-title beach-celebration-title">
      Ken <em>&amp;</em> Riza
    </h2>

    <p className="beach-celebration-line">All our tomorrows.</p>

    <div className="beach-finale-divider" aria-hidden="true">
      <span />
      <i />
      <span />
    </div>

    <p className="room-date">APRIL 18, 2030 · BATANGAS</p>

    <button type="button" className="save-date-button" onClick={saveDate}>
      SAVE OUR DATE <span aria-hidden="true">↗</span>
    </button>

    <p className="venue-note">
      Church, ceremony time, and reception details to follow.
    </p>
  </>
)}
            </div>
          </section>
        ))}

       <div className="entrance-dissolve" aria-hidden="true" />

        <div className="stone-passage" aria-hidden="true">
          <div className="stone-column" />
        </div>

        <div className="floral-passage" aria-hidden="true">
          <TransitionFlowers />
        </div>

        <div className="shore-curtains" aria-hidden="true">
          <div className="shore-curtain curtain-left" />
          <div className="shore-curtain curtain-right" />
          <span className="curtain-valance" />
        </div>

        <footer className="journey-controls">
          <span className="current-chapter">
            {chapterNames[chapter]}
          </span>

          <nav aria-label="Explore the invitation">
            {chapterNames.map((name, index) => (
              <button
                key={name}
                aria-label={name}
                aria-current={chapter === index ? "step" : undefined}
                onClick={() => goToChapter(index)}
              >
                <span />
              </button>
            ))}
          </nav>

          <span className="scroll-instruction">
            {chapter === 4 ? "STAY A LITTLE LONGER" : "SCROLL TO WANDER ↓"}
          </span>
        </footer>
      </div>
    </main>
  );
}