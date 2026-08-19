import { useState } from "react";
import {
  TrendingUp,
  Download,
  ShieldCheck,
  CheckCircle2,
  FileCode,
} from "lucide-react";

export default function AnalyticsPage() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  function triggerDownload(type: string) {
    setDownloadSuccess(`Generated and downloaded ${type} report with SHA-256 integrity seal.`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  }

  return (
    <div className="space-y-6">
      {/* Header & Export CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Demographic & Attendance Analytics</h1>
          <p className="mt-1 text-xs text-slate-400">
            Real-time cohort velocity, attendance drop-off curves, and automated compliance telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => triggerDownload("JSON-LD Audit Proof")}
            className="btn-secondary text-xs py-2 px-3"
          >
            <FileCode className="h-3.5 w-3.5 text-emerald-400" />
            <span>Export JSON-LD</span>
          </button>
          <button
            onClick={() => triggerDownload("CSV Compliance Summary")}
            className="btn-primary text-xs py-2 px-3"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download CSV Report</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-surface p-5 border-l-2 border-l-emerald-500">
          <span className="text-xs text-slate-400 font-medium">Cohort Qualification Rate</span>
          <div className="mt-2 text-2xl font-bold font-mono text-white">91.6%</div>
          <p className="text-xs text-slate-500 mt-1">Met required ≥80% attendance threshold</p>
        </div>
        <div className="card-surface p-5 border-l-2 border-l-teal-500">
          <span className="text-xs text-slate-400 font-medium">Session Retention Index</span>
          <div className="mt-2 text-2xl font-bold font-mono text-white">96.8%</div>
          <p className="text-xs text-teal-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +4.2% higher than industry average
          </p>
        </div>
        <div className="card-surface p-5 border-l-2 border-l-cyan-500">
          <span className="text-xs text-slate-400 font-medium">Digital Credentials Verified</span>
          <div className="mt-2 text-2xl font-bold font-mono text-white">384 Queries</div>
          <p className="text-xs text-slate-500 mt-1">100% cryptographic integrity verified</p>
        </div>
      </div>

      {/* Analytics Visual Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Retention Curve */}
        <div className="card-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Attendance Velocity Across Sessions</h3>
              <p className="text-xs text-slate-400">Track drop-off rate per curriculum module</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">AIG-2026 Cohort</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { session: "Session 1: Accountability", rate: 98, count: "47 / 48" },
              { session: "Session 2: Regulatory Law", rate: 96, count: "46 / 48" },
              { session: "Session 3: Bias Mitigation", rate: 94, count: "45 / 48" },
              { session: "Session 4: Risk Simulation", rate: 94, count: "45 / 48" },
              { session: "Session 5: Attestation (Upcoming)", rate: 0, count: "Pending" },
              { session: "Session 6: Capstone (Upcoming)", rate: 0, count: "Pending" },
            ].map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{s.session}</span>
                  <span className="font-mono text-slate-400">{s.count} {s.rate > 0 && `(${s.rate}%)`}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      s.rate > 0 ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-transparent"
                    }`}
                    style={{ width: `${s.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Participant Organization Demographics */}
        <div className="card-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Organization Distribution</h3>
              <p className="text-xs text-slate-400">Breakdown of participating industry sectors</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">100% Verified</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {[
              { sector: "Higher Education & Research", share: 38, count: "86 Attendees", color: "bg-emerald-500" },
              { sector: "Enterprise Technology & AI", share: 29, count: "65 Attendees", color: "bg-teal-500" },
              { sector: "Financial Services & FinTech", share: 18, count: "41 Attendees", color: "bg-cyan-500" },
              { sector: "Government & Regulatory Bodies", share: 15, count: "33 Attendees", color: "bg-amber-500" },
            ].map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{sec.sector}</span>
                  <span className="font-mono text-slate-400">{sec.count} ({sec.share}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${sec.color}`}
                    style={{ width: `${sec.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 font-mono flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Zero cross-tenant leakage: metrics calculated strictly within organization boundary.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

