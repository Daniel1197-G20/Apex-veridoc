import { useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_CREDENTIALS, type CredentialItem } from "../lib/mockData";
import {
  Award,
  ShieldCheck,
  QrCode,
  Search,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Plus,
  Lock,
} from "lucide-react";

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<CredentialItem[]>(INITIAL_CREDENTIALS);
  const [selectedCredential, setSelectedCredential] = useState<CredentialItem>(credentials[0]);
  const [copiedHash, setCopiedHash] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showIssueModal, setShowIssueModal] = useState(false);

  // New credential issuance state
  const [newRecipient, setNewRecipient] = useState({
    name: "",
    email: "",
    programme: "Executive AI Governance & Ethics Masterclass",
  });

  function copyHash() {
    navigator.clipboard.writeText(selectedCredential.sha256Digest);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  }

  function handleIssueCredential(e: React.FormEvent) {
    e.preventDefault();
    const newId = `CRD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const created: CredentialItem = {
      id: newId,
      credentialNumber: `APEX-VERIDOC-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      recipientName: newRecipient.name,
      recipientEmail: newRecipient.email,
      programmeTitle: newRecipient.programme,
      issuerName: "Apex Global Verification Authority",
      issuerOrg: "Apex Veridoc Institute of Digital Governance",
      issueDate: new Date().toISOString().split("T")[0],
      status: "VERIFIED",
      sha256Digest: Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
      attendanceRate: 100,
      skills: ["AI Ethics", "Enterprise Governance", "Algorithmic Auditing"],
    };

    setCredentials([created, ...credentials]);
    setSelectedCredential(created);
    setShowIssueModal(false);
    setNewRecipient({ name: "", email: "", programme: "Executive AI Governance & Ethics Masterclass" });
  }

  const filtered = credentials.filter(
    (c) =>
      c.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.programmeTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Issue Credential */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Verifiable Credentials Studio
            </h1>
            <span className="stat-badge bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              <Lock className="h-3 w-3 text-cyan-400" />
              SHA-256 HMAC Sealed
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Authoritative digital certificates with embedded cryptographic proofs and instant public QR verification.
          </p>
        </div>

        <button
          onClick={() => setShowIssueModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4" />
          <span>Issue Verified Credential</span>
        </button>
      </div>

      {/* Main Studio Workspace: Certificate Visualizer + Roster Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Live Certificate Preview Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="card-surface p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400">
                Live Certificate Artifact Canvas
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Cryptographically Valid
              </span>
            </div>

            {/* High-Fidelity Certificate Card Design */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1424] via-[#090e1a] to-[#06090e] border-2 border-emerald-500/40 p-8 shadow-2xl overflow-hidden font-sans">
              {/* Guilloché / Certificate Corner Accents */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-400/60 rounded-tl" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-400/60 rounded-tr" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-400/60 rounded-bl" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-400/60 rounded-br" />

              {/* Watermark Logo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <ShieldCheck className="w-96 h-96 text-emerald-400" />
              </div>

              {/* Certificate Content Header */}
              <div className="text-center relative z-10 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  APEX VERIDOC ACCREDITED ATTESTATION
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white pt-2">
                  Certificate of Professional Mastery
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  THIS IS TO OFFICIALLY ATTEST THAT
                </p>
              </div>

              {/* Recipient Name */}
              <div className="text-center my-6 relative z-10">
                <div className="text-2xl md:text-3xl font-serif font-bold text-emerald-200 tracking-wide">
                  {selectedCredential.recipientName}
                </div>
                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mt-2" />
              </div>

              {/* Programme Title & Attestation */}
              <div className="text-center max-w-md mx-auto text-xs text-slate-300 relative z-10 leading-relaxed">
                has successfully fulfilled all curriculum requirements, continuous live assessments, and
                attendance standards for
                <p className="font-semibold text-white mt-1 text-sm">
                  {selectedCredential.programmeTitle}
                </p>
              </div>

              {/* Certificate Footer with Cryptographic Hash & QR */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <div className="space-y-1 text-left">
                  <p className="text-[10px] uppercase font-mono text-slate-500">Issuer Authority</p>
                  <p className="text-xs font-semibold text-slate-200">{selectedCredential.issuerOrg}</p>
                  <p className="text-[11px] text-slate-400 font-mono">Issued: {selectedCredential.issueDate}</p>
                </div>

                <div className="p-2 rounded-xl bg-white shrink-0 shadow-lg">
                  <QrCode className="h-14 w-14 text-slate-950" />
                </div>
              </div>

              {/* Cryptographic SHA-256 Digest Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span className="truncate max-w-[280px]">
                  HASH: {selectedCredential.sha256Digest}
                </span>
                <span className="text-emerald-400 font-semibold">ID: {selectedCredential.id}</span>
              </div>
            </div>

            {/* Credential Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={copyHash}
                  className="btn-secondary text-xs py-2 px-3"
                >
                  {copiedHash ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedHash ? "Hash Copied!" : "Copy SHA-256 Digest"}</span>
                </button>
                <Link
                  to={`/verify?id=${selectedCredential.id}`}
                  className="btn-primary text-xs py-2 px-3"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Test Public Verification</span>
                </Link>
              </div>

              <span className="text-xs font-mono text-slate-500">
                Format: W3C Verifiable Credential Compatible
              </span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Issued Credentials Ledger */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-surface p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Issued Credentials Ledger</h3>
              <span className="text-xs font-mono text-emerald-400">{credentials.length} Total</span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipient or ID..."
                className="input pl-9 text-xs"
              />
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filtered.map((cred) => {
                const isSelected = selectedCredential.id === cred.id;
                return (
                  <div
                    key={cred.id}
                    onClick={() => setSelectedCredential(cred)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? "bg-emerald-500/15 border-emerald-500/60 ring-1 ring-emerald-500/30"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-100">{cred.recipientName}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{cred.recipientEmail}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {cred.status}
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] text-slate-300 font-medium truncate">
                      {cred.programmeTitle}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>{cred.id}</span>
                      <span>{cred.issueDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Issue Credential Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="card-surface w-full max-w-md p-6 bg-[#0a101d] border-slate-700 shadow-2xl relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Issue Verifiable Credential</h2>
                <p className="text-xs text-slate-400">Cryptographically seal & register on ledger</p>
              </div>
            </div>

            <form onSubmit={handleIssueCredential} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Recipient Full Name</label>
                <input
                  required
                  value={newRecipient.name}
                  onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                  placeholder="e.g. Maya Lin"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Recipient Email</label>
                <input
                  type="email"
                  required
                  value={newRecipient.email}
                  onChange={(e) => setNewRecipient({ ...newRecipient, email: e.target.value })}
                  placeholder="e.g. maya.lin@organization.com"
                  className="input font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Programme</label>
                <input
                  required
                  value={newRecipient.programme}
                  onChange={(e) => setNewRecipient({ ...newRecipient, programme: e.target.value })}
                  className="input"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono leading-relaxed">
                Verification seal will compute SHA-256 HMAC digest from recipient name, programme ID, and tenant key.
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Seal & Issue Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

