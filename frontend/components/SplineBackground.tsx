"use client";

import Image from "next/image";

export default function SplineBackground() {
  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
      style={{
        zIndex: 0,
        backgroundColor: '#000000',
      }}
    >
      <Image
        src="/spline-bg.png"
        alt="Background Aesthetic"
        fill
        priority
        className="object-cover opacity-90 blur-[10px]"
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))'
        }}
      />
    </div>
  );
}