import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  INITIAL_PROGRAMMES,
  INITIAL_AUDIT_LOGS,
  INITIAL_PARTICIPANTS,
  type ProgrammeItem,
} from "../lib/mockData";
import {
  FolderKanban,
  Users,
  QrCode,
  Award,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Radio,
  CheckCircle2,
  Plus,
  Download,
  Copy,
  Check,
} from "lucide-react";

export default function DashboardPage() {
  const { profile } = useAuth();
  const [programmes] = useState<ProgrammeItem[]>(INITIAL_PROGRAMMES);
  const [auditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [copiedPin, setCopiedPin] = useState(false);

  const activeProgramme = programmes.find((p) => p.status === "ACTIVE") || programmes[0];
  const liveSession = activeProgramme.sessions.find((s) => s.status === "LIVE") || activeProgramme.sessions[3];

  function copyPinToClipboard() {
    if (liveSession?.pin) {
      navigator.clipboard.writeText(liveSession.pin);
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2000);
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner & Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Welcome, {profile?.fullName?.split(" ")[0] || "Administrator"}
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-400">
            Real-time programme oversight, attendance tracking, and credential issuance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/attendance"
            className="btn-secondary text-xs py-2 px-3.5 flex-1 sm:flex-initial"
          >
            <QrCode className="h-3.5 w-3.5 text-emerald-400" />
            <span>Check-in Station</span>
          </Link>
          <Link
            to="/programmes"
            className="btn-primary text-xs py-2 px-3.5 flex-1 sm:flex-initial"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Programme</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Active Programmes */}
        <div className="card-surface p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Cohorts</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <FolderKanban className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-white">
            {programmes.filter((p) => p.status === "ACTIVE" || p.status === "REGISTRATION_OPEN").length}
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Next session today at 09:00</span>
          </p>
        </div>

        {/* Metric 2: Total Registered Attendees */}
        <div className="card-surface p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Enrolled Attendees</span>
            <div className="h-8 w-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-white">225</div>
          <p className="text-[11px] text-teal-400 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +18% vs last cohort
          </p>
        </div>

        {/* Metric 3: Live Attendance Rate */}
        <div className="card-surface p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Avg Attendance</span>
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <QrCode className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-white">95.4%</div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>0 duplicate check-ins</span>
          </p>
        </div>

        {/* Metric 4: Cryptographic Credentials */}
        <div className="card-surface p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Issued Credentials</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-white">142</div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span>100% Validated</span>
          </p>
        </div>
      </div>

      {/* Main Grid: Active Session Control Room + Action Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Session Control Room */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-surface p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
                  <Radio className="h-4 w-4 animate-pulse text-rose-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                      Live Session Active
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-white">
                    {activeProgramme.title}
                  </h2>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-[#0f172a] text-emerald-300 border border-slate-800 font-medium">
                {activeProgramme.code}
              </span>
            </div>

            {/* Current Active Session Details */}
            <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-medium">Active Module</p>
                  <p className="text-sm font-semibold text-slate-100 mt-0.5">
                    {liveSession?.title || "Session 4: Live Enterprise Simulation"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{liveSession?.time} • {liveSession?.venue}</span>
                  </p>
                </div>

                {/* Session PIN Quick Card */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#141d33] border border-slate-700">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Session PIN</span>
                    <span className="text-base font-bold tracking-widest text-emerald-300">
                      {liveSession?.pin || "5723"}
                    </span>
                  </div>
                  <button
                    onClick={copyPinToClipboard}
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition cursor-pointer"
                    title="Copy PIN"
                  >
                    {copiedPin ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Attendance Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-400 font-medium">Session Attendance</span>
                  <span className="text-emerald-400 font-semibold">
                    {liveSession?.attendedCount || 45} / {activeProgramme.registeredCount} Present (93.7%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: "93.7%" }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Link
                  to="/attendance"
                  className="btn-primary text-xs py-2 px-4"
                >
                  <QrCode className="h-4 w-4" />
                  <span>Launch Check-in Station</span>
                </Link>
                <Link
                  to="/programmes"
                  className="btn-secondary text-xs py-2 px-4"
                >
                  <span>View All Sessions</span>
                </Link>
              </div>
            </div>

            {/* Session Roadmap Stepper */}
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400 mb-3">Programme Roadmap</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {activeProgramme.sessions.map((sess, idx) => (
                  <div
                    key={sess.id}
                    className={`p-2.5 rounded-xl border text-xs transition ${
                      sess.status === "LIVE"
                        ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-100 font-medium"
                        : sess.status === "COMPLETED"
                        ? "bg-slate-900 border-slate-800 text-slate-300"
                        : "bg-slate-950/40 border-slate-800/60 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">S{idx + 1}</span>
                      {sess.status === "LIVE" ? (
                        <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />
                      ) : sess.status === "COMPLETED" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                      )}
                    </div>
                    <p className="font-medium text-[11px] truncate">{sess.title.split(":")[1] || sess.title}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{sess.date.slice(5)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Enrolled Candidates Roster Table */}
          <div className="card-surface p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Active Cohort Roster</h3>
                <p className="text-xs text-slate-400">Live attendance status and qualification gating</p>
              </div>
              <Link to="/attendance" className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                Full roster <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">PARTICIPANT</th>
                    <th className="pb-3 font-semibold">ORGANIZATION</th>
                    <th className="pb-3 font-semibold">ATTENDANCE</th>
                    <th className="pb-3 font-semibold">STATUS</th>
                    <th className="pb-3 font-semibold text-right">LAST CHECK-IN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {INITIAL_PARTICIPANTS.slice(0, 4).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3">
                        <p className="font-medium text-slate-100">{p.fullName}</p>
                        <p className="text-[11px] text-slate-400">{p.email}</p>
                      </td>
                      <td className="py-3 text-slate-300">{p.organization}</td>
                      <td className="py-3">
                        <span className="text-emerald-400 font-semibold">{p.attendedSessions}/{p.totalSessions}</span>
                        <span className="text-slate-400 ml-1">({p.attendancePercentage}%)</span>
                      </td>
                      <td className="py-3">
                        <span className="stat-badge bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          {p.credentialStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right text-[11px] text-slate-400">
                        {p.lastCheckIn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Operations & Activity Log */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="card-surface p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to="/credentials"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-slate-200 group-hover:text-emerald-300">Issue Certificates</p>
                    <p className="text-[11px] text-slate-400">44 candidates eligible</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400" />
              </Link>

              <Link
                to="/analytics"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                    <Download className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-slate-200 group-hover:text-teal-300">Export Reports</p>
                    <p className="text-[11px] text-slate-400">PDF & CSV summaries</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-teal-400" />
              </Link>
            </div>
          </div>

          {/* Audit Log Stream */}
          <div className="card-surface p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Activity & Audit Log</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                Live
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Audit log stream for compliance, session tracking, and credential verification.
            </p>

            <div className="space-y-2.5">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-[#0f172a] border border-slate-800/80 space-y-1 text-xs hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      {log.requestId}
                    </span>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>

                  <p className="text-slate-200 font-medium text-[11px]">{log.action}</p>
                  <p className="text-[11px] text-slate-400 truncate">{log.target}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400">
                    <span className="truncate max-w-[140px]">{log.actorRole}</span>
                    <span className="text-emerald-400 font-medium">{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


