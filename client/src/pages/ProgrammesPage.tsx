import { useState } from "react";
import { INITIAL_PROGRAMMES, type ProgrammeItem } from "../lib/mockData";
import {
  Plus,
  Search,
  Calendar,
  Clock,
  Radio,
  Award,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState<ProgrammeItem[]>(INITIAL_PROGRAMMES);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Programme Form State
  const [newProg, setNewProg] = useState({
    title: "",
    code: "",
    category: "Tech & AI" as const,
    capacity: 50,
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    totalSessions: 4,
    credentialTemplate: "Accredited Certificate of Professional Mastery",
  });

  const filteredProgrammes = programmes.filter((p) => {
    const matchesFilter = selectedFilter === "ALL" || p.status === selectedFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  function handleCreateProgramme(e: React.FormEvent) {
    e.preventDefault();
    const created: ProgrammeItem = {
      id: `prog-${Date.now()}`,
      title: newProg.title,
      code: newProg.code.toUpperCase(),
      category: newProg.category,
      status: "REGISTRATION_OPEN",
      startDate: newProg.startDate,
      endDate: newProg.endDate,
      registeredCount: 1,
      capacity: Number(newProg.capacity),
      totalSessions: Number(newProg.totalSessions),
      completedSessions: 0,
      attendanceRate: 0,
      credentialTemplate: newProg.credentialTemplate,
      sessions: Array.from({ length: Number(newProg.totalSessions) }).map((_, i) => ({
        id: `sess-new-${i + 1}`,
        title: `Session ${i + 1}: Core Module & Workshop`,
        date: newProg.startDate,
        time: "10:00 - 13:00",
        venue: "Auditorium / Virtual Stream",
        attendedCount: 0,
        status: "UPCOMING",
        pin: Math.floor(1000 + Math.random() * 9000).toString(),
      })),
    };

    setProgrammes([created, ...programmes]);
    setShowCreateModal(false);
    setNewProg({
      title: "",
      code: "",
      category: "Tech & AI",
      capacity: 50,
      startDate: "2026-09-01",
      endDate: "2026-09-30",
      totalSessions: 4,
      credentialTemplate: "Accredited Certificate of Professional Mastery",
    });
  }

  return (
    <div className="space-y-6">
      {/* Header & New Programme CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9662B]/15 border border-[#D9662B]/30 text-[#D9662B] text-xs font-semibold mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Curriculum & Cohorts</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Programme Management</h1>
          <p className="mt-0.5 text-xs sm:text-sm text-[#A89890]">
            Define multi-session cohorts, quotas, attendance gating, and credential criteria.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary text-xs py-2.5 px-4"
        >
          <Plus className="h-4 w-4" />
          <span>New Programme</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#181210] border border-[#D9662B]/20 overflow-x-auto no-scrollbar">
          {["ALL", "ACTIVE", "REGISTRATION_OPEN", "SCHEDULED", "COMPLETED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedFilter === tab
                  ? "bg-[#D9662B]/20 text-white font-semibold border border-[#D9662B]/40 shadow-sm"
                  : "text-[#A89890] hover:text-white hover:bg-[#221A16]"
              }`}
            >
              {tab.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8A7B73]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by code, title..."
            className="input pl-9 text-xs"
          />
        </div>
      </div>

      {/* Programme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredProgrammes.map((prog) => {
          const fillPercentage = Math.round((prog.registeredCount / prog.capacity) * 100);
          return (
            <div
              key={prog.id}
              className="card-surface p-5 sm:p-6 flex flex-col justify-between hover:border-[#D9662B]/40 transition space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="badge-orange">
                      {prog.code}
                    </span>
                    <span className="text-xs text-[#A89890] font-medium">{prog.category}</span>
                  </div>

                  <span
                    className={`stat-badge ${
                      prog.status === "ACTIVE"
                        ? "badge-rose"
                        : prog.status === "REGISTRATION_OPEN"
                        ? "badge-emerald"
                        : prog.status === "COMPLETED"
                        ? "badge-neutral"
                        : "badge-amber"
                    }`}
                  >
                    {prog.status === "ACTIVE" && <Radio className="h-2.5 w-2.5 animate-pulse text-rose-400" />}
                    {prog.status.replace(/_/g, " ")}
                  </span>
                </div>

                <h2 className="mt-3 text-base sm:text-lg font-semibold text-white">
                  {prog.title}
                </h2>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A89890]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-[#8A7B73]" />
                    <span>{prog.startDate} to {prog.endDate.slice(5)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#8A7B73]" />
                    <span>{prog.completedSessions} of {prog.totalSessions} Sessions Done</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-3.5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#A89890]">Enrolled Capacity</span>
                    <span className="text-[#F7F4F0] font-medium">
                      {prog.registeredCount} / {prog.capacity} ({fillPercentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#120E0C] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        fillPercentage >= 90 ? "bg-amber-400" : "bg-[#D9662B]"
                      }`}
                      style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Credential Attestation Rule */}
                <div className="mt-3.5 p-2.5 rounded-xl bg-[#1D1613] border border-[#D9662B]/18 flex items-center gap-2 text-xs text-[#B8AAA2]">
                  <Award className="h-4 w-4 text-[#D9662B] shrink-0" />
                  <span className="truncate">{prog.credentialTemplate}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-[#D9662B]/15 flex items-center justify-between">
                <span className="text-xs text-[#A89890]">
                  {prog.attendanceRate > 0 ? `${prog.attendanceRate}% Avg Attendance` : "No sessions held yet"}
                </span>
                <button className="btn-secondary text-xs py-1.5 px-3">
                  <span>View Details</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#8A7B73]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Programme Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="card-surface w-full max-w-lg p-6 bg-[#181210] border-[#D9662B]/30 shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 text-[#8A7B73] hover:text-white rounded-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4">
              <h2 className="text-lg font-bold text-white">Create New Programme</h2>
              <p className="text-xs text-[#A89890]">Configure curriculum, capacity, and credential parameters</p>
            </div>

            <form onSubmit={handleCreateProgramme} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#F7F4F0] font-medium mb-1">Programme Title</label>
                <input
                  required
                  value={newProg.title}
                  onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
                  placeholder="e.g. Executive Leadership & Governance"
                  className="input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#F7F4F0] font-medium mb-1">Programme Code</label>
                  <input
                    required
                    value={newProg.code}
                    onChange={(e) => setNewProg({ ...newProg, code: e.target.value })}
                    placeholder="e.g. EXEC-2026"
                    className="input uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[#F7F4F0] font-medium mb-1">Category</label>
                  <select
                    value={newProg.category}
                    onChange={(e) =>
                      setNewProg({ ...newProg, category: e.target.value as any })
                    }
                    className="input"
                  >
                    <option value="Tech & AI">Tech & AI</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#F7F4F0] font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newProg.startDate}
                    onChange={(e) => setNewProg({ ...newProg, startDate: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-[#F7F4F0] font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={newProg.endDate}
                    onChange={(e) => setNewProg({ ...newProg, endDate: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#F7F4F0] font-medium mb-1">Attendee Capacity</label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    required
                    value={newProg.capacity}
                    onChange={(e) => setNewProg({ ...newProg, capacity: Number(e.target.value) })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-[#F7F4F0] font-medium mb-1">Total Scheduled Sessions</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    required
                    value={newProg.totalSessions}
                    onChange={(e) => setNewProg({ ...newProg, totalSessions: Number(e.target.value) })}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#F7F4F0] font-medium mb-1">Accredited Certificate Template</label>
                <input
                  required
                  value={newProg.credentialTemplate}
                  onChange={(e) => setNewProg({ ...newProg, credentialTemplate: e.target.value })}
                  className="input"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D9662B]/15">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Publish Programme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



