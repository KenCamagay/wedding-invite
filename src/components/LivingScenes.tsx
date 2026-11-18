"use client";

import { useId } from "react";

export type RoomKind = "ceremony" | "story" | "garden" | "beach";

const flowers = ["#fff0d9", "#ddb0ac", "#b87985", "#f8dfc0"];

function Bouquet({
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
          d="M0 18 Q-20-20-40-26 M0 18 Q22-30 42-25 M0 18 Q-5-35 5-48"
          fill="none"
          stroke="#61755c"
          strokeWidth="4"
        />

        {[-1, 1].map((side) => (
          <g key={side}>
            <ellipse
              cx={side * 25}
              cy="-12"
              rx="10"
              ry="24"
              fill="#71876b"
              transform={`rotate(${side * 45} ${side * 25} -12)`}
            />
            <ellipse
              cx={side * 40}
              cy="4"
              rx="8"
              ry="22"
              fill="#879477"
              transform={`rotate(${side * 65} ${side * 40} 4)`}
            />
          </g>
        ))}

        {[
          [-25, -25],
          [4, -39],
          [29, -21],
          [-8, -9],
          [17, 4],
        ].map(([cx, cy], index) => (
          <g key={index}>
            {Array.from({ length: 6 }, (_, petal) => {
              const angle = (petal / 6) * Math.PI * 2;

              return (
                <ellipse
                  key={petal}
                 cx={(cx + Math.cos(angle) * 8).toFixed(3)}
                 cy={(cy + Math.sin(angle) * 8).toFixed(3)}
                  rx="9"
                  ry="7"
                  fill={flowers[index % flowers.length]}
                />
              );
            })}

            <circle cx={cx} cy={cy} r="5" fill="#d5b478" />
          </g>
        ))}
      </g>
    </g>
  );
}

function Candle({
  x,
  y,
  size = 1,
}: {
  x: number;
  y: number;
  size?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <ellipse cx="0" cy="6" rx="18" ry="5" fill="#ae8659" />
      <rect x="-7" y="-30" width="14" height="35" rx="3" fill="#fff1ce" />

      <ellipse
        className="candle-halo"
        cx="0"
        cy="-42"
        rx="24"
        ry="32"
        fill="#ffd38a"
        opacity=".15"
      />

      <path
        className="candle-flame"
        d="M0-57 C-11-42-9-32 0-31 C9-32 11-42 0-57Z"
        fill="#ffd58e"
      />

      <path
        className="candle-flame"
        d="M0-47 C-4-40-4-35 0-34 C4-35 4-40 0-47Z"
        fill="#fff8d7"
      />
    </g>
  );
}

function StainedWindow({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  const colors = [
    "#84a7b1",
    "#b791aa",
    "#d8b16f",
    "#94a98b",
    "#c69b88",
    "#8ca9a4",
  ];

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M-45 160 V0 Q0-85 45 0 V160Z"
        fill="#576c70"
        stroke="#dfcba9"
        strokeWidth="12"
      />

      {Array.from({ length: 5 }, (_, row) =>
        [-1, 1].map((side, column) => (
          <rect
            key={`${row}-${side}`}
            x={side < 0 ? -37 : 4}
            y={row * 29 + 8}
            width="33"
            height="23"
            rx="3"
            fill={colors[(row + column * 2) % colors.length]}
          />
        )),
      )}

      <circle cx="0" cy="-6" r="25" fill="#d4b77c" />
      <circle cx="0" cy="-6" r="15" fill="#a1bdba" />

      <path
        d="M0-35V155 M-37 0H37"
        stroke="#8e7856"
        strokeWidth="4"
      />

      <path
        className="glass-glimmer"
        d="M-32 145V3 Q0-52 32 3V145"
        fill="none"
        stroke="#fff3cb"
        strokeWidth="3"
        opacity=".45"
      />
    </g>
  );
}

function Chandelier({
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
      <g className="chandelier-sway">
        <path d="M0-130V0" stroke="#9e7c48" strokeWidth="3" />

        <path
          d="M-75 0 Q0 65 75 0 M-50 0 Q0 35 50 0"
          fill="none"
          stroke="#b18b4c"
          strokeWidth="6"
        />

        <ellipse cx="0" cy="20" rx="66" ry="15" fill="none" stroke="#b18b4c" strokeWidth="4" />

        {[-65, -32, 0, 32, 65].map((offset) => (
          <Candle key={offset} x={offset} y={0} size={0.65} />
        ))}

        <path d="M0 20V55" stroke="#b18b4c" strokeWidth="3" />
        <ellipse cx="0" cy="62" rx="8" ry="13" fill="#d1b676" />
      </g>
    </g>
  );
}

