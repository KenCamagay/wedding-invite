"use client";

import { useState, type FormEvent } from "react";

type RoomName = "seating" | "celebration";

function Flowers({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="flower-sway">
        <path
          d="M0 40Q-35-35-65-30M0 40Q35-45 70-35M0 40V-60"
          fill="none"
          stroke="#667c5e"
          strokeWidth="5"
        />

        <ellipse
          cx="-35"
          cy="0"
          rx="13"
          ry="38"
          fill="#849578"
          transform="rotate(-45 -35 0)"
        />

        <ellipse
          cx="38"
          cy="-5"
          rx="13"
          ry="40"
          fill="#647e60"
          transform="rotate(45 38 -5)"
        />

        {[
          [-48, -30, "#ead6c5"],
          [-18, -55, "#f8e8d1"],
          [18, -32, "#d8a4aa"],
          [52, -35, "#f6e4c9"],
          [0, 0, "#b97887"],
        ].map(([xPos, yPos, color], index) => (
          <g key={index} transform={`translate(${xPos} ${yPos})`}>
            <circle r="20" fill={String(color)} />
            <circle cx="-8" cy="-4" r="11" fill={String(color)} />
            <circle cx="9" cy="-4" r="11" fill={String(color)} />
            <circle cy="8" r="11" fill={String(color)} />
            <circle r="7" fill="#d6b57b" />
            <path
              d="M-10-3Q0-12 10-3M-8 7Q0 0 8 7"
              fill="none"
              stroke="#fff4dd"
              strokeWidth="1.5"
              opacity=".5"
            />
          </g>
        ))}
      </g>
    </g>
  );
}

