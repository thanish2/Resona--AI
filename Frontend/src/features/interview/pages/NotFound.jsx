import { useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router";

// Splits text into spans, each letter gets its own randomized
// floating animation + reacts individually when the cursor gets close.
function ChaosText({ text, className }) {
  const letters = useMemo(
    () =>
      text.split("").map((char, i) => ({
        char,
        id: i,
        duration: (Math.random() * 1.5 + 1.2).toFixed(2),
        delay: (Math.random() * 1.5).toFixed(2),
        driftX: (Math.random() * 10 - 5).toFixed(1),
        driftY: (Math.random() * 14 - 7).toFixed(1),
        rot: (Math.random() * 12 - 6).toFixed(1),
        pushStrength: Math.random() * 0.6 + 0.7,
        spinDir: Math.random() > 0.5 ? 1 : -1,
      })),
    [text],
  );

  const refs = useRef([]);

  useEffect(() => {
    const handleMove = (e) => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 90;

        if (dist < radius) {
          const force = (1 - dist / radius) * 40 * letters[i].pushStrength;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force;
          const pushY = Math.sin(angle) * force;
          const rotate = force * letters[i].spinDir * 1.5;
          el.style.setProperty("--push-x", `${pushX}px`);
          el.style.setProperty("--push-y", `${pushY}px`);
          el.style.setProperty("--push-rot", `${rotate}deg`);
          el.style.setProperty("--push-scale", `${1 + force / 80}`);
        } else {
          el.style.setProperty("--push-x", `0px`);
          el.style.setProperty("--push-y", `0px`);
          el.style.setProperty("--push-rot", `0deg`);
          el.style.setProperty("--push-scale", `1`);
        }
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [letters]);

  return (
    <span className={className} style={{ display: "inline-block" }}>
      {letters.map((l, i) => (
        <span
          key={l.id}
          ref={(el) => (refs.current[i] = el)}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            "--float-x": `${l.driftX}px`,
            "--float-y": `${l.driftY}px`,
            "--float-rot": `${l.rot}deg`,
            "--push-x": "0px",
            "--push-y": "0px",
            "--push-rot": "0deg",
            "--push-scale": "1",
            animation: `chaosFloat ${l.duration}s ease-in-out ${l.delay}s infinite alternate`,
            transform:
              "translate(var(--push-x), var(--push-y)) rotate(var(--push-rot)) scale(var(--push-scale))",
            transition: "transform 0.12s ease-out",
          }}
        >
          {l.char}
        </span>
      ))}
    </span>
  );
}

