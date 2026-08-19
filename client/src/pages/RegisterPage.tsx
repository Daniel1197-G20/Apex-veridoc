import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { registerOrganization, type OrganizationType } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import {
  ShieldCheck,
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  Globe,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const ORG_TYPES: OrganizationType[] = [
  "UNIVERSITY",
  "SCHOOL",
  "COMPANY",
  "NGO",
  "CHURCH",
  "TRAINING_ORGANIZATION",
  "PROFESSIONAL_BODY",
  "CONFERENCE_ORGANIZER",
  "OTHER",
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [form, setForm] = useState({
    organizationName: "",
    organizationType: "COMPANY" as OrganizationType,
    country: "",
    email: "",
    phone: "",
    administratorName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      await registerOrganization({
        organizationName: form.organizationName,
        organizationType: form.organizationType,
        country: form.country,
        phone: form.phone || undefined,
        administratorName: form.administratorName,
      });
      await refreshProfile();
      navigate("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
      if (msg.includes("email-already-in-use")) {
        setError("This email address is already registered. Please sign in instead.");
      } else if (msg.includes("network-request-failed") || msg.includes("api-key-not-valid") || msg.includes("project-not-found")) {
        setError("Firebase connection issue. Please verify your Firebase project credentials in .env.");
      } else {
        setError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#080d1a] px-4 py-8 sm:py-12 font-sans selection:bg-emerald-500/25 selection:text-white relative">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-2.5 mb-6 group relative z-10">
        <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20 transition group-hover:scale-105">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <span className="font-bold tracking-tight text-white text-lg">Apex Veridoc</span>
        </div>
      </Link>

      <div className="card-surface w-full max-w-xl p-6 sm:p-8 bg-[#0b1120] border-slate-800 shadow-xl relative z-10 space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Create Your Organization</h1>
          <p className="mt-1 text-xs text-slate-400">
            Set up an isolated workspace for programmes, live attendance, and digital credential issuance.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Organization Information Group */}
          <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 space-y-3">
            <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              1. Organization Profile
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Organization / Institution Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  required
                  value={form.organizationName}
                  onChange={(e) => update("organizationName", e.target.value)}
                  placeholder="e.g. Apex Institute of Management"
                  className="input pl-10 min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Organization Type
                </label>
                <select
                  value={form.organizationType}
                  onChange={(e) => update("organizationType", e.target.value as OrganizationType)}
                  className="input min-h-[44px]"
                >
                  {ORG_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Country / Region</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    required
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    placeholder="e.g. United Kingdom"
                    className="input pl-10 min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Primary Administrator Profile */}
          <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 space-y-3">
            <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              2. Administrator Account
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  required
                  value={form.administratorName}
                  onChange={(e) => update("administratorName", e.target.value)}
                  placeholder="e.g. Eleanor Sterling"
                  className="input pl-10 min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="admin@institution.org"
                    className="input pl-10 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+44 7700 900077"
                    className="input pl-10 min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="input pl-10 pr-10 min-h-[44px]"
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
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Includes organization workspace and credential verification authority.</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-3 text-xs font-semibold shadow-sm mt-2 min-h-[44px]"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-950/20 border-t-slate-950 animate-spin" />
                Setting up workspace…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Create Organization Workspace</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Already registered?{" "}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
              Sign in to portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


