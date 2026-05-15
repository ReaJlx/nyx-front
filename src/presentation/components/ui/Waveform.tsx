"use client";
import { useState, useEffect, useMemo } from "react";

interface WaveformProps {
  level: number;
  color?: string;
  bars?: number;
  height?: number;
}

export function Waveform({
  level,
  color = "currentColor",
  bars = 24,
  height = 22,
}: WaveformProps) {
  const phases = useMemo(
    () => Array.from({ length: bars }, (_, i) => i * 0.41 + Math.random() * 3),
    [bars]
  );
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const loop = () => {
      setT((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height }}>
      {phases.map((p, i) => {
        const wig = Math.sin(t * 7 + p) * 0.5 + 0.5;
        const env = 0.18 + level * (0.5 + wig * 0.5);
        const h = Math.max(2, Math.min(height, height * env));
        return (
          <div
            key={i}
            style={{
              width: 2,
              height: h,
              background: color,
              opacity: 0.35 + level * 0.55,
              borderRadius: 1,
              transition: "height 80ms linear, opacity 120ms linear",
            }}
          />
        );
      })}
    </div>
  );
}
