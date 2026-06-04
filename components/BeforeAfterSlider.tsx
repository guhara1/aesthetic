"use client";

import { useCallback, useRef, useState, useEffect } from "react";

// Drag-to-reveal before/after slider.
// - Desktop: click and drag the handle, or click anywhere on the image
// - Mobile: touch and drag the handle horizontally
// - Keyboard: focus the slider and press Left/Right
// No auto-play.
export function BeforeAfterSlider({
  before,
  after,
  alt,
  beforeLabel = "Before",
  afterLabel = "After",
  width = 1800,
  height = 1200,
}: {
  before: string;
  after: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
  width?: number;
  height?: number;
}) {
  const [percent, setPercent] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPercent(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    updateFromX(e.clientX);
  };

  useEffect(() => {
    const onMove = (ev: MouseEvent) => {
      if (!draggingRef.current) return;
      updateFromX(ev.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [updateFromX]);

  const onTouchStart = (e: React.TouchEvent) => {
    draggingRef.current = true;
    updateFromX(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    updateFromX(e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPercent((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPercent((p) => Math.min(100, p + 4));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPercent(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPercent(100);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      role="slider"
      aria-label={alt}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      tabIndex={0}
      className="relative block w-full select-none overflow-hidden bg-ink touch-pan-y focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      style={{
        aspectRatio: `${width} / ${height}`,
        cursor: "ew-resize",
      }}
    >
      {/* After (bottom layer, full width) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Before (top layer, clipped to left portion) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={before}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      />

      {/* Labels — top corners */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-ink/65 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase text-ivory backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-ink/65 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase text-ivory backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
        style={{ left: `calc(${percent}% - 1px)` }}
      />

      {/* Handle */}
      <div
        className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_22px_-4px_rgba(0,0,0,0.55)]"
        style={{ left: `${percent}%` }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 7l-5 5 5 5M15 7l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
