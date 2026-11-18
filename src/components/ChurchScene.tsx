"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

type Vec3 = [number, number, number];
type Progress = RefObject<number>;

const palette = {
  ivory: "#eee3cf",
  stone: "#cdbb9b",
  trim: "#fff0d7",
  bronze: "#967344",
  wood: "#674a36",
  sage: "#748169",
  leaves: "#52684c",
  blush: "#dcb8ae",
  cream: "#fff1da",
};

function Box({
  position,
  size,
  color = palette.ivory,
}: {
  position: Vec3;
  size: Vec3;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}

function Arch({
  position,
  radius,
  thickness = 0.14,
  color = palette.trim,
}: {
  position: Vec3;
  radius: number;
  thickness?: number;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <torusGeometry args={[radius, thickness, 8, 48, Math.PI]} />
      <meshStandardMaterial color={color} roughness={0.75} />
    </mesh>
  );
}

/* A clustered arrangement: greenery, ivory flowers, and blush flowers. */
function Bouquet({
  position,
  scale = 1,
}: {
  position: Vec3;
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {[-1, 1].map((side) => (
        <mesh
          key={`leaf-${side}`}
          position={[side * 0.2, -0.05, 0]}
          rotation={[0, 0, side * 0.6]}
          scale={[0.2, 0.48, 0.17]}
        >
          <sphereGeometry args={[1, 7, 6]} />
          <meshStandardMaterial color={palette.leaves} />
        </mesh>
      ))}

      {Array.from({ length: 5 }, (_, index) => {
        const angle = (index / 5) * Math.PI * 2;

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * 0.22,
              Math.sin(angle) * 0.2 + 0.12,
              index % 2 ? 0.12 : -0.02,
            ]}
            scale={[1, 0.8, 1]}
          >
            <icosahedronGeometry args={[0.19, 1]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? palette.blush : palette.cream}
              roughness={0.95}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Candle({
  position,
  height = 0.35,
}: {
  position: Vec3;
  height?: number;
}) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, height, 10]} />
        <meshStandardMaterial color="#fff0cf" />
      </mesh>

      <mesh
        position={[0, height + 0.045, 0]}
        scale={[0.025, 0.065, 0.025]}
      >
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial color="#ffd38a" />
      </mesh>

      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 12]} />
        <meshStandardMaterial
          color={palette.bronze}
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

function Cypress({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <Box
        position={[0, 0.65, 0]}
        size={[0.15, 1.3, 0.15]}
        color="#72634b"
      />

      <mesh position={[0, 2.2, 0]} scale={[0.7, 2.1, 0.7]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color={palette.leaves} roughness={1} />
      </mesh>

      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.55, 0.43, 0.4, 12]} />
        <meshStandardMaterial color={palette.stone} />
      </mesh>
    </group>
  );
}

function Pediment() {
  const shape = useMemo(() => {
    const triangle = new THREE.Shape();
    triangle.moveTo(-6.1, 0);
    triangle.lineTo(0, 2.4);
    triangle.lineTo(6.1, 0);
    triangle.closePath();
    return triangle;
  }, []);

  return (
    <mesh position={[0, 7.6, 4.65]}>
      <extrudeGeometry
        args={[
          shape,
          {
            depth: 0.7,
            bevelEnabled: true,
            bevelSize: 0.06,
            bevelThickness: 0.06,
            bevelSegments: 1,
            steps: 1,
          },
        ]}
      />
      <meshStandardMaterial color={palette.ivory} />
    </mesh>
  );
}

function RoseWindow() {
  return (
    <group position={[0, 6.1, 5.45]}>
      <mesh>
        <circleGeometry args={[0.86, 48]} />
        <meshStandardMaterial
          color="#7d9990"
          emissive="#bda36f"
          emissiveIntensity={0.15}
        />
      </mesh>

      <mesh position={[0, 0, 0.04]}>
        <torusGeometry args={[0.89, 0.1, 8, 48]} />
        <meshStandardMaterial color={palette.trim} />
      </mesh>

      <mesh position={[0, 0, 0.06]}>
        <torusGeometry args={[0.34, 0.035, 6, 32]} />
        <meshStandardMaterial color={palette.bronze} />
      </mesh>

      {Array.from({ length: 8 }, (_, index) => (
        <group key={index} rotation={[0, 0, (index * Math.PI) / 4]}>
          <Box
            position={[0, 0.56, 0.06]}
            size={[0.035, 0.52, 0.04]}
            color={palette.bronze}
          />
        </group>
      ))}
    </group>
  );
}

