import { NavLink, Outlet } from "react-router-dom";

type CommonPageProps = {
  email?: string;
  onLogout: () => void;
};

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-blue-600 text-white shadow-md shadow-blue-950/30"
      : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;

export default function CommonPage({
  email,
  onLogout,
}: CommonPageProps) {
  return (
    <main className="flex h-screen overflow-hidden bg-slate-100 text-slate-900">
      <aside className="flex h-screen w-64 flex-none flex-col bg-slate-950 px-4 py-6 shadow-2xl shadow-slate-950/30">
        <NavLink
          to="/home"
          className="mb-8 flex justify-center"
          aria-label="Job Father Royale home"
        >
          <img
            src="/assets/job-father-royale-logo.png"
            alt="Job Father Royale"
            className="h-44 w-44 rounded-xl object-contain shadow-lg shadow-black/30"
          />
        </NavLink>

        <nav className="flex w-full flex-col gap-3" aria-label="Main navigation">
          <NavLink to="resume-analyzer" className={navClass}>
            Job Analyzer
          </NavLink>

          <NavLink to="model-settings" className={navClass}>
            Model Settings
          </NavLink>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-5">
          <p className="mb-3 truncate text-xs text-slate-400" title={email}>
            {email}
          </p>

          <button
            type="button"
            onClick={onLogout}
            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300/40"
          >
            Logout
          </button>
        </div>
      </aside>

      <section className="min-w-0 flex-1 overflow-hidden px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="h-full overflow-y-auto rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