function ReservationSalon() {
  return (
    <svg
      className="living-scene reservation-salon"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="salon-wall" x2="0" y2="1">
          <stop stopColor="#3f5149" />
          <stop offset="1" stopColor="#243b34" />
        </linearGradient>

        <linearGradient id="salon-niche" x2="0" y2="1">
          <stop stopColor="#778171" />
          <stop offset=".4" stopColor="#4e6255" />
          <stop offset="1" stopColor="#354c40" />
        </linearGradient>

        <linearGradient id="salon-floor" x2="0" y2="1">
          <stop stopColor="#726b58" />
          <stop offset="1" stopColor="#b5a58a" />
        </linearGradient>

        <linearGradient id="salon-marble" x2="0" y2="1">
          <stop stopColor="#f1e7d4" />
          <stop offset="1" stopColor="#bcae96" />
        </linearGradient>

        <linearGradient id="salon-brass" x2="1" y2="0">
          <stop stopColor="#8b7042" />
          <stop offset=".45" stopColor="#e2c58f" />
          <stop offset="1" stopColor="#a18655" />
        </linearGradient>

        <radialGradient id="salon-light">
          <stop stopColor="#ffe6b1" stopOpacity=".3" />
          <stop offset="1" stopColor="#ffe6b1" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Deep olive walls */}
      <rect width="1600" height="1000" fill="url(#salon-wall)" />

      {/* Ceiling */}
      <path
        d="M0 0H1600L1400 155H200Z"
        fill="#b4aa91"
      />
      <path
        d="M50 35H1550L1385 140H215Z"
        fill="#d8ceb6"
        stroke="#8f7d5c"
        strokeWidth="3"
      />

      {/* Decorative cornice */}
      <path
        d="M0 147H1600M0 160H1600"
        stroke="#d5bb87"
        strokeWidth="5"
        opacity=".8"
      />

      {/* Wall paneling */}
      {[90, 400, 800, 1200, 1510].map((x) => (
        <g key={x}>
          <path
            d={`M${x} 170V820`}
            stroke="#192f29"
            strokeWidth="15"
          />
          <path
            d={`M${x + 7} 170V820`}
            stroke="#b39a68"
            strokeWidth="2"
            opacity=".5"
          />
        </g>
      ))}

      {/* Left architectural panel behind the invitation form */}
      <rect
        x="285"
        y="230"
        width="420"
        height="500"
        rx="6"
        fill="#344b40"
        stroke="#8b825f"
        strokeWidth="2"
      />
      <rect
        x="301"
        y="246"
        width="388"
        height="468"
        rx="4"
        fill="none"
        stroke="#9d936f"
        strokeWidth="1"
        opacity=".45"
      />

      {/* Right arched seating-display alcove */}
      <path
        d="M855 805V375Q1065 40 1275 375V805Z"
        fill="#1e342d"
        stroke="url(#salon-brass)"
        strokeWidth="10"
      />

      <path
        d="M875 805V380Q1065 80 1255 380V805Z"
        fill="url(#salon-niche)"
        stroke="#bca475"
        strokeWidth="2"
      />

      {/* A thin illuminated inner arch */}
      <path
        d="M894 775V387Q1065 120 1236 387V775"
        fill="none"
        stroke="#f0d39c"
        strokeWidth="2"
        opacity=".5"
      />

      <ellipse
        className="salon-light-breathe"
        cx="1065"
        cy="390"
        rx="260"
        ry="330"
        fill="url(#salon-light)"
      />

      {/* Brass wall sconces */}
      {[195, 1405].map((x) => (
        <g key={x}>
          <ellipse
            className="salon-light-breathe"
            cx={x}
            cy="405"
            rx="125"
            ry="180"
            fill="url(#salon-light)"
          />

          <rect
            x={x - 12}
            y="375"
            width="24"
            height="145"
            rx="12"
            fill="url(#salon-brass)"
          />

          <path
            d={`M${x - 37} 400L${x - 24} 315H${x + 24}L${x + 37} 400Z`}
            fill="#f3e1bb"
          />

          <ellipse
            cx={x}
            cy="400"
            rx="37"
            ry="8"
            fill="#ddc291"
          />
        </g>
      ))}

      {/* Pendant chandelier */}
      <g className="salon-pendant">
        <path
          d="M800 0V140"
          stroke="#b99b65"
          strokeWidth="4"
        />

        <ellipse
          cx="800"
          cy="166"
          rx="130"
          ry="24"
          fill="none"
          stroke="url(#salon-brass)"
          strokeWidth="8"
        />

        {[700, 750, 800, 850, 900].map((x, index) => (
          <g key={x}>
            <path
              d={`M${x} 165V${205 + (index % 2) * 22}`}
              stroke="#c3a873"
              strokeWidth="2"
            />
            <ellipse
              cx={x}
              cy={218 + (index % 2) * 22}
              rx="10"
              ry="19"
              fill="#ffedc7"
              opacity=".9"
            />
          </g>
        ))}
      </g>

      {/* Floor */}
      <path
        d="M0 805H1600V1000H0Z"
        fill="url(#salon-floor)"
      />

      <path
        d="M0 815H1600"
        stroke="#cfb984"
        strokeWidth="4"
      />

      {[100, 400, 700, 1000, 1300, 1600].map((x) => (
        <path
          key={x}
          d={`M800 805L${x} 1000`}
          stroke="#d5c9ae"
          strokeWidth="2"
          opacity=".24"
        />
      ))}

      <path
        d="M0 900H1600M0 970H1600"
        stroke="#e3d5b8"
        strokeWidth="2"
        opacity=".15"
      />

      {/* Low marble concierge console */}
      <rect
        x="420"
        y="832"
        width="760"
        height="110"
        rx="3"
        fill="#3b4e42"
      />

      {Array.from({ length: 28 }, (_, index) => (
        <path
          key={index}
          d={`M${435 + index * 27} 844V932`}
          stroke="#9e916c"
          strokeWidth="3"
          opacity=".55"
        />
      ))}

      <path
        d="M395 817H1205V843H395Z"
        fill="url(#salon-marble)"
        stroke="#eee1c7"
        strokeWidth="2"
      />

      <path
        d="M490 821Q620 839 730 823T1040 829"
        fill="none"
        stroke="#a69d87"
        strokeWidth="1.5"
        opacity=".55"
      />

      <path
        d="M460 943V975M1140 943V975"
        stroke="url(#salon-brass)"
        strokeWidth="10"
      />

      {/* Upholstered salon chairs */}
      {[-1, 1].map((side) => (
        <g
          key={side}
          transform={`translate(${800 + side * 645} 825)`}
        >
          <path
            d="M-90 40V-70Q0-150 90-70V40Z"
            fill="#a88f7c"
            stroke="#d0b79a"
            strokeWidth="5"
          />

          <path
            d="M-66 25V-62Q0-118 66-62V25Z"
            fill="#bea28d"
          />

          <ellipse
            cy="40"
            rx="96"
            ry="32"
            fill="#d0b39a"
          />

          <path
            d="M-72 60L-82 135M72 60L82 135"
            stroke="#9d8050"
            strokeWidth="9"
          />
        </g>
      ))}

      {/* Fresh arrangements on either end of the console */}
      <path
        d="M445 817L430 755H490L475 817Z"
        fill="url(#salon-brass)"
      />
      <Flowers x={460} y={751} scale={1.05} />

      <path
        d="M1125 817L1110 755H1170L1155 817Z"
        fill="url(#salon-brass)"
      />
      <Flowers x={1140} y={751} scale={1.05} />

      {/* Foreground greenery */}
      <Flowers x={20} y={1000} scale={3} />
      <Flowers x={1580} y={1000} scale={3} />
    </svg>
  );
}


