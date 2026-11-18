"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
const SESSION_KEY = "ken-riza-invitation-opened";

function WrittenNames() {
  const strokes = [
    // K
    "M44 107C48 80 54 44 62 23C67 10 73 13 69 27C65 41 50 53 36 55",
    "M112 29C96 38 73 58 54 72C73 60 85 63 88 78C91 96 98 111 112 102",

    // e
    "M110 88C138 87 146 66 133 66C117 66 108 95 120 103C132 112 149 98 158 85",

    // n
    "M157 72L149 105C159 84 174 64 181 71C187 78 169 102 180 106C189 110 201 97 211 85",

    // Ampersand
    "M285 42C304 29 301 15 289 20C273 27 273 48 286 65C302 84 319 102 331 104",
    "M287 61C259 72 251 95 266 105C282 117 313 94 322 70",

    // R
    "M363 108C369 80 376 43 386 22",
    "M360 46C374 23 415 15 425 34C438 57 400 73 377 69C397 70 403 86 410 98C418 111 428 107 438 97",

    // i
    "M450 73C447 84 440 103 448 106C456 109 466 96 472 87",
    "M455 53L456 51",

    // z
    "M472 78C484 68 496 68 506 73L477 103C488 98 503 98 512 103C520 107 527 97 533 89",

    // a and finishing flourish
    "M561 76C551 60 529 77 530 96C531 114 552 104 562 78L555 101C553 111 567 107 577 96C589 83 603 92 613 86",
  ];

  return (
  <svg
    className="iv-written-names"
    viewBox="0 0 640 140"
    width="640"
    height="140"
    aria-hidden="true"
    style={{
      display: "block",
      width: "100%",
      height: "100%",
      overflow: "visible",
    }}
  >
    {strokes.map((d, index) => (
      <path
        key={index}
        d={d}
        data-writing-stroke
        style={{
          animation: "none",
          fill: "none",
          stroke: "#896236",
          strokeWidth: 3.8,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeDashoffset: 0,
          opacity: 0,
        }}
      />
    ))}

    <path
      data-writing-underline
      d="M108 126Q310 112 530 125"
      style={{
        animation: "none",
        fill: "none",
        stroke: "#b39762",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        strokeDasharray: "none",
        strokeDashoffset: 0,
        opacity: 0,
      }}
    />
  </svg>
);
}

