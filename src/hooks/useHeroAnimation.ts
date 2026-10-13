"use client";

/**
 * useHeroAnimation – Single source of truth for all GSAP animation logic.
 *
 * Implements:
 *  • ScrollTrigger pinned timeline over SCROLL_LENGTH
 *  • Single proxy `p` [0 → 1] driving:
 *      1. Car x-position via quickSetter (0 → vw)
 *      2. Electric green trail clip-path reveal (paint-only, no reflow)
 *      3. Sequential ONE-BY-ONE StatCard reveals as car passes each card
 *      4. Scroll cue fade-out on initial scroll
 *  • Smooth load animation sequence:
 *      - Road scales in vertically (scaleY: 0 → 1)
 *      - Ghost letters stagger in gently
 *      - Supercar fades in
 *      - Navigation and scroll cue appear
 *  • Responsive breakpoints and prefers-reduced-motion fallback via gsap.matchMedia.
 */

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import {
  CAR_EDGE_RATIO,
  CARD_REVEAL_SPAN,
  SCROLL_LENGTH,
  STATS,
} from "@/lib/constants";

// Register plugins once
gsap.registerPlugin(useGSAP, ScrollTrigger);

export type HeroAnimationRefs = {
  stageRef: React.RefObject<HTMLElement | null>;
  carRef: React.RefObject<HTMLElement | null>;
  greenRef: React.RefObject<HTMLDivElement | null>;
  ghostRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  scrollCueRef?: React.RefObject<HTMLDivElement | null>;
};

export function useHeroAnimation({
  stageRef,
  carRef,
  greenRef,
  ghostRef,
  cardRefs,
  scrollCueRef,
}: HeroAnimationRefs): void {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };

          const stage = stageRef.current;
          const car = carRef.current;
          const green = greenRef.current;
          const ghost = ghostRef.current;
          const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
          const scrollCue = scrollCueRef?.current;

          if (!stage || !car || !green) return;

          // ── Reduced-motion fallback ─────────────────────────────────────
          if (reduced) {
            green.style.clipPath = "inset(0 0 0 0)";
            gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
            gsap.set(car, { x: 0, opacity: 1 });
            if (scrollCue) scrollCue.style.opacity = "0";
            return;
          }

          // ── Cached measurements (updated in onRefresh) ──────────────────
          let vw = 0;
          let carW = 0;
          let edgeOffset = 0;
          let thresholds: number[] = [];

          const measure = () => {
            vw = window.innerWidth;
            carW = car.offsetWidth;
            edgeOffset = carW * CAR_EDGE_RATIO;

            // Sequential thresholds: calculate the exact scroll progress `p`
            // when the center of the supercar reaches each card's x position.
            // This guarantees distinct one-by-one reveals in order: Card 1 → 2 → 3 → 4.
            thresholds = STATS.map((s) => {
              const cardCenterX = s.xRatio * vw;
              // Car center is at (p * vw + carW * 0.5)
              // Trigger when car center is within ~60px of card center
              const triggerP = (cardCenterX - carW * 0.5) / vw;
              return gsap.utils.clamp(0.06, 0.88, triggerP);
            });
          };

          // ── QuickSetters for buttery 60fps performance ──────────────────
          const setCarX = gsap.quickSetter(car, "x", "px");
          const cardSetters = cards.map((el) => ({
            alpha: gsap.quickSetter(el, "opacity"),
            y: gsap.quickSetter(el, "y", "px"),
            scale: gsap.quickSetter(el, "scale"),
          }));
          const setCueAlpha = scrollCue ? gsap.quickSetter(scrollCue, "opacity") : null;

          // ── State proxy ─────────────────────────────────────────────────
          const proxy = { p: 0 };

          /**
           * Render loop – called on ticker updates via onUpdate.
           * Pure paint/transform properties; zero DOM reads.
           */
          const render = () => {
            const x = proxy.p * vw; // car left edge: 0 → vw (px)

            // 1. Car movement along x-axis
            setCarX(x);

            // 2. Electric green trail reveal (clipped from right, following rear wheels)
            const revealEdge = x + edgeOffset;
            const remainingInset = Math.max(0, vw - revealEdge);
            green.style.clipPath = `inset(0 ${remainingInset}px 0 0)`;

            // 3. Stat cards: sequential ONE-BY-ONE reveals with smooth cubic ease
            cardSetters.forEach((setter, i) => {
              const startP = thresholds[i];
              const t = gsap.utils.clamp(
                0,
                1,
                (proxy.p - startP) / CARD_REVEAL_SPAN
              );
              // Cubic ease-out interpolation
              const easeT = gsap.parseEase("power2.out")(t);
              setter.alpha(easeT);
              setter.y((1 - easeT) * 24);
              setter.scale(0.92 + 0.08 * easeT);
            });

            // 4. Fade out scroll cue cleanly once scrolling begins
            if (setCueAlpha) {
              setCueAlpha(Math.max(0, 1 - proxy.p * 7));
            }
          };

          // ── Seed initial state (no flash on first paint) ────────────────
          measure();
          gsap.set(car, { opacity: 0, x: 0 });
          gsap.set(cards, { opacity: 0, y: 24, scale: 0.92 });
          green.style.clipPath = `inset(0 ${vw}px 0 0)`;

          // ── Main ScrollTrigger timeline ─────────────────────────────────
          gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: SCROLL_LENGTH,
              pin: true,
              scrub: 0.8, // Smooth interpolation
              invalidateOnRefresh: true,
              onRefresh: () => {
                measure();
                render();
              },
            },
          }).to(proxy, {
            p: 1,
            ease: "none",
            duration: 1,
            onUpdate: render,
          });

          // ── Entrance / Load animation ───────────────────────────────────
          const loadTl = gsap.timeline({ delay: 0.1 });

          // 1. Road track scales in vertically
          const road = stage.querySelector<HTMLElement>(".road-track");
          if (road) {
            loadTl.fromTo(
              road,
              { scaleY: 0, opacity: 0.6 },
              { scaleY: 1, opacity: 1, duration: 0.65, ease: "power3.out" }
            );
          }

          // 2. Ghost headline letters stagger in
          if (ghost) {
            const letters = ghost.querySelectorAll<HTMLElement>(".ghost-letter");
            if (letters.length) {
              loadTl.fromTo(
                letters,
                { opacity: 0, y: 18 },
                {
                  opacity: 0.12,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.03,
                  ease: "power3.out",
                },
                "-=0.35"
              );
            }
          }

          // 3. Supercar fades in smoothly at origin
          loadTl.fromTo(
            car,
            { opacity: 0 },
            { opacity: 1, duration: 0.55, ease: "power2.out" },
            "-=0.25"
          );

          // 4. Navigation & scroll cue emerge
          const nav = stage.querySelector<HTMLElement>(".stage-nav");
          if (nav && scrollCue) {
            loadTl.fromTo(
              [nav, scrollCue],
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: "power2.out" },
              "-=0.2"
            );
          }
        }
      );

      return () => mm.revert();
    },
    { scope: stageRef }
  );
}