function CelebrationPavilion() {
  return (
    <svg
      className="living-scene celebration-pavilion"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pavilion-sky" x2="0" y2="1">
          <stop stopColor="#aebfbd" />
          <stop offset=".55" stopColor="#e3c4ae" />
          <stop offset="1" stopColor="#f2ddbd" />
        </linearGradient>

        <linearGradient id="pavilion-floor" x2="0" y2="1">
          <stop stopColor="#b5a48a" />
          <stop offset="1" stopColor="#e1cdae" />
        </linearGradient>

        <linearGradient id="pavilion-brass" x2="1" y2="0">
          <stop stopColor="#8c7149" />
          <stop offset=".5" stopColor="#dfc18b" />
          <stop offset="1" stopColor="#9b8053" />
        </linearGradient>

       <radialGradient id="pavilion-entrance-glow">
        <stop stopColor="#ffe0a0" stopOpacity=".85" />
        <stop offset=".48" stopColor="#ffc477" stopOpacity=".26" />
        <stop offset="1" stopColor="#ffb564" stopOpacity="0" />
      </radialGradient>
      </defs>

      {/* Sunset beyond the pavilion */}
      <rect width="1600" height="1000" fill="url(#pavilion-sky)" />

      <circle
        cx="1240"
        cy="430"
        r="76"
        fill="#fff0c8"
        opacity=".75"
      />

      {/* Distant coast */}
      <path
        d="M0 575Q350 540 800 575T1600 575V800H0Z"
        fill="#87aaa5"
      />

      <path
        className="wave wave-three"
        d="M-100 635Q100 615 300 635T700 635T1100 635T1700 635"
        fill="none"
        stroke="#eadfc5"
        strokeWidth="4"
        opacity=".6"
      />

      {/* Garden foliage */}
      <path
        d="M0 680Q70 475 160 590Q220 450 320 610
           Q380 540 460 700V850H0Z"
        fill="#667e65"
      />

      <path
        d="M1600 680Q1510 480 1430 575Q1350 445 1280 610
           Q1190 545 1135 705V850H1600Z"
        fill="#718367"
      />

      {/* Pavilion deck */}
      <path
        d="M0 760H1600V1000H0Z"
        fill="url(#pavilion-floor)"
      />

      {[150, 420, 680, 920, 1180, 1450].map((x) => (
        <path
          key={x}
          d={`M800 760L${x} 1000`}
          stroke="#98866b"
          strokeWidth="2"
          opacity=".25"
        />
      ))}

      <path
        d="M0 855H1600M0 955H1600"
        stroke="#f0dec2"
        strokeWidth="2"
        opacity=".35"
      />

      {/* Roof and structural beams */}
      <path
        d="M0 0H1600L1400 180H200Z"
        fill="#e9ddc7"
      />

      <path
        d="M0 45H1600M160 155H1440"
        stroke="#a68b61"
        strokeWidth="13"
      />

      <path
        d="M350 0L500 180M800 0V180M1250 0L1100 180"
        stroke="#c4ac84"
        strokeWidth="8"
      />

      {/* Side columns */}
      {[180, 1420].map((x) => (
        <g key={x}>
          <rect
            x={x - 26}
            y="145"
            width="52"
            height="690"
            fill="#eadcc2"
          />

          <rect
            x={x - 42}
            y="140"
            width="84"
            height="25"
            fill="#c6ad82"
          />

          <rect
            x={x - 40}
            y="820"
            width="80"
            height="35"
            fill="#b99e74"
          />

          <path
            d={`M${x - 13} 175V805`}
            stroke="#fff1d7"
            strokeWidth="4"
            opacity=".7"
          />
        </g>
      ))}

      {/* Loose fabric at the sides; centre stays clear. */}
      <path
        className="linen-sway"
        d="M210 165Q330 385 230 820L315 820
           Q385 390 260 165Z"
        fill="#fff1dc"
        opacity=".72"
      />

      <path
        className="linen-sway linen-second"
        d="M1390 165Q1270 385 1370 820L1285 820
           Q1215 390 1340 165Z"
        fill="#fff1dc"
        opacity=".72"
      />

      {/* Lanterns frame the programme */}
      {[
        { x: 380, y: 330, drop: 120 },
        { x: 1220, y: 330, drop: 120 },
        { x: 570, y: 245, drop: 65 },
        { x: 1030, y: 245, drop: 65 },
      ].map(({ x, y, drop }, index) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <g
            className="pavilion-lantern"
            style={{ animationDelay: `${index * -1.7}s` }}
          >
            <path
              d={`M0 ${-drop}V-48`}
              stroke="#92754d"
              strokeWidth="2"
            />

            <ellipse
              className="salon-light-breathe"
              rx="100"
              ry="125"
              fill="url(#pavilion-lantern-glow)"
            />
            <ellipse
              className="pavilion-entrance-flare"
              rx="145"
              ry="156"
              fill="url(#pavilion-entrance-glow)"
              style={{ animationDelay: `${[0, 0.48, 0.16, 0.32][index]}s` }}
            />
            <path
              d="M-32-38L0-58L32-38V43H-32Z"
              fill="#f4dba8"
              fillOpacity=".65"
              stroke="url(#pavilion-brass)"
              strokeWidth="4"
            />

            <path
              d="M-32-38H32M0-38V43M-32 43H32"
              stroke="#af8e58"
              strokeWidth="3"
            />

            <rect
              x="-6"
              y="0"
              width="12"
              height="31"
              rx="2"
              fill="#fff2ce"
            />

            <path
              className="candle-flame"
              d="M0-19Q-10-5 0 0Q10-5 0-19Z"
              fill="#fff1bd"
            />
          </g>
        </g>
      ))}

      {/* Reception tables at the edges */}
      {[-1, 1].map((side) => (
        <g key={side} transform={`translate(${800 + side * 610} 855)`}>
          <path
            d="M-150 0Q0 50 150 0V140
               Q80 120 0 145Q-80 120-150 140Z"
            fill="#e6d7c1"
          />

          <ellipse
            rx="150"
            ry="37"
            fill="#fff0db"
            stroke="#d4bea0"
            strokeWidth="2"
          />

          <Flowers x={0} y={-8} scale={1.2} />

          <ellipse cx="-75" cy="8" rx="23" ry="7" fill="#c8b180" />
          <ellipse cx="75" cy="8" rx="23" ry="7" fill="#c8b180" />
        </g>
      ))}

      <Flowers x={80} y={1000} scale={3.1} />
      <Flowers x={1520} y={1000} scale={3.1} />
    </svg>
  );
}


