import { Link } from "react-router-dom";
import {
  ShieldCheck,
  QrCode,
  BarChart3,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-emerald-500/25 selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#080d1a]/85 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">Apex Veridoc</span>
            </div>
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              to="/verify"
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg transition hidden sm:inline-block"
            >
              Public Verifier
            </Link>
            <Link
              to="/login"
              className="btn-secondary text-xs py-2 px-3"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="btn-primary text-xs py-2 px-3.5"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Verifiable Programme & Credential Management</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-[1.15]">
            Run Programmes. <br className="hidden sm:inline" />
            Gate Live Attendance. <br className="hidden sm:inline" />
            <span className="text-emerald-400">
              Issue Accredited Digital Credentials.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
            Consolidate cohort enrollment, real-time multi-method attendance verification, and tamper-proof digital certificate issuance into one unified enterprise workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/register"
              className="btn-primary w-full sm:w-auto py-3 px-6 text-sm font-semibold"
            >
              <span>Register Your Organization</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/verify"
              className="btn-secondary w-full sm:w-auto py-3 px-6 text-sm"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Verify a Credential</span>
            </Link>
          </div>

          {/* Value Proof Points */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Zero Duplicate Check-ins
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Instant QR Verification
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Isolated Organization Data
            </span>
          </div>
        </div>
      </section>

      {/* Feature Pillars Showcase */}
      <section className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card-surface p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <QrCode className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Live Attendance Station</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Optical QR scanning, self-service session PIN kiosks, and coordinator roster toggles with real-time deduplication safeguards.
            </p>
          </div>

          <div className="card-surface p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Cryptographically Sealed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every certificate is signed at issuance with tamper-evident digital hashes, compatible with open credential standards and instant public lookup.
            </p>
          </div>

          <div className="card-surface p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center border border-teal-500/20">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Automated Compliance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Set curriculum requirements and attendance thresholds (e.g. ≥80%) to automatically gate credential eligibility and export compliance audits.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 mt-12 py-8 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Apex Veridoc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/verify" className="hover:text-white transition">Public Verifier</Link>
            <Link to="/login" className="hover:text-white transition">Sign In</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