export default function InvitationIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const restoreScrollRef = useRef<(() => void) | null>(null);
  const finishedRef = useRef(false);
  const [opening, setOpening] = useState(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete();
    try {
      sessionStorage.setItem(SESSION_KEY, "yes");
    } catch {
      // Storage is optional.
    }

    dialogRef.current?.close();
    restoreScrollRef.current?.();
    restoreScrollRef.current = null;

    window.scrollTo({ top: 0, behavior: "instant" });

    document
      .querySelector<HTMLButtonElement>(".journey-monogram")
      ?.focus({ preventScroll: true });
}, [onComplete]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "yes") {
        onComplete();
        return;
      }
    } catch {
      // Continue without session storage.
    }

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;

    restoreScrollRef.current = () => {
      document.body.style.overflow = previousOverflow;
    };

    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      dialog.close();
      restoreScrollRef.current?.();
      restoreScrollRef.current = null;
    };
 }, [onComplete]);

  useEffect(() => {
    if (!opening) return;

    const timer = window.setTimeout(finish, 8000);
    return () => window.clearTimeout(timer);
  }, [opening, finish]);
  useEffect(() => {
  const dialog = dialogRef.current;
  if (!opening || !dialog) return;

  const context = gsap.context(() => {
    const paths = Array.from(
      dialog.querySelectorAll<SVGPathElement>(
        "[data-writing-stroke]",
      ),
    );

    const underline =
      dialog.querySelector<SVGPathElement>(
        "[data-writing-underline]",
      );

    /*
     * Disable the old CSS writing and exit animations.
     * This timeline now owns those elements.
     *
     * The flap and letter-rise animations remain unchanged.
     */
    gsap.set(
      [
        ".iv-written-kicker",
        ".iv-written-message",
        ".iv-written-rule",
        ".iv-written-date",
        ".iv-envelope",
        ".iv-fabric",
        ".iv-ribbon",
        ".iv-backdrop",
        ".iv-door-guide",
      ].join(", "),
      { animation: "none" },
    );

    gsap.set(
      ".iv-written-kicker, .iv-written-rule, .iv-written-date",
      { opacity: 0 },
    );

    gsap.set(".iv-written-message", {
      opacity: 0,
      clipPath: "inset(0 100% 0 0)",
    });

    gsap.set(".iv-envelope", {
      opacity: 1,
      scale: 1,
    });

    gsap.set(".iv-backdrop", { opacity: 1 });
    gsap.set(".iv-fabric", { opacity: 0.7 });
    gsap.set(".iv-ribbon", { opacity: 0.7 });
    gsap.set(".iv-door-guide", { opacity: 0 });

    const writing = gsap.timeline();

    // The letter finishes coming out around 1.75 seconds.
    writing.to(
      ".iv-written-kicker",
      { opacity: 1, duration: 0.4 },
      1.8,
    );

    // Measure each real path instead of relying on normalized lengths.
    paths.forEach((path, index) => {
      const length = path.getTotalLength();

      gsap.set(path, {
        opacity: 1,
        strokeDasharray: `${length} ${length}`,
        strokeDashoffset: length,
      });

      writing.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: "power1.inOut",
        },
        2.05 + index * 0.14,
      );
    });

    if (underline) {
      const length = underline.getTotalLength();

      gsap.set(underline, {
        opacity: 1,
        strokeDasharray: `${length} ${length}`,
        strokeDashoffset: length,
      });

      writing.to(
        underline,
        {
          strokeDashoffset: 0,
          duration: 0.65,
          ease: "power1.inOut",
        },
        3.95,
      );
    }

    writing.set(
      ".iv-written-message",
      { opacity: 1 },
      4.25,
    );

    writing.to(
      ".iv-written-message",
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.15,
        ease: "none",
      },
      4.25,
    );

    writing.to(
      ".iv-written-rule",
      { opacity: 1, duration: 0.4 },
      5.25,
    );

    writing.to(
      ".iv-written-date",
      { opacity: 1, duration: 0.65 },
      5.4,
    );

    // Hold the completed invitation before revealing the church.
    writing.to(
      ".iv-envelope",
      {
        scale: 1.12,
        duration: 1.1,
        ease: "power1.in",
      },
      6.1,
    );

    writing.to(
      ".iv-envelope",
      { opacity: 0, duration: 0.5 },
      6.7,
    );

    writing.to(
      ".iv-fabric, .iv-ribbon",
      { opacity: 0, duration: 0.7 },
      6.1,
    );

    writing.to(
      ".iv-backdrop",
      { opacity: 0, duration: 1 },
      6.55,
    );

    writing.to(
      ".iv-door-guide",
      { opacity: 0.8, duration: 0.5 },
      6.5,
    );

    writing.to(
      ".iv-door-guide",
      { opacity: 0, duration: 0.8 },
      7,
    );
  }, dialog);

  return () => context.revert();
}, [opening]);
  function openInvitation() {
    if (opening) return;
     window.dispatchEvent(new Event("wedding:invitation-open"));
    // Prepare the real church behind the intro before revealing it.
    window.scrollTo({ top: 0, behavior: "instant" });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    setOpening(true);
  }

  return (
    <dialog
      ref={dialogRef}
      className={`invitation-intro ${opening ? "is-opening" : ""}`}
      aria-labelledby="invitation-intro-title"
      onCancel={(event) => {
        event.preventDefault();
        finish();
      }}
    >
      <div className="iv-backdrop" aria-hidden="true" />

      <button className="iv-skip" type="button" onClick={finish}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>

      <h1 id="invitation-intro-title" className="iv-sr-only">
        Ken and Riza’s wedding invitation
      </h1>

      <div className="iv-composition">
        <header className="iv-preface">
          <div className="iv-monogram" aria-hidden="true">
            K <i>&amp;</i> R
          </div>

          <p>Some moments are meant to be shared.</p>
        </header>

        <div className="iv-stage">
          <div className="iv-fabric" aria-hidden="true" />

          <svg
            className="iv-ribbon"
            viewBox="0 0 600 400"
            aria-hidden="true"
          >
            <path
              d="M40 350Q180 285 106 195T205 25"
              fill="none"
              stroke="#b4bea1"
              strokeWidth="20"
            />
            <path
              d="M40 350Q180 285 106 195T205 25"
              fill="none"
              stroke="#e0e4cd"
              strokeWidth="3"
              opacity=".45"
            />
          </svg>

          <div className="iv-envelope">
            <div className="iv-envelope-back" aria-hidden="true" />

            <article className="iv-letter" aria-hidden={!opening}>
              <svg
                className="iv-letter-arch"
                viewBox="0 0 300 260"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M18 250V110Q150-75 282 110V250"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M25 250V113Q150-61 275 113V250"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth=".5"
                />
              </svg>

              <span className="iv-letter-kicker iv-written-kicker">
                TOGETHER WITH OUR FAMILIES
              </span>

              <h2
                className="iv-written-heading"
                style={{
                  display: "block",
                  position: "relative",
                  flex: "0 0 auto",
                  width: "100%",
                  height: "clamp(40px, 8vw, 62px)",
                  margin: "6px 0",
                  padding: 0,
                }}
              >
                <span className="iv-sr-only">Ken &amp; Riza</span>
                <WrittenNames />
              </h2>

              <p className="iv-written-message">
                We invite you into our next chapter.
              </p>

              <span
                className="iv-letter-rule iv-written-rule"
                aria-hidden="true"
              />

              <p className="iv-letter-date iv-written-date">
                18 APRIL 2030
                <span>BATANGAS</span>
              </p>
            </article>

            <div className="iv-pocket" aria-hidden="true" />

            <div className="iv-address" aria-hidden="true">
              <p>To our favorite people</p>
              <span>WITH LOVE, KEN &amp; RIZA</span>
            </div>

            <div className="iv-flap" aria-hidden="true" />

            <button
              type="button"
              className="iv-seal"
              onClick={openInvitation}
              disabled={opening}
              aria-label="Break the seal and open your invitation"
              autoFocus
            >
              <span aria-hidden="true">K &amp; R</span>
            </button>
          </div>
        </div>

        <div className="iv-instruction">
          <button
            type="button"
            onClick={openInvitation}
            disabled={opening}
          >
            {opening ? "With love, for you" : "Break the seal"}
          </button>

          <p>18 April 2030 · Batangas</p>
        </div>
      </div>

      {/* Echo the card's arch over the real church doorway.
          This uses the same framing as your exterior artwork. */}
      <div className="iv-door-guide" aria-hidden="true">
        <div className="iv-door-board">
          <svg viewBox="0 0 200 300" preserveAspectRatio="none">
            <path
              d="M5 295V100Q100-85 195 100V295"
              fill="none"
              stroke="#f8e6b8"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <p className="iv-sr-only" role="status">
        {opening
          ? "Opening your invitation. The church journey will begin shortly."
          : ""}
      </p>
    </dialog>
  );
}