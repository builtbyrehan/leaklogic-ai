"use client";

import React, { useRef } from "react";

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
}

export default function Card3D({ children, className = "", glowColor = "rgba(124, 58, 237, 0.15)", ...props }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation (max 8 degrees)
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;

    // Calculate glare percentage position
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;

    // Direct DOM manipulation to bypass React render cycle throttled with requestAnimationFrame
    requestAnimationFrame(() => {
      if (!cardRef.current || !glareRef.current) return;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`;
      cardRef.current.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${glowColor}`;
      glareRef.current.style.background = `radial-gradient(circle 250px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12), transparent 80%)`;
      glareRef.current.style.opacity = "0.4";
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    card.style.boxShadow = "0 8px 40px rgba(0, 0, 0, 0.45)";
    glare.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out cursor-pointer ${className}`}
      style={{
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.45)",
      }}
      {...props}
    >
      {/* Liquid Glare Reflection Overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 rounded-[inherit] opacity-0"
      />
      
      {/* Content wrapper */}
      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </div>
  );
}