/* Both rooms are vector artwork, not background images. */
export function RoomBackdrop({ kind }: { kind: RoomName }) {
  return kind === "seating"
    ? <ReservationSalon />
    : <CelebrationPavilion />;
}

/* Extra detail laid over the existing ceremony artwork. */
export function InteriorDetails() {
  return (
    <svg
      className="interior-detail-layer"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Carved capitals */}
      {[130, 265, 400, 1470, 1335, 1200].map((x, index) => {
        const depth = index % 3;
        const y = 320 + depth * 110;

        return (
          <g key={x}>
            <path
              d={`M${x - 22} ${y}H${x + 22}
                  L${x + 34} ${y - 18}H${x - 34}Z`}
              fill="#d3b58c"
            />
            <path
              d={`M${x - 28} ${y - 22}H${x + 28}`}
              stroke="#fff0d2"
              strokeWidth="7"
            />
            <path
              d={`M${x - 15} ${y - 14}Q${x} ${y + 9}
                  ${x + 15} ${y - 14}`}
              fill="none"
              stroke="#a98a60"
              strokeWidth="3"
            />
          </g>
        );
      })}

      {/* Colored floor reflections */}
      <g className="sunlight-breathe" opacity=".12">
        <path d="M180 730L350 730L650 1000H480Z" fill="#a3c2c6" />
        <path d="M270 730L350 730L650 1000H570Z" fill="#cb9eaf" />
        <path d="M1270 740L1400 740L1080 1000H920Z" fill="#e9c984" />
      </g>

      {/* Subtle ornamental ceiling lines */}
      <path
        d="M800 0V300M450 0Q800 150 1150 0"
        fill="none"
        stroke="#c8ad83"
        strokeWidth="3"
        opacity=".55"
      />

      <Flowers x={150} y={1000} scale={3.2} />
      <Flowers x={1450} y={1000} scale={3.2} />
    </svg>
  );
}

