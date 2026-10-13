"use client";

import React from "react";
import { HEADLINE } from "@/lib/constants";

type RoadProps = {
  greenRef: React.RefObject<HTMLDivElement | null>;
  ghostRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * Road – Sleek dark asphalt highway with centered typography.
 *
 * Layers:
 *  1. Deep charcoal asphalt track with center road dashes and hairline borders.
 *  2. Ghost headline – faint asphalt imprint of "WELCOME ITZFIZZ" (load animation target).
 *  3. Green reveal layer – electric lime trail unmasked by the car via clip-path,
 *     bearing the bold black "WELCOME ITZFIZZ" headline, 100% visible on screen.
 */
export default function Road({ greenRef, ghostRef }: RoadProps) {
  const letters = HEADLINE.split("");

  return (
    <div className="road-track" aria-label="Highway Track">
      {/* ── Top hairline border ── */}
      <div className="road-edge-line road-edge-line--top" />

      {/* ── Center road lane dashes ── */}
      <div className="road-lane-dashes" aria-hidden="true" />

      {/* ── Ghost headline (dark asphalt imprint, aria-hidden) ── */}
      <div
        ref={ghostRef}
        className="road-headline-container road-ghost-headline"
        aria-hidden="true"
      >
        <p className="road-headline-text road-headline-text--ghost">
          {letters.map((char, i) => (
            <span key={i} className="ghost-letter">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>

      {/* ── Green reveal layer (clip-path driven by GSAP) ── */}
      <div
        ref={greenRef}
        className="road-green-trail"
        style={{
          clipPath: "inset(0 100% 0 0)",
        }}
      >
        {/* Real high-contrast bold headline inside the green trail */}
        <div className="road-headline-container">
          <p className="road-headline-text road-headline-text--real">
            {HEADLINE}
          </p>
        </div>
      </div>

      {/* ── Bottom hairline border ── */}
      <div className="road-edge-line road-edge-line--bottom" />
    </div>
  );
}
