import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  QrCode,
  Award,
  BarChart3,
  ShieldCheck,
  Building2,
  LogOut,
  Bell,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Cloud,
} from "lucide-react";

export default function AppLayout() {
  const { profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);

  const orgName = profile?.memberships?.[0]?.organizationId
    ? profile.memberships[0].organizationId.replace(/^org-/, "").replace(/-/g, " ").toUpperCase()
    : "APEX VERIDOC ACADEMY";

  const primaryRole = profile?.memberships?.[0]?.role ?? "ORGANIZATION_OWNER";

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Programmes",
      path: "/programmes",
      icon: FolderKanban,
      badge: "4 Active",
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: QrCode,
      badge: "Live",
      badgeHighlight: true,
    },
    {
      name: "Credentials",
      path: "/credentials",
      icon: Award,
      badge: null,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
      badge: null,
    },
  ];

  async function handleSignOut() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-emerald-500/25 selection:text-white">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-68 flex-col border-r border-slate-800/80 bg-[#0b1120] backdrop-blur-xl shrink-0">
        {/* Brand & Organization Header */}
        <div className="p-5 border-b border-slate-800/80">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20 text-slate-950 font-bold transition-transform group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white text-base">Apex Veridoc</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Enterprise Portal</p>
            </div>
          </Link>

          {/* Active Tenant Context Card */}
          <div className="mt-4 relative">
            <button
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition text-left text-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="h-6 w-6 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/25">
                  <Building2 className="h-3.5 w-3.5" />
                </div>
                <div className="truncate">
                  <p className="font-semibold text-slate-200 truncate">{orgName}</p>
                  <p className="text-[10px] text-slate-400">
                    {primaryRole.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-1" />
            </button>

            {showOrgDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1.5 p-2 rounded-xl bg-[#0f172a] border border-slate-700 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2 py-1 text-[10px] text-slate-400 uppercase font-semibold">
                  Active Organization
                </div>
                <div className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/30">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{orgName}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <Link
                    to="/register"
                    onClick={() => setShowOrgDropdown(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-emerald-300 hover:bg-slate-800/60 rounded-lg transition"
                  >
                    + Register New Organization
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            Platform
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition duration-150 group ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.badgeHighlight
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold"
                        : "bg-slate-800 text-slate-400 border border-slate-700/60"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-5 px-3 pb-2 text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            Public Services
          </div>
          <Link
            to="/verify"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-emerald-300 hover:bg-slate-800/50 transition"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-slate-400" />
              <span>Public Verification</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </nav>

        {/* Cloud Backend Indicator */}
        <div className="p-3.5 m-3 rounded-xl bg-[#0f172a] border border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">Firebase Cloud</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Connected to Cloud Firestore & Storage.
          </p>
        </div>

        {/* User Footer Profile */}
        <div className="p-3.5 border-t border-slate-800 flex items-center justify-between bg-[#080d1a]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/30 shrink-0">
              {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {profile?.fullName || "Administrator"}
              </p>
              <p className="text-[11px] text-slate-400 truncate">{profile?.email || "admin@apexveridoc.org"}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header (Desktop & Mobile) */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 md:h-16 px-4 md:px-8 border-b border-slate-800/80 bg-[#080d1a]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#0f172a] border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="font-bold text-white text-sm">Apex Veridoc</span>
              </Link>
              <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-400">Platform</span>
                <span>/</span>
                <span className="text-slate-100 font-semibold capitalize">
                  {location.pathname.replace("/", "") || "Dashboard"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f172a] border border-slate-800 text-xs text-slate-400 w-60 focus-within:border-emerald-500/50 transition">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidates, cohorts..."
                className="bg-transparent border-none outline-none text-xs text-slate-200 placeholder-slate-400 w-full"
              />
            </div>

            <Link
              to="/verify"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-[#0f172a] hover:bg-slate-800 text-slate-200 text-xs font-medium transition"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Verify</span>
            </Link>

            <button
              className="relative p-2 rounded-xl bg-[#0f172a] border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-400" />
            </button>

            {/* Mobile quick avatar */}
            <div className="lg:hidden h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/30 shrink-0">
              {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : "A"}
            </div>
          </div>
        </header>

        {/* Mobile Slide-down Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden p-4 bg-[#0b1120] border-b border-slate-800 space-y-2 animate-in slide-in-from-top-3 duration-150">
            <div className="px-3 py-1 text-[10px] uppercase font-semibold text-slate-400">
              Navigation
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-3 py-2">
              <span className="text-xs text-slate-400 truncate max-w-[200px]">
                {profile?.email || "admin@apexveridoc.org"}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:underline font-medium cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Page Content Outlet with bottom padding for mobile bar */}
        <main className="flex-1 px-4 py-6 md:p-8 pb-24 lg:pb-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Thumb-friendly on mobile devices) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b1120]/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                isActive ? "text-emerald-400 font-semibold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                {item.badgeHighlight && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


