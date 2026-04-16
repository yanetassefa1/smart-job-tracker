import { Link } from "react-router-dom";
import { Briefcase, BarChart2, Bell, Lock } from "lucide-react";

const FEATURES = [
  { icon: Briefcase, title: "Track every application", desc: "Log company, role, status, salary, contacts — all in one place." },
  { icon: BarChart2, title: "See your pipeline", desc: "Visual stats show your response rate, interview rate, and where you stand." },
  { icon: Bell, title: "Follow-up reminders", desc: "Never miss a follow-up with built-in date tracking per application." },
  { icon: Lock, title: "Private & secure", desc: "Your data is yours only. JWT-protected, zero third-party tracking." },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-4 text-center relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,241,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,241,53,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative flex flex-col items-center gap-6 max-w-2xl">
          <span className="text-xs font-mono text-lime-400 border border-lime-400/30 bg-lime-400/5 px-4 py-1.5 rounded-full tracking-widest uppercase">
            Job Search Tracker
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
            Stop losing track of<br />
            <span className="text-lime-400">your applications.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md leading-relaxed">
            One dashboard for every job you apply to. Track status, salaries, contacts, and follow-ups — so nothing slips through the cracks.
          </p>
          <div className="flex gap-3 mt-2">
            <Link to="/register" className="btn-primary px-8 py-3 text-base">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-ghost px-8 py-3 text-base">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-20 w-full">
        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card flex gap-4 items-start hover:border-ink-500 transition-colors">
              <div className="bg-ink-700 border border-ink-600 p-2.5 rounded-lg shrink-0">
                <Icon size={18} className="text-lime-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink-700 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to get organized?</h2>
        <p className="text-gray-500 mb-8">Free to use. No credit card required.</p>
        <Link to="/register" className="btn-primary px-10 py-3 text-base">
          Create Free Account
        </Link>
      </section>
    </div>
  );
}
