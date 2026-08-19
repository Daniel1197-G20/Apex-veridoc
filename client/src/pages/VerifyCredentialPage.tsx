import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { INITIAL_CREDENTIALS, type CredentialItem } from "../lib/mockData";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Check,
  Copy,
} from "lucide-react";

export default function VerifyCredentialPage() {
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id") || "";
  const [inputVal, setInputVal] = useState(queryId || "CRD-2026-889104");
  const [result, setResult] = useState<CredentialItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  function performLookup(idToFind: string) {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const found = INITIAL_CREDENTIALS.find(
        (c) =>
          c.id.toLowerCase() === idToFind.toLowerCase() ||
          c.credentialNumber.toLowerCase() === idToFind.toLowerCase()
      );
      setResult(found || null);
    }, 300);
  }

  useEffect(() => {
    if (queryId) {
      setInputVal(queryId);
      performLookup(queryId);
    } else {
      performLookup("CRD-2026-889104");
    }
  }, [queryId]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    performLookup(inputVal.trim());
  }

  function copyHash() {
    if (result?.sha256Digest) {
      navigator.clipboard.writeText(result.sha256Digest);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Top Public Navigation */}
      <header className="border-b border-slate-800/80 bg-[#0a101d]/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">Apex Veridoc</span>
              <p className="text-[10px] text-emerald-400 font-mono">Public Verification Authority</p>
            </div>
          </Link>

          <Link
            to="/login"
            className="btn-secondary text-xs py-2 px-3.5"
          >
            <span>Sign in to Organization</span>
          </Link>
        </div>
      </header>

      {/* Main Verification Body */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            CRYPTOGRAPHIC LEDGER VERIFICATION
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Verify Digital Credential Authenticity
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Instant tamper-proof attestation lookup. Enter any Credential ID or scan the QR token to verify cryptographic signature validity.
          </p>
        </div>

        {/* Verification Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0a101d] border border-slate-800 focus-within:border-emerald-500/80 shadow-2xl transition">
            <Search className="h-5 w-5 text-slate-500 ml-3 shrink-0" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. CRD-2026-889104 or full number"
              className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full px-2 py-2 font-mono"
            />
            <button type="submit" disabled={isSearching} className="btn-primary text-xs py-2.5 px-5">
              {isSearching ? "Verifying…" : "Verify"}
            </button>
          </div>
        </form>

        {/* Verification Outcome Box */}
        {result ? (
          <div className="card-surface p-8 space-y-6 border-emerald-500/40 bg-[#0a101d]/80 animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">Cryptographically Verified</span>
                    <span className="stat-badge bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      AUTHENTIC
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    ID: {result.id} • {result.credentialNumber}
                  </p>
                </div>
              </div>

              <div className="text-right font-mono text-xs text-slate-400">
                <span>Issue Date: </span>
                <span className="text-slate-200 font-medium">{result.issueDate}</span>
              </div>
            </div>

            {/* Recipient & Programme Card Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <p className="font-mono text-[10px] uppercase text-slate-400">Credential Recipient</p>
                <p className="text-base font-semibold text-white">{result.recipientName}</p>
                <p className="text-slate-400 font-mono">{result.recipientEmail}</p>
                <div className="pt-2 flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>100% Attendance Verified & Gated</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <p className="font-mono text-[10px] uppercase text-slate-400">Issuing Organization</p>
                <p className="text-base font-semibold text-white">{result.issuerOrg}</p>
                <p className="text-slate-400 font-mono">Authority: {result.issuerName}</p>
                <div className="pt-2 flex items-center gap-2 text-teal-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Authoritative Root Issuer Key</span>
                </div>
              </div>
            </div>

            {/* Programme & Attestation Details */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs">
              <p className="font-mono text-[10px] uppercase text-slate-400">Attestation Description</p>
              <p className="text-sm font-semibold text-emerald-200">{result.programmeTitle}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cryptographic SHA-256 HMAC Signature Verification */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> SHA-256 Cryptographic Signature Digest
                </span>
                <button
                  onClick={copyHash}
                  className="flex items-center gap-1 text-slate-400 hover:text-emerald-300 transition cursor-pointer"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy Digest"}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800/80 text-slate-300 break-all select-all">
                {result.sha256Digest}
              </div>
            </div>
          </div>
        ) : (
          <div className="card-surface p-8 text-center space-y-3 border-red-500/30">
            <AlertTriangle className="h-10 w-10 text-amber-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Credential Not Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No active certificate matches ID &ldquo;{inputVal}&rdquo;. Please verify the spelling or check the QR code link.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

