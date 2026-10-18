import { useEffect, useRef, type CSSProperties } from "react";
import "./styles/PointerEffects.css";

const particles = Array.from({ length: 30 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  "--duration": `${16 + index % 9 * 2}s`,
  "--delay": `${-index * 1.7}s`,
  "--drift": `${index % 2 ? 32 : -32}px`,
} as CSSProperties));

/** Decorative effects stay outside React's render loop and never intercept input. */
export default function PointerEffects() {
  const background = useRef<HTMLDivElement>(null);
  const pointer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = pointer.current;
    const ambient = background.current;
    if (!layer || !ambient) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0, y = 0, ringX = 0, ringY = 0, glowX = 0, glowY = 0;
    let visible = false;

    const draw = () => {
      ringX += (x - ringX) * .22;
      ringY += (y - ringY) * .22;
      glowX += (x - glowX) * .09;
      glowY += (y - glowY) * .09;
      layer.style.setProperty("--pointer-x", `${x}px`);
      layer.style.setProperty("--pointer-y", `${y}px`);
      layer.style.setProperty("--ring-x", `${ringX}px`);
      layer.style.setProperty("--ring-y", `${ringY}px`);
      layer.style.setProperty("--glow-x", `${glowX}px`);
      layer.style.setProperty("--glow-y", `${glowY}px`);
      frame = Math.abs(x - glowX) + Math.abs(y - glowY) > .2 ? requestAnimationFrame(draw) : 0;
    };
    const hide = () => {
      visible = false;
      layer.dataset.visible = "false";
      document.documentElement.classList.remove("pointer-effects-active");
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const update = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !finePointer.matches || reducedMotion.matches || document.hidden) return;
      x = event.clientX; y = event.clientY;
      if (!visible) {
        ringX = glowX = x; ringY = glowY = y;
        visible = true;
        // Draw at the current pointer before revealing, avoiding a flash at (0, 0).
        draw();
        layer.dataset.visible = "true";
        document.documentElement.classList.add("pointer-effects-active");
      }
      layer.dataset.interactive = String(event.target instanceof Element && Boolean(event.target.closest("a, button, summary, input, textarea, select, [role='button']")));
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const syncPreferences = () => { if (!finePointer.matches || reducedMotion.matches) hide(); };
    const syncVisibility = () => {
      ambient.dataset.paused = String(document.hidden);
      if (document.hidden) hide();
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    window.addEventListener("pointermove", update, { passive: true });
    document.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", syncVisibility);
    finePointer.addEventListener("change", syncPreferences);
    reducedMotion.addEventListener("change", syncPreferences);
    syncVisibility();
    return () => {
      hide();
      window.removeEventListener("pointermove", update);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", syncVisibility);
      finePointer.removeEventListener("change", syncPreferences);
      reducedMotion.removeEventListener("change", syncPreferences);
    };
  }, []);

  return <>
    <div ref={background} className="ambient-background" aria-hidden="true">
      <div className="ambient-orb ambient-violet" />
      <div className="ambient-orb ambient-cyan" />
      <div className="ambient-orb ambient-gold" />
      <div className="ambient-grid" />
      <div className="ambient-particles">{particles.map((style, index) => <i key={index} style={style} />)}</div>
      <div className="ambient-vignette" />
    </div>
    <div ref={pointer} className="pointer-effects" data-visible="false" aria-hidden="true">
      <div className="pointer-glow" /><div className="pointer-ring" /><div className="pointer-dot" />
    </div>
  </>;
}
