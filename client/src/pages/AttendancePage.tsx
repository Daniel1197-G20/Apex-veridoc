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
            <span className="badge-rose">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
              Live Session Active
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1.5">
            Attendance & Check-in Station
          </h1>
          <p className="text-xs text-[#A89890] mt-0.5">
            {activeProgramme.title} — <span className="text-[#F08047] font-medium">{liveSession.title}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#1D1613] border border-[#D9662B]/25 text-xs text-[#B8AAA2]">
            PIN: <span className="text-[#F08047] font-bold font-mono ml-1">{liveSession.pin}</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#D9662B]/15 border border-[#D9662B]/30 text-xs text-white">
            Venue: {liveSession.venue}
          </span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#181210] border border-[#D9662B]/20 w-fit">
        <button
          onClick={() => setActiveTab("QR")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === "QR"
              ? "bg-[#D9662B] text-white shadow-sm font-semibold"
              : "text-[#A89890] hover:text-white hover:bg-[#221A16]"
          }`}
        >
          <QrCode className="h-4 w-4" />
          <span>Camera & QR Token</span>
        </button>
        <button
          onClick={() => setActiveTab("ROSTER")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === "ROSTER"
              ? "bg-[#D9662B] text-white shadow-sm font-semibold"
              : "text-[#A89890] hover:text-white hover:bg-[#221A16]"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Live Roster Toggle</span>
        </button>
        <button
          onClick={() => setActiveTab("PIN")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === "PIN"
              ? "bg-[#D9662B] text-white shadow-sm font-semibold"
              : "text-[#A89890] hover:text-white hover:bg-[#221A16]"
          }`}
        >
          <Key className="h-4 w-4" />
          <span>Session PIN Kiosk</span>
        </button>
      </div>

      {/* Live Verification Notice Banner */}
      {scanMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs animate-in slide-in-from-top-2 duration-150 ${
            scanMessage.type === "success"
              ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/50 border-rose-500/40 text-rose-200"
          }`}
        >
          <div className="flex items-center gap-3">
            {scanMessage.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
            )}
            <span className="leading-relaxed">{scanMessage.text}</span>
          </div>
          <button
            onClick={() => setScanMessage(null)}
            className="text-xs hover:underline ml-4 text-[#A89890] hover:text-white cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tab 1: QR Scanner View */}
      {activeTab === "QR" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Virtual Scanner Viewport */}
          <div className="card-surface p-6 flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#140E0C]">
            <div className="relative w-64 h-64 border border-[#D9662B]/30 rounded-2xl flex flex-col items-center justify-center p-6 bg-[#181210]/80">
              {/* Target reticle */}
              <div className="absolute inset-4 rounded-xl border border-dashed border-[#D9662B]/40 pointer-events-none" />

              {/* Animated laser line */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#D9662B] to-transparent animate-pulse" />

              <Scan className="h-12 w-12 text-[#D9662B] mb-2" />
              <p className="text-xs font-semibold text-white">Target Attendee QR Token</p>
              <p className="text-[11px] text-[#A89890] mt-1">Optical scan / RFID simulation</p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#A89890]">
              <ShieldCheck className="h-4 w-4 text-[#D9662B]" />
              <span>Deduplication Hash Guard Active</span>
            </div>
          </div>

          {/* Quick Simulation Candidates */}
          <div className="lg:col-span-2 card-surface p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Simulate Attendee Badge Scan</h3>
                <p className="text-xs text-[#A89890]">Click any candidate below to test live optical recognition</p>
              </div>
              <span className="badge-orange">5 Registered Samples</span>
            </div>

            <div className="space-y-2.5">
              {participants.map((p) => {
                const isCheckedIn = p.attendedSessions === 4;
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#1D1613] border border-[#D9662B]/15 hover:border-[#D9662B]/40 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isCheckedIn
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-[#281F1A] text-[#A89890] border border-[#D9662B]/20"
                        }`}
                      >
                        {isCheckedIn ? <Check className="h-4 w-4" /> : <QrCode className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{p.fullName}</p>
                        <p className="text-[11px] text-[#A89890]">{p.organization}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[#A89890] hidden sm:inline">
                        {p.lastCheckIn || "Not checked in"}
                      </span>
                      <button
                        onClick={() => handleSimulateScan(p)}
                        disabled={isScanning}
                        className="btn-primary text-xs py-1.5 px-3"
                      >
                        <Scan className="h-3.5 w-3.5" />
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
              <p className="text-xs text-[#A89890]">One-touch manual check-in toggle for coordinators</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8A7B73]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roster..."
                className="input pl-9 text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="border-b border-[#D9662B]/15 text-[#A89890]">
                  <th className="pb-3 font-semibold">NAME & EMAIL</th>
                  <th className="pb-3 font-semibold">AFFILIATION</th>
                  <th className="pb-3 font-semibold">PROGRESS</th>
                  <th className="pb-3 font-semibold">SESSION 4 STATUS</th>
                  <th className="pb-3 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9662B]/10 text-[#F7F4F0]">
                {filteredParticipants.map((p) => {
                  const isPresent = p.attendedSessions === 4;
                  return (
                    <tr key={p.id} className="hover:bg-[#221A16]/50 transition">
                      <td className="py-3">
                        <p className="font-medium text-white">{p.fullName}</p>
                        <p className="text-[11px] text-[#A89890]">{p.email}</p>
                      </td>
                      <td className="py-3 text-[#B8AAA2]">{p.organization}</td>
                      <td className="py-3">
                        <span className="text-[#F08047] font-semibold">{p.attendedSessions}/{p.totalSessions}</span>
                        <span className="text-[#8A7B73] ml-1">({p.attendancePercentage}%)</span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`stat-badge ${
                            isPresent
                              ? "badge-emerald"
                              : "badge-neutral"
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
                              ? "bg-[#221A16] text-[#B8AAA2] hover:bg-rose-500/20 hover:text-rose-300 border border-[#D9662B]/20"
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
          <div className="h-12 w-12 rounded-2xl bg-[#D9662B]/15 text-[#D9662B] flex items-center justify-center mx-auto border border-[#D9662B]/30">
            <Key className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Attendee Self Check-in Kiosk</h2>
            <p className="text-xs text-[#A89890] mt-1">
              Enter the 4-digit code displayed on the main auditorium screen:
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#140E0C] border border-[#D9662B]/30 inline-block font-mono text-2xl font-bold tracking-widest text-[#F08047]">
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


