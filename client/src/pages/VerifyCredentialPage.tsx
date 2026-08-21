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
  Sparkles,
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
    <div className="min-h-screen bg-[#120E0C] text-[#F7F4F0] font-sans selection:bg-[#D9662B]/30 selection:text-white wallpaper-surface">
      {/* Top Public Navigation */}
      <header className="border-b border-[#D9662B]/15 bg-[#120E0C]/90 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-[#D9662B] flex items-center justify-center shadow-md shadow-[#D9662B]/30 text-white font-bold transition group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">Apex Veridoc</span>
              <p className="text-[10px] text-[#F08047] font-medium">Public Verification Authority</p>
            </div>
          </Link>

          <Link
            to="/login"
            className="btn-secondary text-xs py-2 px-3.5"
          >
            <span>Sign In to Organization</span>
          </Link>
        </div>
      </header>

      {/* Main Verification Body */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9662B]/15 border border-[#D9662B]/30 text-[#D9662B] text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Cryptographic Ledger Lookup</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Verify Digital Credential Authenticity
          </h1>
          <p className="text-sm text-[#A89890] max-w-xl mx-auto">
            Instant tamper-proof attestation lookup. Enter any Credential ID or scan the QR token to verify cryptographic signature validity.
          </p>
        </div>

        {/* Verification Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#181210] border border-[#D9662B]/25 focus-within:border-[#D9662B] shadow-2xl transition">
            <Search className="h-4 w-4 text-[#8A7B73] ml-3 shrink-0" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. CRD-2026-889104 or APEX-VERIDOC-..."
              className="bg-transparent border-none outline-none text-sm text-[#F7F4F0] placeholder-[#8A7B73] w-full px-2 py-2 font-mono"
            />
            <button type="submit" disabled={isSearching} className="btn-primary text-xs py-2.5 px-5">
              {isSearching ? "Verifying…" : "Verify"}
            </button>
          </div>
        </form>

        {/* Verification Outcome Box */}
        {result ? (
          <div className="card-surface p-6 sm:p-8 space-y-6 border-[#D9662B]/30 animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9662B]/15">
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">Cryptographically Verified</span>
                    <span className="badge-emerald">
                      AUTHENTIC
                    </span>
                  </div>
                  <p className="text-xs text-[#A89890] mt-0.5">
                    ID: <span className="font-mono text-[#F7F4F0]">{result.id}</span> • {result.credentialNumber}
                  </p>
                </div>
              </div>

              <div className="text-right text-xs text-[#A89890]">
                <span>Issue Date: </span>
                <span className="text-[#F7F4F0] font-medium">{result.issueDate}</span>
              </div>
            </div>

            {/* Recipient & Programme Card Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs">
              <div className="p-4 rounded-xl bg-[#181210] border border-[#D9662B]/18 space-y-2">
                <p className="text-[10px] uppercase font-semibold text-[#8A7B73]">Credential Recipient</p>
                <p className="text-base font-semibold text-white">{result.recipientName}</p>
                <p className="text-[#A89890]">{result.recipientEmail}</p>
                <div className="pt-2 flex items-center gap-2 text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>100% Attendance Verified & Gated</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#181210] border border-[#D9662B]/18 space-y-2">
                <p className="text-[10px] uppercase font-semibold text-[#8A7B73]">Issuing Organization</p>
                <p className="text-base font-semibold text-white">{result.issuerOrg}</p>
                <p className="text-[#A89890]">Authority: {result.issuerName}</p>
                <div className="pt-2 flex items-center gap-2 text-[#F08047] font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Authoritative Root Issuer Key</span>
                </div>
              </div>
            </div>

            {/* Programme & Attestation Details */}
            <div className="p-4 rounded-xl bg-[#181210] border border-[#D9662B]/18 space-y-2 text-xs">
              <p className="text-[10px] uppercase font-semibold text-[#8A7B73]">Attestation Description</p>
              <p className="text-sm font-semibold text-[#F4B27C]">{result.programmeTitle}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.skills.map((skill) => (
                  <span
                    key={skill}
                    className="badge-neutral text-[11px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cryptographic SHA-256 HMAC Signature Verification */}
            <div className="p-4 rounded-xl bg-[#140E0C] border border-[#D9662B]/20 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#F08047] font-medium flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> SHA-256 Cryptographic Signature Digest
                </span>
                <button
                  onClick={copyHash}
                  className="flex items-center gap-1 text-[#A89890] hover:text-white transition cursor-pointer"
                  aria-label="Copy Digest"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy Digest"}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0E0A08] border border-[#D9662B]/15 text-[#B8AAA2] break-all select-all font-mono">
                {result.sha256Digest}
              </div>
            </div>
          </div>
        ) : (
          <div className="card-surface p-8 text-center space-y-3 border-amber-500/30">
            <AlertTriangle className="h-10 w-10 text-amber-400 mx-auto" />
            <h2 className="text-lg font-semibold text-white">Credential Not Found</h2>
            <p className="text-xs text-[#A89890] max-w-sm mx-auto">
              No active certificate matches ID &ldquo;{inputVal}&rdquo;. Please verify the spelling or check the QR code link.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}