function Palm({
  x,
  y,
  scale = 1,
  flip = false,
}: {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path
        d="M0 0 Q-25-125 25-285"
        fill="none"
        stroke="#967451"
        strokeWidth="23"
      />
      <path
        d="M-5-8 Q-27-130 20-278"
        fill="none"
        stroke="#c09b6d"
        strokeWidth="5"
      />

      <g transform="translate(25 -285)">
        <g className="palm-crown">
          {[-1, 1].map((side) => (
            <g key={side} transform={`scale(${side} 1)`}>
              <path d="M0 0 Q60-65 145-10 Q76-22 0 0" fill="#557b60" />
              <path d="M0 0 Q90-5 145 75 Q65 24 0 0" fill="#688968" />
              <path d="M0 0 Q40 15 60 115 Q15 49 0 0" fill="#7c986c" />
              <path d="M0 0 Q28-85 88-115 Q51-48 0 0" fill="#73936d" />
            </g>
          ))}

          <circle cx="-4" cy="5" r="11" fill="#8c754d" />
          <circle cx="12" cy="9" r="10" fill="#796844" />
        </g>
      </g>
    </g>
  );
}

function Interior({
  kind,
  prefix,
}: {
  kind: "ceremony" | "story" | "garden";
  prefix: string;
}) {
  const garden = kind === "garden";

  return (
    <>
      <rect width="1600" height="1000" fill={`url(#${prefix}-wall)`} />

      {/* Ceiling and side walls */}
      <path d="M0 0H1600L1080 590H520Z" fill="#e9dbc3" />
      <path d="M0 0L520 590V1000H0Z" fill="#b7a28c" />
      <path d="M1600 0L1080 590V1000H1600Z" fill="#b7a28c" />

      {/* Repeated arches establish depth. */}
      {[0, 1, 2, 3].map((index) => {
        const inset = index * 135;
        const top = 70 + index * 110;

        return (
          <g key={index}>
            <path
              d={`M${130 + inset} 900V${top + 240}
                  Q800 ${top - 330} ${1470 - inset} ${top + 240}V900`}
              fill="none"
              stroke={index % 2 ? "#f5e6cb" : "#d8c3a5"}
              strokeWidth={28 - index * 4}
            />

            <path
              d={`M${153 + inset} 900V${top + 240}
                  Q800 ${top - 295} ${1447 - inset} ${top + 240}V900`}
              fill="none"
              stroke="#ab9270"
              strokeWidth="3"
              opacity=".5"
            />
          </g>
        );
      })}

      {/* Floor and aisle */}
      <path d="M520 590H1080L1600 1000H0Z" fill={`url(#${prefix}-floor)`} />
      <path d="M746 590H854L1130 1000H470Z" fill="#bca689" />
      <path d="M758 590H842L1095 1000H505Z" fill="#f8edda" />

      {[650, 720, 810, 920].map((y) => (
        <path
          key={y}
          d={`M0 ${y}H1600`}
          stroke="#ad987b"
          strokeWidth="2"
          opacity=".22"
        />
      ))}

      {/* Central opening connects the rooms. */}
      <path
        d="M687 590V375Q800 205 913 375V590Z"
        fill={garden ? "#d4dfc8" : "#bca37f"}
        stroke="#efdbb7"
        strokeWidth="14"
      />

      <path
        d="M710 590V380Q800 245 890 380V590Z"
        fill={`url(#${prefix}-portal)`}
      />

      {garden ? (
        <>
          <path d="M714 528Q800 460 887 530V590H714Z" fill="#6faaa7" />
          <path d="M714 550Q800 526 887 551" fill="none" stroke="#f5efd4" strokeWidth="5" />
        </>
      ) : (
        <g stroke="#c5a05d" strokeWidth="5">
          <path d="M800 400V500" />
          <path d="M770 430H830" />
        </g>
      )}

      {/* Windows */}
      <StainedWindow x={190} y={280} scale={1.35} />
      <StainedWindow x={1410} y={280} scale={1.35} />
      <StainedWindow x={415} y={370} scale={0.82} />
      <StainedWindow x={1185} y={370} scale={0.82} />

      {/* Animated light from the windows */}
      <g className="sunlight-breathe" fill="#fff0c6" opacity=".12">
        <path d="M150 180L770 1000H1030L245 180Z" />
        <path d="M1350 200L590 1000H840L1450 200Z" />
      </g>

      <Chandelier x={800} y={155} scale={1.1} />
      <Chandelier x={800} y={345} scale={0.55} />

      {kind === "ceremony" && (
        <>
          {/* Altar */}
          <rect x="695" y="554" width="210" height="55" fill="#e8d9be" />
          <path d="M680 553H920V565H680Z" fill="#fff3d9" />
          <path d="M783 565H817V610H783Z" fill="#b7838e" />
          <Bouquet x={800} y={551} scale={0.65} />

          {/* Pew rows with increasing foreground scale */}
          {[
            { y: 650, spread: 160, scale: 0.7 },
            { y: 735, spread: 235, scale: 1 },
            { y: 840, spread: 330, scale: 1.35 },
            { y: 975, spread: 450, scale: 1.8 },
          ].map((row, index) =>
            [-1, 1].map((side) => (
              <g
                key={`${index}-${side}`}
                transform={`translate(${800 + side * row.spread} ${row.y}) scale(${row.scale})`}
              >
                <path
                  d={side < 0 ? "M-220 0H0V38H-220Z" : "M0 0H220V38H0Z"}
                  fill="#78543c"
                  stroke="#ae8459"
                  strokeWidth="4"
                />

                <path
                  className="linen-sway"
                  d={side < 0
                    ? "M-180-4Q-95 90-12-4L-12 20Q-100 120-180 20Z"
                    : "M12-4Q95 90 180-4L180 20Q100 120 12 20Z"}
                  fill="#f4e6ce"
                  opacity=".93"
                />

                <Bouquet x={side * 10} y={-8} scale={0.8} />
                <Candle x={-side * 37} y={47} size={0.75} />
              </g>
            )),
          )}
        </>
      )}

      {kind === "story" && (
        <>
          {/* Empty portrait frames: ready for real memories later. */}
          {[-1, 1].map((side) => (
            <g key={side}>
              <g transform={`translate(${800 + side * 380} 530)`}>
                <rect x="-112" y="-145" width="224" height="285" rx="110" fill="#a8875a" />
                <rect x="-101" y="-134" width="202" height="263" rx="100" fill={side < 0 ? "#a9b69e" : "#c5a4a0"} />
                <rect x="-88" y="-121" width="176" height="237" rx="88" fill="none" stroke="#e7d1a8" strokeWidth="2" />

                <text
                  x="0"
                  y="20"
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  fontStyle="italic"
                  fontSize="54"
                  fill="#f8ead4"
                >
                  {side < 0 ? "K" : "R"}
                </text>
              </g>

              <Bouquet x={800 + side * 365} y={765} scale={1.6} />
              <Candle x={800 + side * 280} y={805} size={1.5} />
            </g>
          ))}
        </>
      )}

      {garden && (
        <>
          {/* Draped passage to the coast */}
          {[-1, 1].map((side) => (
            <g key={side}>
              <path
                className="linen-sway"
                d={side < 0
                  ? "M600 230Q650 400 610 700L540 900Q625 470 565 240Z"
                  : "M1000 230Q950 400 990 700L1060 900Q975 470 1035 240Z"}
                fill="#fff0dc"
                opacity=".8"
              />

              <Bouquet x={800 + side * 300} y={695} scale={2.4} />
              <Bouquet x={800 + side * 480} y={900} scale={3.2} />

              <path
                d={`M${800 + side * 500} 1000Q${800 + side * 550} 650 ${800 + side * 400} 470`}
                fill="none"
                stroke="#6f8365"
                strokeWidth="11"
              />
            </g>
          ))}
        </>
      )}

      {/* Near flowers frame the scene. */}
      <Bouquet x={95} y={990} scale={3.6} />
      <Bouquet x={1505} y={990} scale={3.6} />

      {/* Slow drifting dust, not constant confetti. */}
      <g fill="#fff3cd">
        {Array.from({ length: 14 }, (_, index) => (
          <circle
            key={index}
            className="dust-mote"
            cx={220 + ((index * 173) % 1160)}
            cy={180 + ((index * 97) % 600)}
            r={index % 3 === 0 ? 3 : 2}
            style={{ animationDelay: `${index * -0.8}s` }}
          />
        ))}
      </g>
    </>
  );
}