function Door({
  side,
  progress,
}: {
  side: number;
  progress: Progress;
}) {
  const hinge = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!hinge.current) return;

    const opening = THREE.MathUtils.smoothstep(
      progress.current,
      0.3,
      0.65,
    );

    hinge.current.rotation.y = -side * opening * 1.48;
  });

  return (
    <group ref={hinge} position={[side * 1.4, 0, 5.12]}>
      <Box
        position={[-side * 0.7, 1.7, 0]}
        size={[1.39, 3.4, 0.2]}
        color={palette.wood}
      />

      {[0.65, 1.7, 2.75].map((height) => (
        <group key={height}>
          <Box
            position={[-side * 0.7, height, 0.13]}
            size={[1.13, 0.82, 0.06]}
            color={palette.bronze}
          />
          <Box
            position={[-side * 0.7, height, 0.18]}
            size={[0.98, 0.67, 0.04]}
            color="#72523a"
          />
        </group>
      ))}

      <mesh
        position={[-side * 1.16, 1.65, 0.25]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.085, 0.019, 6, 20]} />
        <meshStandardMaterial
          color="#d7b66e"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

function Exterior({ progress }: { progress: Progress }) {
  return (
    <>
      {/* Garden ground */}
      <Box
        position={[0, -0.24, 0]}
        size={[100, 0.35, 100]}
        color="#a1aa8b"
      />

      {/* Limestone path with a narrow border */}
      <Box
        position={[0, -0.025, 18]}
        size={[4.6, 0.08, 28]}
        color="#b7a98e"
      />
      <Box
        position={[0, 0.025, 18]}
        size={[4.25, 0.045, 28]}
        color="#e0d4bf"
      />

      {/* Path joints */}
      {[9, 12, 15, 18, 21, 24, 27].map((z) => (
        <Box
          key={z}
          position={[0, 0.052, z]}
          size={[4.25, 0.008, 0.025]}
          color="#c6bba5"
        />
      ))}

      {/* Entrance steps */}
      {[0, 1, 2].map((step) => (
        <Box
          key={step}
          position={[0, -0.08 + step * 0.045, 6.6 - step * 0.35]}
          size={[12 - step * 0.5, 0.09, 2 - step * 0.4]}
          color={palette.stone}
        />
      ))}

      {[-1, 1].map((side) => (
        <group key={side}>
          <Box
            position={[side * 3.7, 3.8, 5]}
            size={[4.6, 7.6, 0.65]}
          />

          {/* Architectural trim */}
          {[2, 5.2].map((x) => (
            <group key={x}>
              <Box
                position={[side * x, 3.7, 5.45]}
                size={[0.32, 7.4, 0.35]}
                color={palette.trim}
              />
              <Box
                position={[side * x, 0.3, 5.45]}
                size={[0.62, 0.6, 0.55]}
                color={palette.stone}
              />
              <Box
                position={[side * x, 7.25, 5.45]}
                size={[0.6, 0.25, 0.55]}
                color={palette.stone}
              />
            </group>
          ))}

          {/* Tall facade windows */}
          <Box
            position={[side * 3.65, 3.8, 5.35]}
            size={[1.05, 2.2, 0.05]}
            color="#87988a"
          />
          <Arch
            position={[side * 3.65, 4.9, 5.45]}
            radius={0.6}
          />
          <Box
            position={[side * 3.65, 3.8, 5.43]}
            size={[0.055, 2.2, 0.05]}
            color={palette.bronze}
          />

          {/* Bell tower */}
          <Box
            position={[side * 6.6, 4.8, 4.35]}
            size={[2.3, 9.6, 2.8]}
          />
          <Box
            position={[side * 6.6, 9.6, 4.35]}
            size={[2.65, 0.3, 3.1]}
            color={palette.trim}
          />
          <Box
            position={[side * 6.6, 8.1, 5.77]}
            size={[0.85, 1.6, 0.05]}
            color="#555f51"
          />
          <Arch
            position={[side * 6.6, 8.9, 5.85]}
            radius={0.52}
          />

          <mesh
            position={[side * 6.6, 10.65, 4.35]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <coneGeometry args={[1.95, 1.9, 4]} />
            <meshStandardMaterial color="#7b826b" />
          </mesh>

          <Box
            position={[side * 6.6, 12, 4.35]}
            size={[0.09, 0.9, 0.09]}
            color={palette.bronze}
          />
          <Box
            position={[side * 6.6, 12.2, 4.35]}
            size={[0.55, 0.09, 0.09]}
            color={palette.bronze}
          />

          {/* Garden rhythm along the approach */}
          {[10, 17, 24].map((z) => (
            <Cypress key={z} position={[side * 6.2, 0, z]} />
          ))}

          {[9, 14, 19].map((z) => (
            <group key={`flowers-${z}`}>
              <Box
                position={[side * 3.15, 0.12, z]}
                size={[0.85, 0.3, 1.2]}
                color={palette.stone}
              />
              <Bouquet position={[side * 3.15, 0.55, z]} scale={1.4} />
            </group>
          ))}

          {/* Entrance arrangements */}
          <Box
            position={[side * 2, 0.55, 6.1]}
            size={[0.55, 1.1, 0.55]}
            color={palette.trim}
          />
          <Bouquet position={[side * 2, 1.35, 6.1]} scale={1.8} />
        </group>
      ))}

      <Box position={[0, 5.5, 5]} size={[2.8, 4.2, 0.65]} />

      <Pediment />

      <Box
        position={[0, 7.6, 5.3]}
        size={[12.5, 0.24, 0.85]}
        color={palette.trim}
      />

      <RoseWindow />

      <Arch position={[0, 3.4, 5.5]} radius={1.54} thickness={0.18} />

      <mesh position={[0, 3.4, 5.36]}>
        <circleGeometry args={[1.36, 40, 0, Math.PI]} />
        <meshStandardMaterial color="#b7a06d" />
      </mesh>

      <Door side={-1} progress={progress} />
      <Door side={1} progress={progress} />
    </>
  );
}

function Chandelier({ z }: { z: number }) {
  return (
    <group position={[0, 6.7, z]}>
      <Box
        position={[0, 0.9, 0]}
        size={[0.035, 1.8, 0.035]}
        color={palette.bronze}
      />

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.035, 6, 40]} />
        <meshStandardMaterial
          color={palette.bronze}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {Array.from({ length: 6 }, (_, index) => {
        const angle = (index / 6) * Math.PI * 2;

        return (
          <Candle
            key={index}
            position={[
              Math.cos(angle) * 0.85,
              0,
              Math.sin(angle) * 0.85,
            ]}
            height={0.2}
          />
        );
      })}
    </group>
  );
}

