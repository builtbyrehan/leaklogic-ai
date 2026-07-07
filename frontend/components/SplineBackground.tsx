"use client";

import { Suspense } from "react";
import Spline from "@splinetool/react-spline";

export default function SplineBackground() {
  return (
    <div
      className="fixed inset-0 h-full w-full"
      style={{
        zIndex: 0,
        backgroundColor: "#001031",
      }}
    >
      <Suspense
        fallback={
          <div
            className="h-full w-full animate-pulse"
            style={{ backgroundColor: "#001031" }}
          />
        }
      >
        <Spline
          scene="https://prod.spline.design/SxhOPKt5L7pPqxaK/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        />
      </Suspense>
    </div>
  );
}