const tables = [
  { number: 1, x: 112, y: 113 },
  { number: 2, x: 328, y: 113 },
  { number: 3, x: 112, y: 188 },
  { number: 4, x: 328, y: 188 },
  { number: 5, x: 112, y: 263 },
  { number: 6, x: 328, y: 263 },
];

export function SeatingPanel() {
  const [code, setCode] = useState("");
  const [found, setFound] = useState(false);
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (code.trim().toUpperCase() === "DEMO") {
      setFound(true);
      setMessage("");
    } else {
      setFound(false);
      setMessage(
        "The real guest list is not connected yet. Enter DEMO to preview the experience.",
      );
    }
  }

  return (
  <div className="seating-panel">
    <div className="seating-cover-stage" aria-hidden="true">
  <div className="seating-cover">
    <span className="seating-cover-title">Your Place</span>
    <span className="seating-cover-date">18 APRIL 2030 · BATANGAS</span>
    <div className="seating-cover-crest">
      <svg viewBox="0 0 180 150" fill="none">
        <ellipse cx="90" cy="75" rx="43" ry="53" />
        <ellipse cx="90" cy="75" rx="38" ry="48" />

        {["left", "right"].map((side) => (
          <g
            key={side}
            transform={side === "right" ? "translate(180 0) scale(-1 1)" : undefined}
          >
            <path d="M82 133C37 121 20 87 29 38" />
            <path d="M37 91Q16 88 15 69Q31 72 37 91Z" />
            <path d="M30 72Q14 62 19 48Q30 53 30 72Z" />
            <path d="M46 105Q52 88 41 79Q37 93 46 105Z" />
            <path d="M58 119Q36 121 28 108Q47 105 58 119Z" />
          </g>
        ))}

        <path d="M90 5L94 12L90 19L86 12Z" fill="currentColor" />
      </svg>
      <span className="seating-cover-monogram">K &amp; R</span>
    </div>

    <span className="seating-cover-title">Your Place</span>
  </div>
</div>

    <div className="seating-form">
      <span className="preview-badge">DESIGN PREVIEW</span>

        <h3>A place saved<br /><em>just for you.</em></h3>

        <p>
          Your personal invitation will reveal your table and reserved seats.
        </p>

        <form onSubmit={submit}>
          <label htmlFor="invitation-code">INVITATION CODE</label>

          <div className="invitation-input-row">
            <input
              id="invitation-code"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setFound(false);
                setMessage("");
                }}
              placeholder="Try DEMO"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={32}
              aria-describedby="seating-status"
            />

            <button type="submit" aria-label="Look up invitation">
              ↗
            </button>
          </div>
        </form>

        <div id="seating-status" aria-live="polite">
          {message && <p className="lookup-message">{message}</p>}

          {found && (
            <div className="table-result invitation-reveal">
                <span>SAMPLE INVITATION · FICTIONAL GUESTS</span>

                <p className="guest-inscription">Alex &amp; Sam</p>

                <strong>Table 05</strong>

                <p>
                Two places, saved for you.
                <br />
                Follow the gold line from the entrance.
                </p>
            </div>
            )}
        </div>

        <p className="seating-disclaimer">
          Sample layout. Actual assignments will be added later.
        </p>
      </div>

      <figure className="seating-map seating-salon-plan">
  <p className="seating-plan-heading">Your place at the table</p>

  <svg
    viewBox="0 0 440 340"
    role="img"
    aria-label={
      found
        ? "Sample reception plan. The gold route leads to table five."
        : "Sample reception plan with six tables and a central aisle."
    }
  >
    {/* The room outline and central aisle. */}
    <path
      d="M18 301V106Q18 18 107 18H333Q422 18 422 106V301Q422 322 401 322H39Q18 322 18 301Z"
      fill="#243d34"
      stroke="#d2aa68"
      strokeWidth="1.5"
    />
    <path
      d="M27 298V106Q27 27 107 27H333Q413 27 413 106V298Q413 313 398 313H42Q27 313 27 298Z"
      fill="none"
      stroke="#c6a774"
      strokeWidth="1"
    />
    <rect className="seating-engraved-aisle" x="199" y="75" width="42" height="232" rx="21" fill="#d9bb8c" />
    <path
      d="M220 80V303"
      fill="none"
      stroke="#a88149"
      strokeWidth="1"
      strokeDasharray="2 6"
      opacity=".6"
    />

    <rect className="seating-engraved-head-table" x="153" y="33" width="134" height="30" rx="15" fill="#355043" />
    <text x="220" y="52" textAnchor="middle" className="seating-plan-couple">
      SWEETHEART TABLE
    </text>

    {/* Draw one route behind the tables. */}
    {found && (
      <g aria-hidden="true">
        <path
          d="M220 302V276Q220 263 206 263H143"
          fill="none"
          stroke="#fff8e6"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          className="guest-route-line"
          d="M220 302V276Q220 263 206 263H143"
          pathLength="1"
          fill="none"
          stroke="#91601f"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    )}

    {tables.map(({ number, x, y }) => {
      const selected = found && number === 5;
      
      return (
        <g
          key={number}
          className={selected ? "seating-table-selected" : "seating-table"}
          transform={`translate(${x} ${y})`}
        >
          {Array.from({ length: 6 }, (_, index) => (
            <rect
              key={index}
              x="-5"
              y="-35"
              width="10"
              height="8"
              rx="2.5"
              transform={`rotate(${index * 60})`}
              fill={selected ? "#526d52" : "#bc9c65"}
            />
          ))}

          <circle
            r="24"
            fill={selected ? "#35543f" : "#fff4de"}
            stroke={selected ? "#a57939" : "#b2905b"}
            strokeWidth={selected ? 2 : 1}
          />
          <circle
            r="18.5"
            fill="none"
            stroke={selected ? "#e1c480" : "#d8c092"}
          />
          <text
            y="1"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={selected ? "#fff5d9" : "#614521"}
            className="seating-plan-number"
          >
            {String(number).padStart(2, "0")}
          </text>
        </g>
      );
    })}

    <text x="220" y="332" textAnchor="middle" className="seating-plan-entry">
      ENTRANCE
    </text>
  </svg>

  <figcaption>
    {found
      ? "Alex & Sam · Table 05 · sample invitation"
      : "Sample reception layout"}
  </figcaption>
