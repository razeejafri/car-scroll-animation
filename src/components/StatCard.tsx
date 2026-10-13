"use client";

import React from "react";
import type { Stat } from "@/lib/constants";

type StatCardProps = {
  stat: Stat;
};

/**
 * StatCard – High-impact floating metric card.
 *
 * • Uncluttered, bespoke design: bold numeric stat + clear label.
 * • Purely presentational; positioned absolutely via HeroStage.
 * • Hardware accelerated with will-change: transform, opacity.
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  function StatCard({ stat }, ref) {
    return (
      <div
        ref={ref}
        id={`stat-card-${stat.id}`}
        className={`stat-card stat-card--${stat.id}`}
        style={{
          backgroundColor: stat.bg,
          color: stat.fg,
          opacity: 0,
          willChange: "transform, opacity",
        }}
        aria-label={`${stat.value} – ${stat.label}`}
      >
        <p className="stat-card__value">{stat.value}</p>
        <p className="stat-card__label">{stat.label}</p>
      </div>
    );
  }
);

StatCard.displayName = "StatCard";

export default StatCard;
