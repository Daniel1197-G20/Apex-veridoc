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
  Sparkles,
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#120E0C] px-4 py-8 sm:py-12 font-sans selection:bg-[#D9662B]/30 selection:text-white wallpaper-surface relative">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-2.5 mb-6 group relative z-10">
        <div className="h-10 w-10 rounded-xl bg-[#D9662B] flex items-center justify-center text-white font-bold shadow-md shadow-[#D9662B]/30 transition group-hover:scale-105">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <span className="font-bold tracking-tight text-white text-lg">Apex Veridoc</span>
        </div>
      </Link>

      <div className="card-surface w-full max-w-xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9662B]/15 border border-[#D9662B]/30 text-[#D9662B] text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Workspace Setup</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white pt-1">Create Your Organization</h1>
          <p className="text-xs text-[#A89890]">
            Set up an isolated workspace for programmes, live attendance, and digital credential issuance.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Organization Information Group */}
          <div className="p-4 rounded-xl bg-[#181210] border border-[#D9662B]/18 space-y-3">
            <p className="text-xs text-[#F7F4F0] font-semibold uppercase tracking-wider">
              1. Organization Profile
            </p>

            <div>
              <label className="block text-xs font-medium text-[#F7F4F0] mb-1">
                Organization / Institution Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7B73]" />
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
                <label className="block text-xs font-medium text-[#F7F4F0] mb-1">
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
                <label className="block text-xs font-medium text-[#F7F4F0] mb-1">Country / Region</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7B73]" />
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
          <div className="p-4 rounded-xl bg-[#181210] border border-[#D9662B]/18 space-y-3">
            <p className="text-xs text-[#F7F4F0] font-semibold uppercase tracking-wider">
              2. Administrator Account
            </p>

            <div>
              <label className="block text-xs font-medium text-[#F7F4F0] mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7B73]" />
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
                <label className="block text-xs font-medium text-[#F7F4F0] mb-1">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7B73]" />
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
                <label className="block text-xs font-medium text-[#F7F4F0] mb-1">Phone (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7B73]" />
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
              <label className="block text-xs font-medium text-[#F7F4F0] mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7B73]" />
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7B73] hover:text-white transition cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#A89890]">
            <CheckCircle2 className="h-4 w-4 text-[#D9662B] shrink-0" />
            <span>Includes organization workspace and credential verification authority.</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-3 text-xs font-semibold mt-2 min-h-[44px]"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
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

        <div className="pt-4 border-t border-[#D9662B]/15 text-center">
          <p className="text-xs text-[#A89890]">
            Already registered?{" "}
            <Link to="/login" className="text-[#D9662B] hover:text-[#F08047] font-semibold">
              Sign in to portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}