// A button that idly drifts/rotates on its own, with its own randomized
// float pattern, AND actively dodges the cursor when it gets close.
// Signature look: a slowly rotating conic-gradient ring around a dark
// glass core, so the "electricity" from the cursor trail feels like it
// lives inside this one object.
function ChaosButton({ children, onClick }) {
  const btnRef = useRef(null);

  const config = useMemo(
    () => ({
      duration: (Math.random() * 0.6 + 1.4).toFixed(2), // bounce speed
      delay: (Math.random() * 0.5).toFixed(2),
      driftX: (Math.random() * 10 - 5).toFixed(1), // slight sideways sway while bouncing
    }),
    [],
  );

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 150;
      const catchDistance = 60; // once cursor is this close, it stops running so you can click it

      if (dist < catchDistance) {
        // "cornered" — give up and hold still so it's actually clickable
        el.style.setProperty("--dodge-x", `0px`);
        el.style.setProperty("--dodge-y", `0px`);
        el.style.setProperty("--dodge-rot", `0deg`);
        el.style.setProperty("--dodge-scale", `1`);
        el.style.setProperty("--dodge-speed", "0.35s");
      } else if (dist < radius) {
        const proximity = 1 - (dist - catchDistance) / (radius - catchDistance);
        const force = proximity * 55;
        const angle = Math.atan2(dy, dx);
        const dodgeX = Math.cos(angle) * force;
        const dodgeY = Math.sin(angle) * force;
        const rotate = (dodgeX / 55) * 10;
        const scare = 1 - proximity * 0.1;
        el.style.setProperty("--dodge-x", `${dodgeX}px`);
        el.style.setProperty("--dodge-y", `${dodgeY}px`);
        el.style.setProperty("--dodge-rot", `${rotate}deg`);
        el.style.setProperty("--dodge-scale", `${scare}`);
        el.style.setProperty("--dodge-speed", "0.12s");
      } else {
        el.style.setProperty("--dodge-x", `0px`);
        el.style.setProperty("--dodge-y", `0px`);
        el.style.setProperty("--dodge-rot", `0deg`);
        el.style.setProperty("--dodge-scale", `1`);
        el.style.setProperty("--dodge-speed", "0.4s");
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={btnRef}
      style={{
        "--btn-sway": `${config.driftX}px`,
        "--dodge-x": "0px",
        "--dodge-y": "0px",
        "--dodge-rot": "0deg",
        "--dodge-scale": "1",
        "--dodge-speed": "0.4s",
        perspective: "900px",
      }}
      className="group relative mt-6 inline-block rounded-full p-[2px]"
    >
      {/* outer wrapper handles the cursor-dodge (fast, physical flinch) */}
      <div
        style={{
          transform:
            "translate(var(--dodge-x), var(--dodge-y)) rotate(var(--dodge-rot)) scale(var(--dodge-scale))",
          transition:
            "transform var(--dodge-speed) cubic-bezier(.34,1.56,.64,1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* inner wrapper handles the constant balloon-style Z-axis jump (toward/away from viewer) */}
        <div
          style={{
            transformStyle: "preserve-3d",
            animation: `balloonJump ${config.duration}s cubic-bezier(.45,0,.55,1) ${config.delay}s infinite`,
          }}
          className="relative inline-block rounded-full"
        >
          {/* rotating conic gradient ring — spins independently of the jump */}
          <span
            className="absolute inset-0 rounded-full opacity-90 blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "conic-gradient(from 0deg, #ff2b4d, #7c1fe0, #00f0ff, #ff2b4d)",
              animation: "spinRing 3.5s linear infinite",
            }}
          />
          {/* soft outer glow that intensifies on hover */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-fuchsia-500 to-cyan-400 opacity-40 blur-xl transition-all duration-300 group-hover:opacity-70 group-hover:blur-2xl" />

          <button
            onClick={onClick}
            className="relative z-10 flex items-center justify-center gap-3 overflow-hidden rounded-full bg-surface-900/95 px-10 py-4 text-lg font-bold tracking-wide text-white backdrop-blur-xl transition-transform duration-200 group-active:scale-95"
          >
            {/* shine sweep on hover */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

            <span className="relative z-10 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105">
              {children}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const trailRef = useRef([]); // recent cursor points for the silver ribbon
  const sparksRef = useRef([]); // sparse sprinkle particles
  const lastPos = useRef(null);
  const moveCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const MAX_TRAIL = 22;

    const handleMove = (e) => {
      const prev = lastPos.current || { x: e.clientX, y: e.clientY };
      lastPos.current = { x: e.clientX, y: e.clientY };

      trailRef.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trailRef.current.length > MAX_TRAIL) trailRef.current.shift();

      // sparse sprinkle: only spawn a spark occasionally, not every move
      moveCount.current += 1;
      if (moveCount.current % 5 === 0 && Math.random() > 0.4) {
        sparksRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
        });
      }
    };

    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) handleMove(e.touches[0]);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouch);

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- the silver ribbon trail ---
      const pts = trailRef.current;
      if (pts.length > 1) {
        for (let i = 0; i < pts.length - 1; i++) {
          const p = pts[i];
          const next = pts[i + 1];
          const t = i / pts.length; // 0 (old/tail) -> 1 (new/head)
          const alpha = t * 0.9;
          const width = t * 3.5 + 0.4;

          // soft silver glow underlayer
          ctx.save();
          ctx.globalAlpha = alpha * 0.5;
          ctx.strokeStyle = "#dfe7ee";
          ctx.shadowBlur = 14;
          ctx.shadowColor = "#c9d6e3";
          ctx.lineWidth = width * 2.2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
          ctx.restore();

          // bright white-silver core for the "shine"
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = "#ffffff";
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#ffffff";
          ctx.lineWidth = Math.max(width * 0.6, 0.6);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
          ctx.restore();
        }
      }
      // fade the tail out over time so it doesn't linger when cursor stops
      trailRef.current = trailRef.current.filter((p) => {
        p.life -= 0.04;
        return p.life > 0;
      });

      // --- sparse sprinkle particles ---
      sparksRef.current.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(s.life, 0);
        ctx.fillStyle = "#f2f6fa";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(s.size, 0), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      sparksRef.current = sparksRef.current.filter((s) => s.life > 0);

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-900 text-white">
      <style>{`
        @keyframes chaosFloat {
          0% {
            translate: 0 0;
          }
          100% {
            translate: var(--float-x) var(--float-y);
            rotate: var(--float-rot);
          }
        }

        @keyframes balloonJump {
          0% {
            transform: translateZ(0px);
          }
          15% {
            transform: translateZ(-18px); /* dips back before launching */
          }
          45% {
            transform: translateZ(150px); /* pops forward toward the viewer */
          }
          75% {
            transform: translateZ(150px);
          }
          90% {
            transform: translateZ(-18px); /* recoils back on "landing" */
          }
          100% {
            transform: translateZ(0px);
          }
        }

        @keyframes spinRing {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
      />

      <div className="absolute left-0 top-0 h-[35rem] w-[35rem] rounded-full bg-primary-500/10 blur-[180px]" />
      <div className="absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-[180px]" />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px),linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <ChaosText
          text="404"
          className="text-[10rem] font-black leading-none text-white drop-shadow-[0_0_40px_rgba(200,210,230,0.35)]"
        />

        <ChaosText
          text="PAGE NOT FOUND"
          className="text-2xl font-bold tracking-widest text-white"
        />

        <p className="max-w-md text-surface-400">
          Wrong turn. This page got deleted, moved, or never existed. Get out
          while you can.
        </p>

        <ChaosButton onClick={() => navigate("/")}>Take Me Home</ChaosButton>
      </div>
    </main>
  );
}
