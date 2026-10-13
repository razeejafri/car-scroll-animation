"use client";

import React, { useRef } from "react";
import { STATS } from "@/lib/constants";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import Road from "./Road";
import Car from "./Car";
import StatCard from "./StatCard";

/**
 * HeroStage – Pinned automotive scroll-animation hero stage.
 *
 * Stacking Order:
 *  1. Ambient studio background with subtle natural depth.
 *  2. Minimalist header bar.
 *  3. Asphalt highway track with centered headline & electric green reveal trail.
 *  4. Supercar driving across the road.
 *  5. 4 Staggered floating metric cards revealed sequentially one-by-one.
 *  6. Bottom scroll cue.
 */
export default function HeroStage() {
  const stageRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const greenRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    stageRef: stageRef as React.RefObject<HTMLElement | null>,
    carRef: carRef as React.RefObject<HTMLElement | null>,
    greenRef,
    ghostRef,
    cardRefs,
    scrollCueRef,
  });

  return (
    <section
      ref={stageRef}
      className="hero-stage"
      aria-label="Supercar Scroll Experience"
    >
      {/* ── Studio background vignette ── */}
      <div className="stage-studio-backdrop" aria-hidden="true" />

      {/* ── Minimalist Top Navigation ── */}
      <header className="stage-nav">
        <div className="stage-nav__brand">
          <span className="brand-logo">ITZFIZZ</span>
          <span className="brand-badge">MOTION</span>
        </div>
        <div className="stage-nav__hint">
          <span className="nav-hint-dot" />
          <span className="nav-hint-text">SCROLL DRIVEN</span>
        </div>
      </header>

      {/* ── Road Track (Asphalt + Centered Headline + Green Reveal Trail) ── */}
      <Road greenRef={greenRef} ghostRef={ghostRef} />

      {/* ── Supercar (with realistic chassis shadow) ── */}
      <Car ref={carRef} />

      {/* ── 4 Floating Stat Cards (Reveal One-By-One as Car Passes) ── */}
      {STATS.map((stat, i) => (
        <div
          key={stat.id}
          className={`stat-card-wrapper stat-card-wrapper--${stat.side}`}
          style={{ left: `${stat.xRatio * 100}%` }}
        >
          <StatCard
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            stat={stat}
          />
        </div>
      ))}

      {/* ── Subtle Scroll Cue ── */}
      <div ref={scrollCueRef} className="stage-scroll-cue" aria-hidden="true">
        <div className="scroll-cue-pill">
          <span className="scroll-cue-text">SCROLL TO DRIVE</span>
          <span className="scroll-cue-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