function Interior() {
  return (
    <>
      <Box
        position={[0, -0.02, -8]}
        size={[11, 0.1, 27]}
        color="#d4c6ad"
      />

      {/* Ivory aisle runner, edged in a soft gold tone */}
      <Box
        position={[0, 0.045, -6]}
        size={[2.25, 0.018, 23]}
        color="#bca77e"
      />
      <Box
        position={[0, 0.06, -6]}
        size={[2.1, 0.012, 23]}
        color="#fff0d8"
      />

      {/* Quiet ceiling to keep the interior enclosed */}
      <Box
        position={[0, 9.15, -8]}
        size={[11, 0.25, 27]}
        color="#e3d3b6"
      />

      {[-1, 1].map((side) => (
        <group key={side}>
          <Box
            position={[side * 5.5, 4.5, -8]}
            size={[0.4, 9, 27]}
            color="#e6d8bf"
          />

          {[1, -3, -7, -11, -15].map((z) => (
            <group key={z}>
              <mesh position={[side * 4.65, 3.5, z]}>
                <cylinderGeometry args={[0.22, 0.32, 7, 12]} />
                <meshStandardMaterial color={palette.trim} />
              </mesh>

              <Box
                position={[side * 4.65, 0.18, z]}
                size={[0.7, 0.36, 0.7]}
                color={palette.stone}
              />
              <Box
                position={[side * 4.65, 6.9, z]}
                size={[0.65, 0.23, 0.65]}
                color={palette.stone}
              />

              {/* Inset luminous window panels */}
              <mesh
                position={[side * 5.27, 4.3, z - 1.5]}
                rotation={[0, -side * Math.PI / 2, 0]}
              >
                <planeGeometry args={[1.3, 3.4]} />
                <meshStandardMaterial
                  color="#c5ccab"
                  emissive="#dfc38c"
                  emissiveIntensity={0.45}
                />
              </mesh>

              {/* Pew */}
              <Box
                position={[side * 3.1, 0.75, z - 0.9]}
                size={[2.9, 0.16, 0.85]}
                color={palette.wood}
              />
              <Box
                position={[side * 3.1, 1.1, z - 0.58]}
                size={[2.9, 0.85, 0.13]}
                color="#79593e"
              />

              {/* Linen drape and aisle-end flowers */}
              <Box
                position={[side * 1.7, 0.85, z - 0.62]}
                size={[0.24, 1.2, 0.15]}
                color="#fff0dc"
              />
              <Bouquet
                position={[side * 1.7, 1.46, z - 0.58]}
                scale={0.85}
              />

              <Candle
                position={[side * 1.36, 0.08, z - 1.6]}
                height={0.3}
              />
            </group>
          ))}
        </group>
      ))}

      {[1, -3, -7, -11, -15].map((z) => (
        <Arch
          key={z}
          position={[0, 4.5, z]}
          radius={4.65}
          thickness={0.16}
        />
      ))}

      <Chandelier z={-3} />
      <Chandelier z={-11} />

      {/* Only a few real lights; candle flames use emissive materials. */}
      <pointLight
        position={[0, 6, -3]}
        intensity={35}
        distance={13}
        color="#ffdfad"
      />
      <pointLight
        position={[0, 6, -12]}
        intensity={45}
        distance={15}
        color="#ffe2b8"
      />

      {/* Altar wall and raised platform */}
      <Box
        position={[0, 4.5, -21]}
        size={[11, 9, 0.4]}
        color="#e9dcc4"
      />
      <Box
        position={[0, 0.13, -18.2]}
        size={[7, 0.26, 4]}
        color={palette.stone}
      />
      <Box
        position={[0, 1, -18.6]}
        size={[3, 1.5, 1]}
        color={palette.ivory}
      />
      <Box
        position={[0, 1.8, -18.6]}
        size={[3.35, 0.12, 1.25]}
        color="#fff3de"
      />

      {/* Cross */}
      <Box
        position={[0, 4.5, -20.7]}
        size={[0.13, 2.8, 0.1]}
        color={palette.bronze}
      />
      <Box
        position={[0, 5, -20.7]}
        size={[1.6, 0.13, 0.1]}
        color={palette.bronze}
      />

      {/* Floral altar arch */}
      <Arch
        position={[0, 2.9, -19.4]}
        radius={2.55}
        thickness={0.055}
        color={palette.bronze}
      />

      {[-1, 1].map((side) => (
        <Box
          key={side}
          position={[side * 2.55, 1.45, -19.4]}
          size={[0.07, 2.9, 0.07]}
          color={palette.bronze}
        />
      ))}

      {Array.from({ length: 11 }, (_, index) => {
        const angle = (index / 10) * Math.PI;

        return (
          <Bouquet
            key={index}
            position={[
              Math.cos(angle) * 2.55,
              2.9 + Math.sin(angle) * 2.55,
              -19.35,
            ]}
            scale={1.05}
          />
        );
      })}

      <Bouquet position={[-2.55, 2.1, -19.35]} scale={1.4} />
      <Bouquet position={[2.55, 2.1, -19.35]} scale={1.4} />
      <Bouquet position={[0, 1.95, -18.3]} scale={1.35} />

      <Candle position={[-1.15, 1.86, -18.5]} height={0.4} />
      <Candle position={[1.15, 1.86, -18.5]} height={0.4} />

      <pointLight
        position={[0, 4, -17]}
        intensity={35}
        distance={12}
        color="#ffdba5"
      />
    </>
  );
}

