import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  QrCode,
  Award,
  Zap,
  KeyRound,
  X,
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [resetSubmitting, setResetSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await refreshProfile();
      navigate("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      if (msg.includes("user-not-found") || msg.includes("wrong-password") || msg.includes("invalid-credential")) {
        setError("Invalid email or password. Please verify your credentials.");
      } else if (msg.includes("network-request-failed") || msg.includes("api-key-not-valid") || msg.includes("project-not-found")) {
        setError("Firebase connection issue. Please verify your Firebase configuration in .env, or use Quick Fill below.");
      } else {
        setError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleFillDemo() {
    setEmail("admin@apexveridoc.org");
    setPassword("MasterAdmin2026!");
    setError(null);
  }

  async function handleResetPassword(e: FormEvent) {
    e.preventDefault();
    setResetStatus(null);
    setResetSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetStatus({
        type: "success",
        message: "Password reset link sent! Check your inbox to proceed.",
      });
    } catch {
      setResetStatus({
        type: "error",
        message: "Could not send reset email. Ensure the email is registered or check Firebase configuration.",
      });
    } finally {
      setResetSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-stretch bg-[#080d1a] text-slate-100 font-sans selection:bg-emerald-500/25 selection:text-white relative">
      {/* Left Column: Visual Showcase & Brand Intro (Desktop) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 border-r border-slate-800/80 bg-[#0b1120] relative z-10">
        <div>
          {/* Brand Logo Header */}
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20 transition group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-lg">Apex Veridoc</span>
              <p className="text-[11px] text-slate-400 font-medium">Enterprise Portal</p>
            </div>
          </Link>

          {/* Value Pitch */}
          <div className="mt-14 space-y-4 max-w-lg">
            <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight">
              Manage programmes, attendance & verified credentials.
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed">
              Consolidate multi-session cohort tracking, optical QR check-ins, and accredited digital certificate issuance in one unified platform.
            </p>
          </div>

          {/* Preview Feature Cards */}
          <div className="mt-10 grid grid-cols-2 gap-3 max-w-lg">
            <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 space-y-1.5">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <QrCode className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-semibold text-white">Live Attendance Station</h3>
              <p className="text-[11px] text-slate-400">Optical camera QR and PIN kiosks with deduplication</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 space-y-1.5">
              <div className="h-8 w-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-semibold text-white">Accredited Certificates</h3>
              <p className="text-[11px] text-slate-400">Verifiable credentials with instant public verification</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Apex Veridoc Platform</span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" /> High Availability
          </span>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 sm:p-12 relative z-10">
        <div className="w-full max-w-md space-y-5">
          {/* Mobile Brand Header */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-bold tracking-tight text-white text-base">Apex Veridoc</span>
            </Link>
            <Link to="/verify" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">
              Public Verifier →
            </Link>
          </div>

          {/* Form Card */}
          <div className="card-surface p-6 sm:p-8 bg-[#0b1120] border-slate-800 shadow-xl relative">
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-white">Sign In to Your Workspace</h1>
              <p className="text-xs text-slate-400">
                Access programme cohorts, attendance kiosks, and credential studio.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@yourinstitution.org"
                    className="input pl-10 text-xs min-h-[44px]"
                  />
                </div>
              </div>

              {/* Password input with toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(true);
                      setResetEmail(email);
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="input pl-10 pr-10 text-xs min-h-[44px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me option */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/20 h-4 w-4"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-3 text-xs font-semibold shadow-sm mt-3 min-h-[44px]"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-950/20 border-t-slate-950 animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Sign In to Workspace</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            </form>

            {/* Quick Demo Helper */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span>Fill Demo Test Account</span>
              </button>
            </div>

            {/* Registration Link */}
            <div className="mt-6 pt-5 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-400">
                New organization?{" "}
                <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                  Create account for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="card-surface w-full max-w-md p-6 bg-[#0b1120] border-slate-700 shadow-2xl relative space-y-4">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setResetStatus(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Reset Account Password</h3>
                <p className="text-xs text-slate-400">Receive a secure reset link to your email</p>
              </div>
            </div>

            {resetStatus && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  resetStatus.type === "success"
                    ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-300"
                    : "bg-rose-950/40 border border-rose-500/40 text-rose-300"
                }`}
              >
                {resetStatus.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                )}
                <span>{resetStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    required
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@yourinstitution.org"
                    className="input pl-10 text-xs min-h-[44px]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="btn-ghost text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetSubmitting}
                  className="btn-primary text-xs py-2 px-4"
                >
                  {resetSubmitting ? "Sending Link…" : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