</figure>
    </div>
  );
}

export function CelebrationPanel({
  moment,
  onMomentChange,
}: {
  moment: "ceremony" | "reception";
  onMomentChange: (moment: "ceremony" | "reception") => void;
}) {
  return (
    <div className="wedding-programme" data-moment={moment}>
      <div className="programme-cord cord-left" aria-hidden="true" />
      <div className="programme-cord cord-right" aria-hidden="true" />

      <div className="programme-rail" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="programme-linen">
        <div className="programme-inner">
          <p className="programme-kicker">KEN & RIZA</p>

          <h3>
            The order<br />
            <em>of our day.</em>
          </h3>

          <p className="programme-date">
            18 APRIL 2030 · BATANGAS
          </p>

          <div className="programme-flourish" aria-hidden="true">
            <span />
            ✧
            <span />
          </div>

          <ol className="programme-timeline">
            <li>
              <span className="programme-marker" aria-hidden="true">
                01
              </span>

              <div>
                <p className="programme-time">TIME TO BE ANNOUNCED</p>
                <h4>
                <button
                    type="button"
                    className="programme-moment-button"
                    aria-pressed={moment === "ceremony"}
                    onClick={() => onMomentChange("ceremony")}
                >
                    The ceremony
                    <span aria-hidden="true">↗</span>
                </button>
                </h4>
                <p className="programme-description">
                  The beginning of forever.
                </p>
                <p className="programme-venue">
                  Church and directions to follow.
                </p>
              </div>
            </li>

            <li>
              <span className="programme-marker" aria-hidden="true">
                02
              </span>

              <div>
                <p className="programme-time">TIME TO BE ANNOUNCED</p>
                <h4>
                <button
                    type="button"
                    className="programme-moment-button"
                    aria-pressed={moment === "reception"}
                    onClick={() => onMomentChange("reception")}
                >
                    The reception
                    <span aria-hidden="true">↗</span>
                </button>
                </h4>
                <p className="programme-description">
                  A celebration with our favorite people.
                </p>
                <p className="programme-venue">
                  Reception venue and schedule to follow.
                </p>
              </div>
            </li>
          </ol>

          <details className="programme-attire">
            <summary>
              <span>A note on attire</span>
              <span className="attire-symbol" aria-hidden="true">+</span>
            </summary>

            <p>
              Dress code and the final color palette will be shared
              once confirmed.
            </p>
          </details>

          <p className="programme-signature" aria-live="polite">
            {moment === "ceremony"
                ? "An afternoon glow"
                : "A little closer to sunset"}
            </p>

            <p className="programme-lighting-note">
            Select an event to preview its atmosphere.
            Actual event times are still to be confirmed.
            </p>
        </div>
      </div>
    </div>
  );
}

export function TransitionFlowers() {
  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="1600" height="1000" fill="#7f8b70" />

      {[
        [100, 300, 5],
        [500, 150, 6],
        [950, 350, 7],
        [1450, 180, 6],
        [200, 850, 7],
        [700, 850, 6],
        [1300, 900, 8],
      ].map(([x, y, scale], index) => (
        <Flowers key={index} x={x} y={y} scale={scale} />
      ))}
    </svg>
  );
}