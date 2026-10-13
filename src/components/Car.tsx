"use client";

import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CarProps {}

/**
 * Car – Top-down McLaren supercar with natural studio contact shadow.
 *
 * Performance considerations:
 *  • will-change: transform ensures the car stays on its own GPU compositor layer.
 *  • pointer-events: none ensures scroll/touch passes through seamlessly.
 */
const Car = React.forwardRef<HTMLDivElement, CarProps>(function Car(_props, ref) {
  return (
    <div ref={ref} className="car-container" aria-hidden="true">
      {/* ── Soft realistic underbody contact shadow ── */}
      <div className="car-contact-shadow" />

      {/* ── Supercar Top-Down PNG (transparent 32-bit RGBA) ── */}
      <div className="car-body">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/car.png"
          alt="Top-down view of orange supercar"
          width={1118}
          height={563}
          draggable={false}
          className="car-image"
        />
      </div>
    </div>
  );
});

Car.displayName = "Car";

export default Car;
