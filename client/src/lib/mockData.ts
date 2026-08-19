export interface ProgrammeItem {
  id: string;
  title: string;
  code: string;
  category: "Tech & AI" | "Leadership" | "Healthcare" | "Data Science" | "Compliance";
  status: "ACTIVE" | "REGISTRATION_OPEN" | "SCHEDULED" | "DRAFT" | "COMPLETED";
  startDate: string;
  endDate: string;
  registeredCount: number;
  capacity: number;
  totalSessions: number;
  completedSessions: number;
  attendanceRate: number;
  credentialTemplate: string;
  sessions: {
    id: string;
    title: string;
    date: string;
    time: string;
    venue: string;
    attendedCount: number;
    status: "COMPLETED" | "LIVE" | "UPCOMING";
    pin: string;
  }[];
}

export interface ParticipantItem {
  id: string;
  fullName: string;
  email: string;
  programmeId: string;
  programmeTitle: string;
  organization: string;
  registeredAt: string;
  attendedSessions: number;
  totalSessions: number;
  attendancePercentage: number;
  credentialStatus: "ISSUED" | "ELIGIBLE" | "IN_PROGRESS" | "NOT_ELIGIBLE";
  credentialId?: string;
  lastCheckIn?: string;
}

export interface AuditLogItem {
  id: string;
  requestId: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  target: string;
  timestamp: string;
  status: "SUCCESS" | "BLOCKED" | "FLAGGED";
  ipAddress: string;
  hash: string;
}

export interface CredentialItem {
  id: string;
  credentialNumber: string;
  recipientName: string;
  recipientEmail: string;
  programmeTitle: string;
  issuerName: string;
  issuerOrg: string;
  issueDate: string;
  status: "VERIFIED" | "REVOKED" | "PENDING_ISSUANCE";
  sha256Digest: string;
  attendanceRate: number;
  skills: string[];
}

export const INITIAL_PROGRAMMES: ProgrammeItem[] = [
  {
    id: "prog-ai-2026",
    title: "Executive AI Governance & Ethics Masterclass",
    code: "AIG-2026-Q3",
    category: "Tech & AI",
    status: "ACTIVE",
    startDate: "2026-08-10",
    endDate: "2026-08-28",
    registeredCount: 48,
    capacity: 50,
    totalSessions: 6,
    completedSessions: 4,
    attendanceRate: 94.2,
    credentialTemplate: "Accredited Executive Certificate in AI Governance",
    sessions: [
      {
        id: "sess-1",
        title: "Session 1: Foundations of Algorithmic Accountability",
        date: "2026-08-10",
        time: "09:00 - 12:00",
        venue: "Virtual Room A & Main Auditorium",
        attendedCount: 47,
        status: "COMPLETED",
        pin: "8492",
      },
      {
        id: "sess-2",
        title: "Session 2: Regulatory Frameworks (EU AI Act & Global Standards)",
        date: "2026-08-13",
        time: "09:00 - 12:00",
        venue: "Virtual Room A",
        attendedCount: 46,
        status: "COMPLETED",
        pin: "2195",
      },
      {
        id: "sess-3",
        title: "Session 3: Bias Mitigation & Auditing Machine Learning Pipelines",
        date: "2026-08-15",
        time: "09:00 - 12:00",
        venue: "Virtual Room A",
        attendedCount: 45,
        status: "COMPLETED",
        pin: "9041",
      },
      {
        id: "sess-4",
        title: "Session 4: Live Enterprise Model Risk Assessment Simulation",
        date: "2026-08-18",
        time: "09:00 - 12:00",
        venue: "Main Executive Amphitheatre",
        attendedCount: 45,
        status: "LIVE",
        pin: "5723",
      },
      {
        id: "sess-5",
        title: "Session 5: Cryptographic Attestation & Verifiable Auditing",
        date: "2026-08-22",
        time: "09:00 - 12:00",
        venue: "Virtual Room A",
        attendedCount: 0,
        status: "UPCOMING",
        pin: "3381",
      },
      {
        id: "sess-6",
        title: "Session 6: Capstone Defense & Digital Credential Ceremony",
        date: "2026-08-28",
        time: "14:00 - 17:00",
        venue: "Grand Hall & Global Broadcast",
        attendedCount: 0,
        status: "UPCOMING",
        pin: "6619",
      },
    ],
  },
  {
    id: "prog-cyber-2026",
    title: "Advanced Cloud Security & Zero Trust Architecture",
    code: "SEC-2026-C1",
    category: "Compliance",
    status: "REGISTRATION_OPEN",
    startDate: "2026-09-05",
    endDate: "2026-09-25",
    registeredCount: 82,
    capacity: 100,
    totalSessions: 8,
    completedSessions: 0,
    attendanceRate: 0,
    credentialTemplate: "Certified Cloud Security Practitioner (CCSP-Apex)",
    sessions: [
      {
        id: "sess-c1",
        title: "Session 1: Zero Trust Core Architecture",
        date: "2026-09-05",
        time: "10:00 - 13:00",
        venue: "Hall B",
        attendedCount: 0,
        status: "UPCOMING",
        pin: "1102",
      },
    ],
  },
  {
    id: "prog-data-2026",
    title: "High-Velocity Data Engineering & Streaming Pipelines",
    code: "DAT-2026-F2",
    category: "Data Science",
    status: "SCHEDULED",
    startDate: "2026-09-15",
    endDate: "2026-10-02",
    registeredCount: 35,
    capacity: 40,
    totalSessions: 5,
    completedSessions: 0,
    attendanceRate: 0,
    credentialTemplate: "Distinguished Data Systems Engineer",
    sessions: [],
  },
  {
    id: "prog-lead-2026",
    title: "Global Leadership in Strategic Tech Transformation",
    code: "GLT-2026-S1",
    category: "Leadership",
    status: "COMPLETED",
    startDate: "2026-07-01",
    endDate: "2026-07-24",
    registeredCount: 60,
    capacity: 60,
    totalSessions: 6,
    completedSessions: 6,
    attendanceRate: 98.3,
    credentialTemplate: "Executive Fellowship in Digital Leadership",
    sessions: [],
  },
];

