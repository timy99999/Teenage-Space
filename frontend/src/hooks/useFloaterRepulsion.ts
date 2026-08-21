import { useEffect, useRef } from 'react';

// Nudges floating decorative icons apart when their edges get within a few
// pixels of each other, so they read as "bumping" off one another instead of
// overlapping. Runs outside React's render loop: positions are read via
// getBoundingClientRect and the reaction is written straight to a child
// element's style, so 50+ floaters can be checked without re-rendering.
const REPEL_GAP = 5; // px — edge-to-edge gap under which floaters push apart
const REPEL_STRENGTH = 9;
const MAX_NUDGE = 16; // px — clamp so a cluster can't fling an icon far off its path
const DECAY = 0.82; // per-tick falloff once floaters are no longer close
// Deliberately not every-frame: each tick calls getBoundingClientRect on every floater, which
// forces a synchronous layout. 130ms keeps that cost low; the CSS transition on .ts-floater-nudge
// (see app.css) glides between these steps so the motion still reads as continuous, not stepped.
const TICK_MS = 130;

type Nodes = { outer: HTMLDivElement | null; nudge: HTMLDivElement | null };

export function useFloaterRepulsion() {
  const nodes = useRef(new Map<string, Nodes>());
  const offset = useRef(new Map<string, { x: number; y: number }>());
  const refFns = useRef(new Map<string, { outer: (el: HTMLDivElement | null) => void; nudge: (el: HTMLDivElement | null) => void }>());

  const getRefs = (key: string) => {
    let fns = refFns.current.get(key);
    if (!fns) {
      fns = {
        outer: (el) => {
          const cur = nodes.current.get(key) ?? { outer: null, nudge: null };
          cur.outer = el;
          nodes.current.set(key, cur);
        },
        nudge: (el) => {
          const cur = nodes.current.get(key) ?? { outer: null, nudge: null };
          cur.nudge = el;
          nodes.current.set(key, cur);
        }
      };
      refFns.current.set(key, fns);
    }
    return fns;
  };

  useEffect(() => {
    let raf = 0;
    let last = 0;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < TICK_MS) return;
      last = t;

      const entries = [...nodes.current.entries()].filter(([, n]) => n.outer && n.nudge) as [
        string,
        { outer: HTMLDivElement; nudge: HTMLDivElement }
      ][];
      if (entries.length < 2) return;

      const rects = entries.map(([, n]) => n.outer.getBoundingClientRect());
      const push = entries.map(() => ({ x: 0, y: 0 }));

      for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
          const a = rects[i];
          const b = rects[j];
          const dx = a.left + a.width / 2 - (b.left + b.width / 2);
          const dy = a.top + a.height / 2 - (b.top + b.height / 2);
          const dist = Math.hypot(dx, dy) || 0.01;
          const gap = dist - (a.width / 2 + b.width / 2);
          if (gap < REPEL_GAP) {
            const force = ((REPEL_GAP - gap) / REPEL_GAP) * REPEL_STRENGTH;
            const nx = dx / dist;
            const ny = dy / dist;
            push[i].x += nx * force;
            push[i].y += ny * force;
            push[j].x -= nx * force;
            push[j].y -= ny * force;
          }
        }
      }

      entries.forEach(([key, n], i) => {
        const prev = offset.current.get(key) ?? { x: 0, y: 0 };
        let x = prev.x * DECAY + push[i].x;
        let y = prev.y * DECAY + push[i].y;
        x = Math.max(-MAX_NUDGE, Math.min(MAX_NUDGE, x));
        y = Math.max(-MAX_NUDGE, Math.min(MAX_NUDGE, y));
        offset.current.set(key, { x, y });
        n.nudge.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return getRefs;
}