function Beach({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1600" height="1000" fill={`url(#${prefix}-sky)`} />

      <circle cx="1110" cy="310" r="94" fill="#ffe9bd" opacity=".6" />
      <circle cx="1110" cy="310" r="68" fill="#fff1cb" />

      <g className="cloud-drift" fill="#fff3df" opacity=".4">
        <ellipse cx="270" cy="180" rx="150" ry="23" />
        <ellipse cx="330" cy="165" rx="100" ry="29" />
        <ellipse cx="1280" cy="120" rx="150" ry="18" />
      </g>

      {/* Sea */}
      <path d="M0 440Q800 420 1600 440V800H0Z" fill={`url(#${prefix}-sea)`} />

      <path
        d="M0 455Q400 442 800 455T1600 455"
        fill="none"
        stroke="#f9e3bd"
        strokeWidth="3"
        opacity=".55"
      />

      {/* Light on the water */}
      <path
        className="water-shimmer"
        d="M1060 440L1160 440L1320 755H850Z"
        fill="#ffe5b0"
        opacity=".17"
      />

      {/* Sand */}
      <path d="M0 735Q700 665 1600 750V1000H0Z" fill={`url(#${prefix}-sand)`} />

      {/* Independent wave layers */}
      <g className="wave wave-one">
        <path
          d="M-150 650Q50 620 250 650T650 650T1050 650T1450 650T1850 650"
          fill="none"
          stroke="#eff7e9"
          strokeWidth="8"
          opacity=".75"
        />
      </g>

      <g className="wave wave-two">
        <path
          d="M-150 700Q50 668 250 700T650 700T1050 700T1450 700T1850 700"
          fill="none"
          stroke="#fff8e5"
          strokeWidth="12"
          opacity=".8"
        />
      </g>

      <g className="wave wave-three">
        <path
          d="M-150 578Q50 563 250 578T650 578T1050 578T1450 578T1850 578"
          fill="none"
          stroke="#d3ece2"
          strokeWidth="4"
          opacity=".65"
        />
      </g>

      {/* Beach ceremony arch */}
      <path
        d="M580 830V530Q800 290 1020 530V830"
        fill="none"
        stroke="#c4a47e"
        strokeWidth="15"
      />

      <path
        className="linen-sway"
        d="M585 535Q625 680 550 855L610 855Q665 655 610 510Z"
        fill="#fff3dd"
        opacity=".9"
      />

      <path
        className="linen-sway linen-second"
        d="M1015 535Q975 680 1050 855L990 855Q935 655 990 510Z"
        fill="#fff3dd"
        opacity=".9"
      />

      {[
        [595, 515],
        [640, 465],
        [700, 420],
        [770, 400],
        [850, 405],
        [925, 440],
        [990, 500],
      ].map(([x, y], index) => (
        <Bouquet key={index} x={x} y={y} scale={1.15} />
      ))}

      <Bouquet x={570} y={805} scale={2} />
      <Bouquet x={1030} y={805} scale={2} />

      {/* Aisle on the sand */}
      <path d="M730 810H870L1060 1000H540Z" fill="#fff0d8" opacity=".65" />

      <Palm x={160} y={930} scale={2} />
      <Palm x={1460} y={930} scale={1.85} flip />
      <Palm x={65} y={760} scale={1.2} />
      <Palm x={1560} y={750} scale={1.1} flip />

      <Bouquet x={180} y={990} scale={2.8} />
      <Bouquet x={1430} y={990} scale={2.8} />
    </>
  );
}