export const INITIAL_PARTICIPANTS: ParticipantItem[] = [
  {
    id: "part-01",
    fullName: "Dr. Elena Vance",
    email: "elena.vance@apexresearch.org",
    programmeId: "prog-ai-2026",
    programmeTitle: "Executive AI Governance & Ethics Masterclass",
    organization: "Apex Research Labs",
    registeredAt: "2026-08-01",
    attendedSessions: 4,
    totalSessions: 6,
    attendancePercentage: 100,
    credentialStatus: "ELIGIBLE",
    credentialId: "CRD-2026-889104",
    lastCheckIn: "2026-08-18 09:08 (QR Scan)",
  },
  {
    id: "part-02",
    fullName: "Marcus Holloway",
    email: "marcus.h@dedsec-systems.io",
    programmeId: "prog-ai-2026",
    programmeTitle: "Executive AI Governance & Ethics Masterclass",
    organization: "DedSec Systems",
    registeredAt: "2026-08-02",
    attendedSessions: 4,
    totalSessions: 6,
    attendancePercentage: 100,
    credentialStatus: "ELIGIBLE",
    credentialId: "CRD-2026-889105",
    lastCheckIn: "2026-08-18 09:12 (QR Scan)",
  },
  {
    id: "part-03",
    fullName: "Amina Al-Mansoor",
    email: "amina.mansoor@gulftech.ae",
    programmeId: "prog-ai-2026",
    programmeTitle: "Executive AI Governance & Ethics Masterclass",
    organization: "Gulf Tech Institute",
    registeredAt: "2026-08-03",
    attendedSessions: 3,
    totalSessions: 6,
    attendancePercentage: 75,
    credentialStatus: "IN_PROGRESS",
    lastCheckIn: "2026-08-15 09:15 (PIN Entry)",
  },
  {
    id: "part-04",
    fullName: "Tariq Sterling",
    email: "tariq.s@sterling-biotech.com",
    programmeId: "prog-ai-2026",
    programmeTitle: "Executive AI Governance & Ethics Masterclass",
    organization: "Sterling Biotech",
    registeredAt: "2026-08-04",
    attendedSessions: 4,
    totalSessions: 6,
    attendancePercentage: 100,
    credentialStatus: "ELIGIBLE",
    credentialId: "CRD-2026-889107",
    lastCheckIn: "2026-08-18 09:05 (Manual Roster)",
  },
  {
    id: "part-05",
    fullName: "Chloe Zhang",
    email: "chloe.zhang@singapore-fin.sg",
    programmeId: "prog-ai-2026",
    programmeTitle: "Executive AI Governance & Ethics Masterclass",
    organization: "FinTech Alliance SG",
    registeredAt: "2026-08-04",
    attendedSessions: 4,
    totalSessions: 6,
    attendancePercentage: 100,
    credentialStatus: "ELIGIBLE",
    credentialId: "CRD-2026-889108",
    lastCheckIn: "2026-08-18 09:02 (QR Scan)",
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "aud-001",
    requestId: "REQ-99218401",
    actorEmail: "admin@apexveridoc.com",
    actorRole: "ORGANIZATION_OWNER",
    action: "SESSION_CHECKIN_CONFIRMED",
    target: "Session 4: Live Enterprise Model Risk Assessment (part-01)",
    timestamp: "Just now",
    status: "SUCCESS",
    ipAddress: "192.168.1.104",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    id: "aud-002",
    requestId: "REQ-99218398",
    actorEmail: "coordinator@apexveridoc.com",
    actorRole: "PROGRAMME_COORDINATOR",
    action: "ATTENDANCE_PIN_ISSUED",
    target: "Session 4 (PIN: 5723)",
    timestamp: "12 mins ago",
    status: "SUCCESS",
    ipAddress: "10.0.4.12",
    hash: "a4f8829c676d1e43e2d6b38c2057d383b19280d85918e7e31c89012fba088219",
  },
  {
    id: "aud-003",
    requestId: "REQ-99218370",
    actorEmail: "system-engine@apex-veridoc.internal",
    actorRole: "SYSTEM",
    action: "CREDENTIAL_ELIGIBILITY_CALCULATED",
    target: "Programme AIG-2026-Q3 (44 Eligible Candidates)",
    timestamp: "45 mins ago",
    status: "SUCCESS",
    ipAddress: "127.0.0.1",
    hash: "c79218bf14e59174092b34a9192e432c86b100808ef089f28589253457a44f88",
  },
  {
    id: "aud-004",
    requestId: "REQ-99218310",
    actorEmail: "security-guard@apex-veridoc.internal",
    actorRole: "SECURITY_AUTOMATION",
    action: "DUPLICATE_CHECKIN_INTERCEPTED",
    target: "Prevented replay attack on part-02 for sess-4",
    timestamp: "1 hour ago",
    status: "BLOCKED",
    ipAddress: "192.168.1.109",
    hash: "7d891b2c4501a938df18942b984013404c0552bba9982481014e7a83d73b50c1",
  },
];

