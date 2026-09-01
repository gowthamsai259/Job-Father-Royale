import type { CSSProperties } from "react";

type LoginPageProps = {
  onLogin: () => void;
};

type Particle = {
  label: string;
  dx: string;
  dy: string;
  delay: string;
  color: string;
};

const particles: Particle[] = [
  { label: "✉", dx: "-42vw", dy: "-30vh", delay: "0s", color: "text-white" },
  { label: "EXCEL", dx: "38vw", dy: "-28vh", delay: "0.3s", color: "text-green-200" },
  { label: "G", dx: "-35vw", dy: "28vh", delay: "0.6s", color: "text-red-200" },
  { label: "Y!", dx: "42vw", dy: "30vh", delay: "0.9s", color: "text-purple-200" },
  { label: "📧", dx: "8vw", dy: "-40vh", delay: "1.2s", color: "text-orange-200" },
  { label: "SHEETS", dx: "-10vw", dy: "40vh", delay: "1.5s", color: "text-green-200" },
  { label: "📨", dx: "45vw", dy: "5vh", delay: "1.8s", color: "text-white" },
  { label: "DOCS", dx: "-45vw", dy: "5vh", delay: "2.1s", color: "text-blue-200" },
  { label: "📊", dx: "28vw", dy: "38vh", delay: "2.4s", color: "text-emerald-200" },
  { label: "MAIL", dx: "-28vw", dy: "-38vh", delay: "2.7s", color: "text-pink-200" },
  { label: "G", dx: "18vw", dy: "25vh", delay: "3s", color: "text-yellow-200" },
  { label: "✉", dx: "-18vw", dy: "-25vh", delay: "3.3s", color: "text-white" },
];

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] px-6 text-white">
      <style>{`
        @keyframes particleBurst {
          0% {
            left: 50%;
            top: 50%;
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.1) rotate(0deg);
          }

          5% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.4) rotate(20deg);
          }

          32% {
            left: calc(50% + var(--dx));
            top: calc(50% + var(--dy));
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1) rotate(180deg);
          }

          62% {
            left: calc(50% + var(--dx));
            top: calc(50% + var(--dy));
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(0.9) rotate(300deg);
          }

          100% {
            left: calc(50% + var(--dx));
            top: calc(50% + var(--dy));
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2) rotate(420deg);
          }
        }

        @keyframes shockwave {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0;
          }

          8% {
            opacity: 0.8;
          }

          55% {
            transform: translate(-50%, -50%) scale(5);
            opacity: 0;
          }

          100% {
            transform: translate(-50%, -50%) scale(5);
            opacity: 0;
          }
        }

        @keyframes corePulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.8);
            box-shadow:
              0 0 25px #60a5fa,
              0 0 70px #2563eb,
              0 0 130px #1d4ed8;
          }

          50% {
            transform: translate(-50%, -50%) scale(1.25);
            box-shadow:
              0 0 45px #bfdbfe,
              0 0 110px #3b82f6,
              0 0 190px #2563eb;
          }
        }

        @keyframes dustFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.25;
          }

          50% {
            transform: translateY(-20px) scale(1.15);
            opacity: 0.5;
          }
        }

        .particle {
          position: absolute;
          animation: particleBurst 10s ease-out infinite;
          animation-delay: var(--delay);
          will-change: transform, left, top, opacity;
        }

        .shockwave {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 110px;
          height: 110px;
          border: 1px solid rgb(147 197 253 / 0.65);
          border-radius: 9999px;
          animation: shockwave 10s ease-out infinite;
          pointer-events: none;
        }

        .core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 34px;
          height: 34px;
          border-radius: 9999px;
          background: white;
          animation: corePulse 2.8s ease-in-out infinite;
        }

        .dust {
          animation: dustFloat 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .particle,
          .shockwave,
          .core,
          .dust {
            animation: none;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2),transparent_35%)]" />



        {particles.map((particle) => (
          <span
            key={`${particle.label}-${particle.delay}`}
            className={`particle rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold tracking-wide shadow-xl backdrop-blur-sm ${particle.color}`}
            style={
              {
                "--dx": particle.dx,
                "--dy": particle.dy,
                "--delay": particle.delay,
              } as CSSProperties
            }
          >
            {particle.label}
          </span>
        ))}

        <div className="dust absolute left-[15%] top-[20%] h-2 w-2 rounded-full bg-blue-300" />
        <div className="dust absolute left-[80%] top-[28%] h-3 w-3 rounded-full bg-indigo-300 [animation-delay:1s]" />
        <div className="dust absolute left-[25%] top-[75%] h-2 w-2 rounded-full bg-cyan-300 [animation-delay:2s]" />
        <div className="dust absolute left-[75%] top-[78%] h-2 w-2 rounded-full bg-purple-300 [animation-delay:3s]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="relative w-full max-w-2xl text-center">
          <div className="absolute -inset-10 -z-10 rounded-full bg-blue-950/70 blur-3xl" />

      <div className="relative">

          <div className="mb-10 flex items-center justify-center gap-4">
            <svg
              viewBox="0 0 64 64"
              className="h-14 w-14 text-white"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="8"
                y="8"
                width="48"
                height="48"
                rx="14"
                className="fill-white/10 stroke-current"
                strokeWidth="2"
              />

              <path
                d="M18 42V30M27 42V22M36 42V27M45 42V17"
                className="stroke-current"
                strokeWidth="5"
                strokeLinecap="round"
              />

              <path
                d="M17 47H47"
                className="stroke-blue-300"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <span className="text-xl font-bold tracking-wide sm:text-2xl">
              Boss Enterprises
            </span>
          </div>

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">
            Intelligence for the next move
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Turn your experience into
            <span className="block text-blue-300">
              new possibilities
            </span>
          </h1>

          <button
            type="button"
            onClick={onLogin}
            
            className="mx-auto mt-10 flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-slate-900 shadow-2xl transition hover:scale-[1.03] hover:bg-
            blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300/40 cursor-pointer"
          >
            <span className="text-xl font-bold text-blue-600">
              G
            </span>
            Continue with Google
          </button>

          <p className="mt-8 text-xs tracking-wide text-slate-400">
            Secure authentication powered by Google
          </p>
        </div>
      </div>
    </div>
    </main>
  );
}
