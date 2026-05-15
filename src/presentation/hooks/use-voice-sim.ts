"use client";
import { useState, useEffect, useRef } from "react";

export function useVoiceSim(
  agentIds: string[],
  activeId: string
): Record<string, number> {
  const [levels, setLevels] = useState<Record<string, number>>(() =>
    Object.fromEntries(agentIds.map((id) => [id, 0]))
  );
  const targets = useRef<Record<string, number>>({});

  useEffect(() => {
    for (const id of agentIds) {
      if (!(id in targets.current)) targets.current[id] = 0;
    }
  }, [agentIds]);

  useEffect(() => {
    let raf: number;
    let lastTargetChange = 0;

    const tick = (t: number) => {
      if (t - lastTargetChange > 110) {
        lastTargetChange = t;
        for (const id of agentIds) {
          if (id === activeId) {
            const base = 0.45 + Math.random() * 0.5;
            targets.current[id] = Math.random() < 0.12 ? 0.08 : base;
          } else {
            targets.current[id] = Math.random() * 0.04;
          }
        }
      }

      setLevels((prev) => {
        const next = { ...prev };
        for (const id of agentIds) {
          const cur = prev[id] ?? 0;
          const tgt = targets.current[id] ?? 0;
          next[id] = cur + (tgt - cur) * 0.18;
        }
        return next;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentIds.join("|"), activeId]);

  return levels;
}