export const INITIAL_CREDENTIALS: CredentialItem[] = [
  {
    id: "CRD-2026-889104",
    credentialNumber: "APEX-VERIDOC-2026-0889104",
    recipientName: "Dr. Elena Vance",
    recipientEmail: "elena.vance@apexresearch.org",
    programmeTitle: "Executive AI Governance & Ethics Masterclass",
    issuerName: "Apex Global Verification Authority",
    issuerOrg: "Apex Veridoc Institute of Digital Governance",
    issueDate: "2026-08-18",
    status: "VERIFIED",
    sha256Digest: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    attendanceRate: 100,
    skills: ["AI Ethics Frameworks", "Algorithmic Auditing", "EU AI Act Compliance", "Model Risk Management"],
  },
  {
    id: "CRD-2026-889105",
    credentialNumber: "APEX-VERIDOC-2026-0889105",
    recipientName: "Marcus Holloway",
    recipientEmail: "marcus.h@dedsec-systems.io",
    programmeTitle: "Executive AI Governance & Ethics Masterclass",
    issuerName: "Apex Global Verification Authority",
    issuerOrg: "Apex Veridoc Institute of Digital Governance",
    issueDate: "2026-08-18",
    status: "VERIFIED",
    sha256Digest: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    attendanceRate: 100,
    skills: ["AI Security Testing", "Adversarial Robustness", "Cryptographic Attestation"],
  },
  {
    id: "CRD-2026-889091",
    credentialNumber: "APEX-VERIDOC-2026-0889091",
    recipientName: "Jonathan Vance",
    recipientEmail: "j.vance@globalhealth.org",
    programmeTitle: "Global Leadership in Strategic Tech Transformation",
    issuerName: "Apex Global Verification Authority",
    issuerOrg: "Apex Veridoc Institute of Digital Governance",
    issueDate: "2026-07-24",
    status: "VERIFIED",
    sha256Digest: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
    attendanceRate: 100,
    skills: ["Digital Transformation", "Strategic Governance", "Enterprise Architecture"],
  },
];
