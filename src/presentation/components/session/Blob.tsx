"use client";
import { useState, useEffect, useRef } from "react";
import type { AgentPalette } from "@/domain/entities/agent";

interface BlobProps {
  palette: AgentPalette;
  level?: number;
  speaking?: boolean;
  size?: number;
  seed?: number;
}

export function Blob({
  palette,
  level = 0,
  speaking = false,
  size = 280,
  seed = 1,
}: BlobProps) {
  const [t, setT] = useState(0);
  const start = useRef(performance.now());

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setT((performance.now() - start.current) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const lvl = Math.min(1, level);
  const ringOpacity = speaking ? 0.85 : 0.38;
  const tickOpacity = speaking ? 0.95 : 0.55;
  const { core, edge } = palette;

  const strands = 14;
  const radius = 72;
  const samples = 56;

  const waveElements = Array.from({ length: strands }, (_, s) => {
    const phase = (s / strands) * Math.PI * 2 + seed * 1.3;
    const freqMul = 1 + (s / strands) * 0.6;
    const dc = Math.abs(s - (strands - 1) / 2) / ((strands - 1) / 2);
    const ampMul = 1 - dc;
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const x = -radius + (i / samples) * radius * 2;
      const env = Math.exp(-Math.pow(x / (radius * 0.52), 2));
      const baseAmp = 22 * env * (0.18 + lvl * 1.1);
      const y =
        Math.sin((x / 7) * freqMul + t * 2.6 + phase) *
        baseAmp *
        (0.5 + ampMul * 0.5);
      d +=
        i === 0
          ? `M${x.toFixed(2)} ${y.toFixed(2)}`
          : ` L${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return (
      <path
        key={s}
        d={d}
        fill="none"
        stroke={core}
        strokeWidth="0.7"
        opacity={(0.18 + ampMul * 0.5) * (0.35 + lvl * 0.85)}
        strokeLinecap="round"
      />
    );
  });

  const majorTicks = [0, 1, 2, 3].map((i) => {
    const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
    return (
      <line
        key={`m${i}`}
        x1={Math.cos(a) * 86}
        y1={Math.sin(a) * 86}
        x2={Math.cos(a) * 96}
        y2={Math.sin(a) * 96}
        stroke={edge}
        strokeWidth="1.4"
        opacity={tickOpacity}
      />
    );
  });

  const diagTicks = [0, 1, 2, 3].map((i) => {
    const a = (i / 4 + 0.125) * Math.PI * 2;
    return (
      <line
        key={`d${i}`}
        x1={Math.cos(a) * 88}
        y1={Math.sin(a) * 88}
        x2={Math.cos(a) * 93}
        y2={Math.sin(a) * 93}
        stroke={edge}
        strokeWidth="0.9"
        opacity={tickOpacity * 0.7}
      />
    );
  });

  const tinyDots = Array.from({ length: 48 }, (_, i) => {
    if (i % 6 === 0) return null;
    const a = (i / 48) * Math.PI * 2;
    return (
      <circle
        key={i}
        cx={Math.cos(a) * 90}
        cy={Math.sin(a) * 90}
        r="0.42"
        fill={edge}
        opacity={ringOpacity * 0.55}
      />
    );
  });

  const buildCluster = (sign: 1 | -1) => {
    const items = [];
    for (let c = 0; c < 3; c++) {
      for (let r = 0; r < 5; r++) {
        const cx = sign * (102 + c * 3.6);
        const cy = (r - 2) * 3.6;
        const threshold = 0.04 + (c / 2) * 0.4;
        const lit = lvl > threshold;
        const wob = 0.5 + 0.18 * Math.sin(t * 7 + c * 1.3 + r * 0.7 + sign);
        items.push(
          <circle
            key={`c${sign}-${c}-${r}`}
            cx={cx}
            cy={cy}
            r="0.7"
            fill={core}
            opacity={lit ? wob : 0.14}
          />
        );
      }
    }
    items.push(
      <line
        key={`bar${sign}`}
        x1={sign * 92}
        y1={-5}
        x2={sign * 92}
        y2={5}
        stroke={edge}
        strokeWidth="1.4"
        opacity={tickOpacity}
      />,
      <line
        key={`bar2-${sign}`}
        x1={sign * 116}
        y1={-2.6}
        x2={sign * 116}
        y2={2.6}
        stroke={edge}
        strokeWidth="1.1"
        opacity={tickOpacity * 0.7}
      />
    );
    return items;
  };

  const innerDots = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    return (
      <circle
        key={`id${i}`}
        cx={Math.cos(a) * 58}
        cy={Math.sin(a) * 58}
        r="0.35"
        fill={edge}
        opacity={ringOpacity * 0.22}
      />
    );
  });

  return (
    <svg
      viewBox="-128 -128 256 256"
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        maxWidth: size,
        maxHeight: size,
      }}
    >
      <circle
        cx="0"
        cy="0"
        r="58"
        fill="none"
        stroke={edge}
        strokeWidth="0.5"
        opacity={ringOpacity * 0.2}
      />
      <circle
        cx="0"
        cy="0"
        r="32"
        fill="none"
        stroke={edge}
        strokeWidth="0.5"
        opacity={ringOpacity * 0.12}
      />
      {innerDots}
      <line
        x1="-86"
        y1="0"
        x2="86"
        y2="0"
        stroke={core}
        strokeWidth="0.4"
        opacity="0.18"
      />
      <g>{waveElements}</g>
      <circle
        cx="0"
        cy="0"
        r="90"
        fill="none"
        stroke={edge}
        strokeWidth="1.1"
        opacity={ringOpacity}
      />
      {speaking && (
        <circle
          cx="0"
          cy="0"
          r="95"
          fill="none"
          stroke={edge}
          strokeWidth="0.5"
          opacity="0.35"
        />
      )}
      {tinyDots}
      {diagTicks}
      {majorTicks}
      {buildCluster(1)}
      {buildCluster(-1)}
    </svg>
  );
}