function FloweringTree({
  position,
  color = "#d69da9",
}: {
  position: Vec3;
  color?: string;
}) {
  return (
    <group position={position}>
      <Box
        position={[0, 1.4, 0]}
        size={[0.22, 2.8, 0.22]}
        color="#74614e"
      />

      {/* Asymmetric clusters make the canopy feel less mechanical. */}
      {[
        [-0.8, 2.8, 0],
        [0.65, 3.1, 0.15],
        [0, 3.8, -0.2],
        [-0.3, 3.2, 0.65],
        [0.5, 3.6, -0.65],
      ].map((point, index) => (
        <mesh
          key={index}
          position={point as Vec3}
          scale={[1.05, 0.85, 0.95]}
        >
          <icosahedronGeometry args={[0.95, 2]} />
          <meshStandardMaterial
            color={index === 3 ? "#b87689" : color}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

function GardenBed({
  position,
}: {
  position: Vec3;
}) {
  return (
    <group position={position}>
      <Box
        position={[0, 0.12, 0]}
        size={[2.8, 0.25, 1.8]}
        color="#ac9b7f"
      />

      <Box
        position={[0, 0.27, 0]}
        size={[2.55, 0.12, 1.55]}
        color="#65764e"
      />

      {[-0.85, 0, 0.85].map((x, index) => (
        <group key={x}>
          <Bouquet
            position={[x, 0.62, index % 2 ? 0.2 : -0.15]}
            scale={1.2}
          />

          {/* Lavender-like flower spikes */}
          <mesh position={[x + 0.2, 0.72, -0.45]}>
            <cylinderGeometry args={[0.055, 0.08, 0.65, 6]} />
            <meshStandardMaterial color="#9b85ad" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Fountain() {
  return (
    <group position={[-11, 0, 14]}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[2, 2.15, 0.5, 40]} />
        <meshStandardMaterial color="#b7a78e" />
      </mesh>

      <mesh
        position={[0, 0.52, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[1.8, 48]} />
        <meshStandardMaterial
          color="#77aaa8"
          metalness={0.3}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.16, 10, 48]} />
        <meshStandardMaterial color="#e2d2b7" />
      </mesh>

      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.18, 0.35, 1.1, 16]} />
        <meshStandardMaterial color="#c6b395" />
      </mesh>

      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.85, 0.55, 0.22, 32]} />
        <meshStandardMaterial color="#e2d2b7" />
      </mesh>

      {/* A stylized central water jet */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.035, 0.08, 0.65, 10]} />
        <meshStandardMaterial
          color="#b5e1dc"
          transparent
          opacity={0.7}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

function Surroundings() {
  return (
    <>
      {/* Layered landscape behind the church */}
      {[
        { position: [-27, 0, -43], scale: [24, 10, 17], color: "#8d9f88" },
        { position: [0, -1, -55], scale: [28, 15, 19], color: "#9aab97" },
        { position: [29, 0, -46], scale: [25, 12, 18], color: "#82977e" },
      ].map((hill, index) => (
        <mesh
          key={index}
          position={hill.position as Vec3}
          scale={hill.scale as Vec3}
        >
          <sphereGeometry args={[1, 24, 12]} />
          <meshStandardMaterial color={hill.color} roughness={1} />
        </mesh>
      ))}

      {/* Trees around both sides, including behind the church */}
      <FloweringTree position={[-10, 0, 5]} color="#dcb2bd" />
      <FloweringTree position={[10, 0, 8]} color="#dba0ad" />
      <FloweringTree position={[-12, 0, -9]} color="#cfa5ba" />
      <FloweringTree position={[12, 0, -12]} color="#d9b1bd" />
      <FloweringTree position={[11, 0, 21]} color="#e3c1bd" />

      <GardenBed position={[-5, 0, 8]} />
      <GardenBed position={[5, 0, 8]} />
      <GardenBed position={[-9, 0, 19]} />
      <GardenBed position={[9, 0, 16]} />

      <Fountain />

      {/* Low garden walls give the surroundings structure. */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Box
            position={[side * 15, 0.45, 1]}
            size={[0.45, 0.9, 36]}
            color="#c2b296"
          />
          <Box
            position={[side * 15, 0.95, 1]}
            size={[0.65, 0.12, 36]}
            color="#e1d1b5"
          />

          {[-12, -4, 4, 12].map((z) => (
            <Cypress key={z} position={[side * 13.5, 0, z]} />
          ))}
        </group>
      ))}
    </>
  );
}

/*
 * Local coordinates:
 * Window faces forward along +Z.
 * Rotate its group to place it against the side walls.
 */
function StainedGlass({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
}) {
  const glassColors = [
    "#779baf", // muted blue
    "#b58093", // dusty rose
    "#d4b16d", // amber
    "#8ea889", // sage
    "#a397b6", // lavender
    "#739f9b", // teal
  ];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Box
        position={[0, 0, -0.04]}
        size={[1.55, 3.4, 0.08]}
        color="#655c4b"
      />

      {Array.from({ length: 6 }, (_, row) =>
        [-1, 1].map((side, column) => (
          <mesh
            key={`${row}-${side}`}
            position={[
              side * 0.36,
              -1.38 + row * 0.55,
              0.015,
            ]}
          >
            <planeGeometry args={[0.65, 0.48]} />
            <meshStandardMaterial
              color={glassColors[(row + column * 2) % glassColors.length]}
              emissive={glassColors[(row + column * 2) % glassColors.length]}
              emissiveIntensity={0.65}
              roughness={0.3}
            />
          </mesh>
        )),
      )}

      {/* Colored semicircular top */}
      {Array.from({ length: 6 }, (_, index) => (
        <mesh key={`fan-${index}`} position={[0, 1.7, 0.015]}>
          <circleGeometry
            args={[
              0.72,
              10,
              (index * Math.PI) / 6 + 0.025,
              Math.PI / 6 - 0.05,
            ]}
          />
          <meshStandardMaterial
            color={glassColors[index]}
            emissive={glassColors[index]}
            emissiveIntensity={0.65}
          />
        </mesh>
      ))}

      <Arch position={[0, 1.7, 0.05]} radius={0.79} thickness={0.09} />

      {[-1, 1].map((side) => (
        <Box
          key={side}
          position={[side * 0.8, 0, 0.05]}
          size={[0.1, 3.4, 0.12]}
          color={palette.trim}
        />
      ))}
    </group>
  );
}

function WeddingDetails() {
  return (
    <>
      {/* Replace the visual of the plain side windows with colored glass. */}
      {[-1, 1].map((side) =>
        [1, -3, -7, -11, -15].map((z) => (
          <StainedGlass
            key={`${side}-${z}`}
            position={[side * 5.23, 4.3, z - 1.5]}
            rotation={[0, (-side * Math.PI) / 2, 0]}
            scale={0.88}
          />
        )),
      )}

      {/* Color at the back of the church, framing the altar. */}
      <StainedGlass position={[-3.65, 4.4, -20.72]} scale={1.1} />
      <StainedGlass position={[3.65, 4.4, -20.72]} scale={1.1} />

      {/* Burgundy altar runner */}
      <Box
        position={[0, 1.875, -18.6]}
        size={[0.7, 0.025, 1.26]}
        color="#936370"
      />
      <Box
        position={[0, 1.23, -17.96]}
        size={[0.7, 1.3, 0.025]}
        color="#936370"
      />

      {/* Tall floral arrangements beside the altar */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Box
            position={[side * 3.15, 0.9, -17.5]}
            size={[0.45, 1.55, 0.45]}
            color={palette.bronze}
          />

          <Bouquet
            position={[side * 3.15, 1.85, -17.5]}
            scale={2}
          />

          <Bouquet
            position={[side * 2.3, 0.65, -16.7]}
            scale={1.4}
          />

          <Candle
            position={[side * 2.5, 0.28, -16.4]}
            height={0.65}
          />
          <Candle
            position={[side * 2.8, 0.28, -16.65]}
            height={0.42}
          />

          {/* Rose-colored ribbons on selected aisle pews */}
          {[1, -7, -15].map((z) => (
            <group key={z}>
              <Box
                position={[side * 1.69, 0.95, z - 0.5]}
                size={[0.1, 0.85, 0.035]}
                color="#c48f9d"
              />

              <mesh
                position={[side * 1.69, 1.25, z - 0.46]}
                scale={[0.24, 0.11, 0.07]}
              >
                <sphereGeometry args={[1, 10, 6]} />
                <meshStandardMaterial color="#c48f9d" />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Petals sit beside the runner instead of cluttering its center. */}
      {Array.from({ length: 42 }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const spread = Math.sin(index * 2.39) * 0.22;
        const z = 3 - (index / 42) * 19;

        return (
          <mesh
            key={`petal-${index}`}
            position={[side * (1.05 + spread), 0.085, z]}
            rotation={[
              -Math.PI / 2,
              0,
              index * 1.73,
            ]}
            scale={[0.07, 0.12, 1]}
          >
            <circleGeometry args={[1, 7]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? "#f6e6cf" : "#d3a0aa"}
              side={THREE.DoubleSide}
              roughness={1}
            />
          </mesh>
        );
      })}
    </>
  );
}

function World({ progress }: { progress: Progress }) {
  useFrame(({ camera, size }) => {
    const p = progress.current;
    const startZ = size.width < 700 ? 37 : 29;

    let z: number;

    if (p < 0.3) {
      // Establish the building, then approach.
      z = THREE.MathUtils.lerp(
        startZ,
        12,
        THREE.MathUtils.smoothstep(p, 0, 0.3),
      );
    } else if (p < 0.63) {
      // Slow approach while the doors open.
      z = THREE.MathUtils.lerp(
        12,
        7,
        THREE.MathUtils.smoothstep(p, 0.3, 0.63),
      );
    } else if (p < 0.78) {
      // Cross the threshold under the white-light transition.
      z = THREE.MathUtils.lerp(
        7,
        1,
        THREE.MathUtils.smoothstep(p, 0.63, 0.78),
      );
    } else {
      // Glide down the wedding aisle.
      z = THREE.MathUtils.lerp(
        1,
        -7,
        THREE.MathUtils.smoothstep(p, 0.78, 1),
      );
    }

    const lowering = THREE.MathUtils.smoothstep(p, 0, 0.63);

    camera.position.set(
      Math.sin(p * Math.PI * 2) * 0.12,
      THREE.MathUtils.lerp(4.2, 2.35, lowering),
      z,
    );

    camera.lookAt(
      0,
      THREE.MathUtils.lerp(4.8, 3.25, lowering),
      -18,
    );
  });

  return (
    <>
      {/* Soft blue sky contrasts with the warm church stone. */}
<color attach="background" args={["#c5d6db"]} />
<fog attach="fog" args={["#c5d6db", 55, 115]} />

<hemisphereLight
  args={["#fff0db", "#7d9277", 1.35]}
/>

{/* Warm late-afternoon sunlight */}
<directionalLight
  position={[-14, 20, 15]}
  intensity={2.3}
  color="#ffdfb2"
/>

{/* Gentle cool fill preserves detail on the opposite side. */}
<directionalLight
  position={[14, 10, -5]}
  intensity={0.65}
  color="#c7dbe8"
/>

      <Surroundings />
    <Exterior progress={progress} />
    <Interior />
    <WeddingDetails />
    </>
  );
}

export default function ChurchScene({
  progress,
}: {
  progress: Progress;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{
        position: [0, 4.2, 29],
        fov: 46,
        near: 0.1,
        far: 110,
      }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
    >
      <World progress={progress} />
    </Canvas>
  );
}