export default function LivingScenes({ kind }: { kind: RoomKind }) {
  const prefix = useId().replace(/:/g, "");

  return (
    <svg
      className="living-scene"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${prefix}-wall`} x2="0" y2="1">
          <stop stopColor="#e6d6bd" />
          <stop offset="1" stopColor="#b59c7e" />
        </linearGradient>

        <linearGradient id={`${prefix}-floor`} x2="0" y2="1">
          <stop stopColor="#cdbb9f" />
          <stop offset="1" stopColor="#e9d8b9" />
        </linearGradient>

        <linearGradient id={`${prefix}-portal`} x2="0" y2="1">
          <stop stopColor="#fff4d6" />
          <stop offset="1" stopColor="#d8c7a2" />
        </linearGradient>

        <linearGradient id={`${prefix}-sky`} x2="0" y2="1">
          <stop stopColor="#b6cfce" />
          <stop offset=".5" stopColor="#f4d3bc" />
          <stop offset="1" stopColor="#f9e3c6" />
        </linearGradient>

        <linearGradient id={`${prefix}-sea`} x2="0" y2="1">
          <stop stopColor="#5f999e" />
          <stop offset=".55" stopColor="#81b8b5" />
          <stop offset="1" stopColor="#bbd4c7" />
        </linearGradient>

        <linearGradient id={`${prefix}-sand`} x2="0" y2="1">
          <stop stopColor="#dfc6a2" />
          <stop offset="1" stopColor="#f2dfbd" />
        </linearGradient>
      </defs>

      {kind === "beach"
        ? <Beach prefix={prefix} />
        : <Interior kind={kind} prefix={prefix} />}
    </svg>
  );
}