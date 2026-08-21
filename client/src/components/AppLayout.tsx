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
    <div className="flex min-h-screen bg-[#120E0C] text-[#F7F4F0] font-sans selection:bg-[#D9662B]/30 selection:text-white wallpaper-surface">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-68 flex-col border-r border-[#D9662B]/15 bg-[#181310]/95 backdrop-blur-xl shrink-0">
        {/* Brand & Organization Header */}
        <div className="p-5 border-b border-[#D9662B]/15">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-[#D9662B] flex items-center justify-center shadow-md shadow-[#D9662B]/30 text-white font-bold transition-transform group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white text-base">Apex Veridoc</span>
              </div>
              <p className="text-[11px] text-[#A89890] font-medium">Fintech & Credential Portal</p>
            </div>
          </Link>

          {/* Active Tenant Context Card */}
          <div className="mt-4 relative">
            <button
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#221A16] border border-[#D9662B]/20 hover:border-[#D9662B]/40 transition text-left text-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="h-6 w-6 rounded-lg bg-[#D9662B]/15 text-[#D9662B] flex items-center justify-center shrink-0 border border-[#D9662B]/30">
                  <Building2 className="h-3.5 w-3.5" />
                </div>
                <div className="truncate">
                  <p className="font-semibold text-[#F7F4F0] truncate">{orgName}</p>
                  <p className="text-[10px] text-[#A89890]">
                    {primaryRole.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#A89890] shrink-0 ml-1" />
            </button>

            {showOrgDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1.5 p-2 rounded-xl bg-[#221A16] border border-[#D9662B]/30 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2 py-1 text-[10px] text-[#A89890] uppercase font-semibold">
                  Active Organization
                </div>
                <div className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#D9662B]/15 text-[#F7F4F0] text-xs font-medium border border-[#D9662B]/30">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#D9662B] shrink-0" />
                  <span className="truncate">{orgName}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-[#D9662B]/15">
                  <Link
                    to="/register"
                    onClick={() => setShowOrgDropdown(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#D9662B] hover:text-white hover:bg-[#D9662B]/20 rounded-lg transition"
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
          <div className="px-3 pb-2 text-[10px] uppercase font-semibold tracking-wider text-[#8A7B73]">
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
                    ? "bg-[#D9662B]/15 text-white border border-[#D9662B]/40 font-semibold shadow-sm"
                    : "text-[#B8AAA2] hover:text-white hover:bg-[#221A16]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-[#D9662B]" : "text-[#8A7B73] group-hover:text-[#F7F4F0]"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.badgeHighlight
                        ? "bg-[#D9662B] text-white font-bold shadow-sm shadow-[#D9662B]/40"
                        : "bg-[#221A16] text-[#A89890] border border-[#D9662B]/20"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-5 px-3 pb-2 text-[10px] uppercase font-semibold tracking-wider text-[#8A7B73]">
            Public Services
          </div>
          <Link
            to="/verify"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#B8AAA2] hover:text-[#D9662B] hover:bg-[#221A16] transition"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-[#8A7B73]" />
              <span>Public Verification</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-[#8A7B73]" />
          </Link>
        </nav>

        {/* Cloud Backend Indicator */}
        <div className="p-3.5 m-3 rounded-xl bg-[#221A16] border border-[#D9662B]/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-[#D9662B]" />
              <span className="text-xs font-semibold text-[#F7F4F0]">Firebase Cloud</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D9662B]/20 text-[#D9662B] border border-[#D9662B]/30 flex items-center gap-1 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9662B] animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-[11px] text-[#A89890] leading-relaxed">
            Connected to Cloud Firestore & Storage.
          </p>
        </div>

        {/* User Footer Profile */}
        <div className="p-3.5 border-t border-[#D9662B]/15 flex items-center justify-between bg-[#120E0C]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-[#D9662B]/20 text-[#D9662B] flex items-center justify-center font-bold text-xs border border-[#D9662B]/30 shrink-0">
              {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-[#F7F4F0] truncate">
                {profile?.fullName || "Administrator"}
              </p>
              <p className="text-[11px] text-[#A89890] truncate">{profile?.email || "admin@apexveridoc.org"}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="p-1.5 text-[#8A7B73] hover:text-[#D9662B] hover:bg-[#221A16] rounded-lg transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header (Desktop & Mobile) */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 md:h-16 px-4 md:px-8 border-b border-[#D9662B]/15 bg-[#120E0C]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#221A16] border border-[#D9662B]/20 text-[#F7F4F0] hover:bg-[#2C221D]"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-[#D9662B] flex items-center justify-center text-white font-bold">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="font-bold text-white text-sm">Apex Veridoc</span>
              </Link>
              <div className="hidden lg:flex items-center gap-2 text-xs text-[#A89890]">
                <span>Platform</span>
                <span>/</span>
                <span className="text-[#F7F4F0] font-semibold capitalize">
                  {location.pathname.replace("/", "") || "Dashboard"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1A1411] border border-[#D9662B]/20 text-xs text-[#A89890] w-60 focus-within:border-[#D9662B] transition">
              <Search className="h-3.5 w-3.5 text-[#8A7B73]" />
              <input
                type="text"
                placeholder="Search candidates, cohorts..."
                className="bg-transparent border-none outline-none text-xs text-[#F7F4F0] placeholder-[#8A7B73] w-full"
              />
            </div>

            <Link
              to="/verify"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D9662B]/30 bg-[#221A16] hover:bg-[#2C221D] text-[#F7F4F0] text-xs font-medium transition"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#D9662B]" />
              <span>Verify</span>
            </Link>

            <button
              className="relative p-2 rounded-xl bg-[#221A16] border border-[#D9662B]/20 text-[#F7F4F0] hover:bg-[#2C221D] transition cursor-pointer"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#D9662B]" />
            </button>

            {/* Mobile quick avatar */}
            <div className="lg:hidden h-8 w-8 rounded-lg bg-[#D9662B]/20 text-[#D9662B] flex items-center justify-center font-bold text-xs border border-[#D9662B]/30 shrink-0">
              {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : "A"}
            </div>
          </div>
        </header>

        {/* Mobile Slide-down Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden p-4 bg-[#181310] border-b border-[#D9662B]/20 space-y-2 animate-in slide-in-from-top-3 duration-150">
            <div className="px-3 py-1 text-[10px] uppercase font-semibold text-[#8A7B73]">
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
                      ? "bg-[#D9662B]/20 text-white border border-[#D9662B]/40 font-semibold"
                      : "text-[#B8AAA2] hover:bg-[#221A16] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-4 w-4 ${isActive ? "text-[#D9662B]" : "text-[#8A7B73]"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#221A16] text-[#A89890] border border-[#D9662B]/20">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#D9662B]/15 flex items-center justify-between px-3 py-2">
              <span className="text-xs text-[#A89890] truncate max-w-[200px]">
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#181310]/95 backdrop-blur-xl border-t border-[#D9662B]/20 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                isActive ? "text-[#D9662B] font-semibold" : "text-[#8A7B73] hover:text-[#F7F4F0]"
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? "text-[#D9662B]" : "text-[#8A7B73]"}`} />
                {item.badgeHighlight && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#D9662B] animate-pulse" />
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


