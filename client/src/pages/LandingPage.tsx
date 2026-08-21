import { Link } from "react-router-dom";
import {
  ShieldCheck,
  QrCode,
  BarChart3,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  ArrowUpRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#120E0C] text-[#F7F4F0] font-sans selection:bg-[#D9662B]/30 selection:text-white wallpaper-surface">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-[#D9662B]/15 bg-[#120E0C]/90 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-[#D9662B] flex items-center justify-center text-white font-bold shadow-md shadow-[#D9662B]/30 transition-transform group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">Apex Veridoc</span>
            </div>
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              to="/verify"
              className="text-xs font-medium text-[#B8AAA2] hover:text-white px-3 py-2 rounded-lg transition hidden sm:inline-block"
            >
              Public Verifier
            </Link>
            <Link
              to="/login"
              className="btn-secondary text-xs py-2 px-3.5"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="btn-primary text-xs py-2 px-4"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Burnt Orange Atmosphere */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D9662B]/15 border border-[#D9662B]/30 text-[#D9662B] text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#D9662B]" />
              <span>Verifiable Programme & Credential Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Automate Cohorts. <br />
              <span className="text-[#D9662B]">Gate Live Attendance.</span> <br />
              Issue Verifiable Proof.
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-[#B8AAA2] leading-relaxed">
              Consolidate multi-tenant programme administration, real-time optical check-ins, and cryptographic digital credential issuance into a unified high-trust workspace.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                to="/register"
                className="btn-primary w-full sm:w-auto py-3.5 px-6 text-sm font-semibold shadow-lg shadow-[#D9662B]/25"
              >
                <span>Launch Organization Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/verify"
                className="btn-secondary w-full sm:w-auto py-3.5 px-6 text-sm font-medium"
              >
                <ShieldCheck className="h-4 w-4 text-[#D9662B]" />
                <span>Verify a Credential</span>
              </Link>
            </div>

            {/* Value Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-[#A89890]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#D9662B]" /> Zero Duplicate Check-ins
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#D9662B]" /> SHA-256 HMAC Sealed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#D9662B]" /> 100% Tenant Partitioned
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Fintech Moodboard Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D9662B]/30 bg-[#181310] shadow-2xl group">
              <img
                src="/wallpaper.jpg"
                alt="Apex Veridoc Design System & Editorial Fintech Showcase"
                className="w-full h-auto object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#181310]/90 backdrop-blur-md border border-[#D9662B]/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Inter Specimen • Warm Burnt-Orange</p>
                  <p className="text-[11px] text-[#A89890]">Editorial Grid & Precision Fintech UI</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#D9662B]" title="#D9662B" />
                  <div className="h-3 w-3 rounded-full bg-[#1A1512] border border-slate-700" title="#1A1512" />
                  <div className="h-3 w-3 rounded-full bg-[#F7F4F0]" title="#F7F4F0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Fintech & Attendance Grid Mockup Row */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Circular Donut Gauge & Metrics */}
          <div className="card-surface p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A89890]">Live Attendance Velocity</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#D9662B]/20 text-[#D9662B] font-bold">95.4%</span>
            </div>

            <div className="flex items-center gap-5">
              {/* Circular Gauge Graphic */}
              <div className="relative h-24 w-24 rounded-full flex items-center justify-center shrink-0"
                   style={{
                     background: "conic-gradient(#D9662B 0% 85%, #2C221D 85% 100%)",
                   }}>
                <div className="h-18 w-18 rounded-full bg-[#1A1411] flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-bold text-white">85%</span>
                  <span className="text-[9px] text-[#A89890] uppercase">Target</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <p className="text-[#A89890]">Active Session</p>
                  <p className="font-semibold text-white">45 Present / 48 Enrolled</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <TrendingUp className="h-3.5 w-3.5" /> +12% above qualification bar
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#D9662B]/15 flex items-center justify-between text-xs text-[#A89890]">
              <span>Duplicate Attempts: 0</span>
              <span className="text-[#D9662B] font-medium">PIN: 5723</span>
            </div>
          </div>

          {/* Card 2: Solid Burnt-Orange Typography Specimen */}
          <div className="card-orange-specimen flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs uppercase font-bold tracking-wider text-[#120E0C]/70 mb-2">
                <span>Typeface Specimen</span>
                <span>Inter Bold</span>
              </div>
              <h3 className="text-4xl font-black text-[#120E0C] tracking-tight">AaBbCc</h3>
              <p className="text-xs text-[#120E0C]/80 mt-2 leading-relaxed font-mono">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ <br />
                abcdefghijklmnopqrstuvwxyz 0123456789
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#120E0C]/20 flex items-center justify-between text-xs font-semibold text-[#120E0C]">
              <span>Geometric Precision</span>
              <span>100% Legible</span>
            </div>
          </div>

          {/* Card 3: Floating Stat Card & Verified Credentials */}
          <div className="card-surface p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A89890]">Cryptographic Seal</span>
                <Award className="h-4 w-4 text-[#D9662B]" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-white tracking-tight">142 Issued</span>
                <p className="text-xs text-[#A89890] mt-0.5">SHA-256 HMAC tamper-proof digital credentials</p>
              </div>
            </div>

            {/* Mini Sparkline Chart */}
            <div className="p-3 rounded-xl bg-[#221A16] border border-[#D9662B]/20 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#A89890]">Issuance Velocity</span>
                <span className="text-emerald-400 font-semibold">+24 today</span>
              </div>
              <div className="h-8 flex items-end gap-1.5">
                {[30, 45, 60, 40, 75, 90, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-sm ${
                      i >= 5 ? "bg-[#D9662B]" : "bg-[#D9662B]/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            <Link
              to="/credentials"
              className="text-xs font-semibold text-[#D9662B] hover:text-white flex items-center justify-between pt-1 transition"
            >
              <span>Explore Credential Templates</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Pillars Showcase */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Engineered for High-Trust Institutions
          </h2>
          <p className="text-xs sm:text-sm text-[#A89890]">
            From university accreditation cohorts to corporate enterprise training and industry symposiums.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-surface p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[#D9662B]/15 text-[#D9662B] flex items-center justify-center border border-[#D9662B]/30">
              <QrCode className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Live Attendance Station</h3>
            <p className="text-xs text-[#A89890] leading-relaxed">
              Optical QR scanning, self-service session PIN kiosks, and coordinator roster toggles with real-time deduplication safeguards.
            </p>
          </div>

          <div className="card-surface p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[#D9662B]/15 text-[#D9662B] flex items-center justify-center border border-[#D9662B]/30">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Cryptographically Sealed</h3>
            <p className="text-xs text-[#A89890] leading-relaxed">
              Every certificate is signed at issuance with tamper-evident digital hashes, compatible with open credential standards and instant public lookup.
            </p>
          </div>

          <div className="card-surface p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[#D9662B]/15 text-[#D9662B] flex items-center justify-center border border-[#D9662B]/30">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Automated Compliance</h3>
            <p className="text-xs text-[#A89890] leading-relaxed">
              Set curriculum requirements and attendance thresholds (e.g. ≥80%) to automatically gate credential eligibility and export compliance audits.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D9662B]/15 mt-12 py-8 text-center text-xs text-[#8A7B73]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Apex Veridoc. All rights reserved.</p>
          <div className="flex items-center gap-5 text-[#B8AAA2]">
            <Link to="/verify" className="hover:text-white transition">Public Verifier</Link>
            <Link to="/login" className="hover:text-white transition">Sign In</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}



