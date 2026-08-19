import { useState } from "react";
import { INITIAL_PARTICIPANTS, INITIAL_PROGRAMMES, type ParticipantItem } from "../lib/mockData";
import {
  QrCode,
  Key,
  Users,
  CheckCircle2,
  AlertCircle,
  Scan,
  Search,
  Check,
  ShieldCheck,
} from "lucide-react";

export default function AttendancePage() {
  const [participants, setParticipants] = useState<ParticipantItem[]>(INITIAL_PARTICIPANTS);
  const [activeTab, setActiveTab] = useState<"QR" | "ROSTER" | "PIN">("QR");
  const [scanMessage, setScanMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [enteredPin, setEnteredPin] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const activeProgramme = INITIAL_PROGRAMMES[0];
  const liveSession = activeProgramme.sessions[3]; // Session 4

  // Simulate scanning a participant QR token
  function handleSimulateScan(participant: ParticipantItem) {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const isAlreadyChecked = participant.attendedSessions === 4;
      if (isAlreadyChecked) {
        setScanMessage({
          text: `[DEDUPLICATION PREVENTED]: ${participant.fullName} already checked into Session 4 at 09:08.`,
          type: "error",
        });
      } else {
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === participant.id
              ? {
                  ...p,
                  attendedSessions: 4,
                  attendancePercentage: 100,
                  lastCheckIn: "Just now (QR Scan)",
                }
              : p
          )
        );
        setScanMessage({
          text: `[CHECK-IN CONFIRMED]: ${participant.fullName} (${participant.organization}) verified for Session 4.`,
          type: "success",
        });
      }
    }, 600);
  }

  // Toggle roster status manually
  function toggleAttendance(id: string) {
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isAttended = p.attendedSessions === 4;
          const nextCount = isAttended ? 3 : 4;
          return {
            ...p,
            attendedSessions: nextCount,
            attendancePercentage: Math.round((nextCount / p.totalSessions) * 100),
            lastCheckIn: isAttended ? "Reverted" : "Just now (Manual)",
          };
        }
        return p;
      })
    );
  }

  // Validate Session PIN
  function handleVerifyPin(e: React.FormEvent) {
    e.preventDefault();
    if (enteredPin === liveSession.pin) {
      setScanMessage({
        text: `[PIN VERIFIED]: Access granted for Session 4 (PIN ${enteredPin}).`,
        type: "success",
      });
      setEnteredPin("");
    } else {
      setScanMessage({
        text: `[INVALID PIN]: "${enteredPin}" does not match active Session 4 PIN (${liveSession.pin}).`,
        type: "error",
      });
    }
  }

  const filteredParticipants = participants.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />
            <span className="text-xs font-mono uppercase text-rose-400 font-semibold tracking-wider">
              Live Session Active
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Attendance & Check-in Station
          </h1>
          <p className="text-xs text-slate-400">
            {activeProgramme.title} — <span className="text-emerald-400 font-medium">{liveSession.title}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#0a101d] border border-slate-800 text-xs font-mono text-slate-300">
            PIN: <span className="text-emerald-400 font-bold">{liveSession.pin}</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
            Venue: {liveSession.venue}
          </span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0a101d] border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab("QR")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === "QR"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm font-semibold"
              : "text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60"
          }`}
        >
          <QrCode className="h-4 w-4" />
          <span>Camera & QR Token</span>
        </button>
        <button
          onClick={() => setActiveTab("ROSTER")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === "ROSTER"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm font-semibold"
              : "text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Live Roster Toggle</span>
        </button>
        <button
          onClick={() => setActiveTab("PIN")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === "PIN"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm font-semibold"
              : "text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60"
          }`}
        >
          <Key className="h-4 w-4" />
          <span>Session PIN Kiosk</span>
        </button>
      </div>

      {/* Live Verification Notice Banner */}
      {scanMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono animate-in slide-in-from-top-2 duration-150 ${
            scanMessage.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/40 border-rose-500/40 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-3">
            {scanMessage.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
            )}
            <span>{scanMessage.text}</span>
          </div>
          <button
            onClick={() => setScanMessage(null)}
            className="text-xs hover:underline ml-4 text-slate-400 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tab 1: QR Scanner View */}
      {activeTab === "QR" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Virtual Scanner Viewport */}
          <div className="card-surface p-6 flex flex-col items-center justify-center text-center relative overflow-hidden bg-slate-950/80">
            <div className="relative w-64 h-64 border-2 border-dashed border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center p-6 bg-[#0a101d]/60">
              {/* Corner targeting indicators */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400 rounded-tl" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400 rounded-tr" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400 rounded-bl" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400 rounded-br" />

              {/* Animated laser line */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />

              <Scan className="h-12 w-12 text-emerald-400/80 mb-2" />
              <p className="text-xs font-semibold text-white">Target Attendee QR Token</p>
              <p className="text-[11px] text-slate-400 mt-1">Optical scan / RFID simulation</p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Deduplication Hash Guard Active</span>
            </div>
          </div>

          {/* Quick Simulation Candidates */}
          <div className="lg:col-span-2 card-surface p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Simulate Attendee Badge Scan</h3>
                <p className="text-xs text-slate-400">Click any candidate below to test live optical recognition</p>
              </div>
              <span className="text-xs font-mono text-emerald-400">5 Registered Samples</span>
            </div>

            <div className="space-y-2.5">
              {participants.map((p) => {
                const isCheckedIn = p.attendedSessions === 4;
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isCheckedIn
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {isCheckedIn ? <Check className="h-4 w-4" /> : <QrCode className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200">{p.fullName}</p>
                        <p className="text-[11px] text-slate-400">{p.organization}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                        {p.lastCheckIn || "Not checked in"}
                      </span>
                      <button
                        onClick={() => handleSimulateScan(p)}
                        disabled={isScanning}
                        className="btn-primary text-xs py-1.5 px-3"
                      >
                        <Scan className="h-3 w-3" />
                        <span>Scan Token</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Roster Manual Toggle */}
      {activeTab === "ROSTER" && (
        <div className="card-surface p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Full Cohort Roster</h3>
              <p className="text-xs text-slate-400">One-touch manual check-in toggle for coordinators</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roster..."
                className="input pl-9 text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="pb-3 font-medium">NAME & EMAIL</th>
                  <th className="pb-3 font-medium">AFFILIATION</th>
                  <th className="pb-3 font-medium">PROGRESS</th>
                  <th className="pb-3 font-medium">SESSION 4 STATUS</th>
                  <th className="pb-3 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredParticipants.map((p) => {
                  const isPresent = p.attendedSessions === 4;
                  return (
                    <tr key={p.id} className="hover:bg-slate-800/20 transition">
                      <td className="py-3">
                        <p className="font-medium text-slate-100">{p.fullName}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{p.email}</p>
                      </td>
                      <td className="py-3">{p.organization}</td>
                      <td className="py-3 font-mono">
                        <span className="text-emerald-400 font-semibold">{p.attendedSessions}/{p.totalSessions}</span>
                        <span className="text-slate-500 ml-1">({p.attendancePercentage}%)</span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`stat-badge ${
                            isPresent
                              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {isPresent ? "PRESENT" : "ABSENT"}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => toggleAttendance(p.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                            isPresent
                              ? "bg-slate-800 text-slate-300 hover:bg-rose-500/20 hover:text-rose-300 border border-slate-700"
                              : "btn-primary py-1 px-3"
                          }`}
                        >
                          {isPresent ? "Mark Absent" : "Check In"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Session PIN Entry Kiosk */}
      {activeTab === "PIN" && (
        <div className="card-surface p-8 max-w-md mx-auto text-center space-y-5">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <Key className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Attendee Self Check-in Kiosk</h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter the 4-digit code displayed on the main auditorium screen:
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 inline-block font-mono text-2xl font-bold tracking-widest text-emerald-300">
            {liveSession.pin}
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-4">
            <input
              type="text"
              maxLength={4}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="Enter 4 digits..."
              className="input text-center text-lg font-mono tracking-widest"
            />
            <button type="submit" className="btn-primary w-full py-2.5 text-xs">
              Confirm Check-in
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

