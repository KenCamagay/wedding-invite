"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export default function RoomFit({
  children,
}: {
  children: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;

    if (!frame || !content) return;

    let animationFrame = 0;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const measure = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        if (reduced.matches) {
          setScale(1);
          return;
        }

        const available = frame.clientHeight;
        const needed = content.offsetHeight;

        if (available && needed) {
          setScale(Math.min(1, available / needed));
        }
      });
    };

    const observer = new ResizeObserver(measure);

    observer.observe(frame);
    observer.observe(content);
    reduced.addEventListener("change", measure);
    measure();

    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", measure);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={frameRef} className="room-fit">
      <div
        ref={contentRef}
        className="room-fit-content"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}