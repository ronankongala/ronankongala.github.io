// ===== Data =====

const tickerLines = [
  { text: "[FRAUDSENTRY] RandomForest 0.748 ROC-AUC, 649 of 4,064 held-out fraud cases caught at a 3% FPR budget", sev: "high" },
  { text: "[FRAUDSENTRY] 23.7-point subgroup false-positive-rate spread flagged in merchant-category fairness audit", sev: "high" },
  { text: "[GUARDDUTY] 10 findings auto-ticketed to Jira, 13 finding types mapped to MITRE ATT&CK", sev: "ok" },
  { text: "[T-POT] 66,204 attacker sessions captured across Conpot/Cowrie honeypots", sev: "high" },
  { text: "[SURICATA] 15,382 IDS alerts correlated in first 6h of deployment", sev: "high" },
  { text: "[MITRE ATT&CK] 4 techniques mapped: T1046, T1110, T1595, T1071", sev: "ok" },
  { text: "[NESSUS] 27 findings scored via custom CVSS v3.0 engine, 8m scan window", sev: "high" },
  { text: "[S3-AUDITOR] public-read bucket flagged, CVSS 7.5, remediation logged", sev: "high" },
  { text: "[CLOUDTRAIL] 11 detection rules live across Lambda + DynamoDB", sev: "ok" },
  { text: "[ELK] 110+ events indexed, Kibana dashboard verified", sev: "ok" },
  { text: "[GRC] control mapping complete: PCI DSS 4.0, SOX 404, NIST CSF 2.0", sev: "ok" },
  { text: "[SEMGREP] 66 findings across 1,002 files, OWASP Top 10 + security-audit rulesets", sev: "high" },
  { text: "[TRIVY] 71 CVEs in webgoat:latest, 11 HIGH in Ubuntu 24.04 base layer", sev: "high" },
  { text: "[ZAP] 8 alerts, 961 requests: CSRF, CSP, clickjacking, SameSite cookie gaps", sev: "high" },
  { text: "[VAULT] secret rotation confirmed, secret/webgoat/database bumped to version 2", sev: "ok" },
  { text: "[YARA] AgentTesla_PE_Indicators matched, imphash 4300f2f2, cert serial 40:A2:95:B6 confirmed", sev: "high" },
  { text: "[VOLATILITY] PAGE_EXECUTE_READWRITE region detected in SearchApp.exe PID 6656, injection confirmed", sev: "high" },
  { text: "[ANY.RUN] 87 IOCs generated, 32 dropped files targeting Chrome/Edge credential stores", sev: "high" },
  { text: "[GHIDRA] MurmurHash API hashing at FUN_1400015a0, seed 0xa7e8bf08 confirmed at offset 0x9A1", sev: "ok" },
  { text: "[RITA] 85.239.53.219 beacon score 0.504, rare_signature:SSLoad/1.1, mean interval 477s, 11 connections", sev: "high" },
  { text: "[ZEEK] 17 structured logs generated: conn.log, dns.log, ssl.log, kerberos.log, ldap.log confirmed", sev: "ok" },
  { text: "[OPENSCAP] Ubuntu 24.04 STIG V1R5 score 69.58% to 78.06% after 13 Ansible changes, 0 failures", sev: "ok" },
  { text: "[POA&M] 7 findings open post-remediation, each keyed to a real DISA STIG rule ID", sev: "high" },
];

const projects = [
  {
    id: "CASE-25",
    title: "FraudSentry: Fraud Detection, SHAP Explainability + Fairness Audit",
    tags: ["Fraud Detection", "XGBoost", "SHAP", "scikit-learn", "Fairness Audit", "GDPR DPIA"],
    desc: "End-to-end transaction fraud detection pipeline run against the real IEEE-CIS Fraud Detection dataset, then audited for bias and privacy rather than stopping at a model score. Engineered velocity, amount-deviation, geo-mismatch, and temporal features, then trained and compared four models -- class-weighted logistic regression, RandomForest, XGBoost, and an unsupervised IsolationForest -- on a time-based split rather than a random one, so future fraud patterns cannot leak backward into training. Scored on recall at a fixed 3% false-positive budget instead of accuracy, since an alert queue has finite analyst capacity: RandomForest led at 0.748 ROC-AUC and 16.0% recall, catching 649 of 4,064 held-out fraud cases against 3,420 false positives. Logistic regression reached a nearly identical 0.742 AUC but only a third of that recall at the operating point, so AUC alone would have picked the wrong model. The same pipeline scored ~0.98 AUC on synthetic data, and the gap is reported as the finding rather than buried -- the synthetic fraud signal was hand-designed and therefore learnable in a way real fraud is not. SHAP TreeExplainer attribution ranked amount, hour_of_day, and merchant_category_electronics as the top drivers. A subgroup false-positive-rate audit found a 23.7-point spread across merchant categories (electronics at 23.9% versus online_retail at 0.24%), flagged for investigation before any production use, while the geo-mismatch signal is documented as degenerate under the dataset's pseudo-customer-ID reconstruction instead of being reported as a fairness pass. Ships with a SQLite alert case-management layer with audit trail, post-incident trend analysis with generated case narratives, and a full GDPR Article 35 DPIA plus Article 15 access and Article 17 erasure handling including retention-conflict logic.",
    date: "Sep 2026",
    link: "https://github.com/ronankongala/fraudsentry",
  },
  {
    id: "CASE-21",
    title: "FedRAMP RMF Compliance Lab: STIG Hardening, OpenSCAP + POA&M",
    tags: ["FedRAMP Moderate", "NIST 800-53 Rev 5", "DISA STIG V1R5", "OpenSCAP", "Ansible", "POA&M", "SSP", "SOX/COSO"],
    desc: "Carried a single Ubuntu 24.04 LTS host through a complete FedRAMP Moderate RMF cycle rather than stopping at a scan report: baseline assessment, automated remediation, reassessment, and the documentation package an assessor would actually receive. SCAP content was built from ComplianceAsCode 0.1.83 source for the ubuntu2404 product instead of the pre-packaged distro content, which lags upstream, so the benchmark in use is pinned exactly to DISA STIG for Canonical Ubuntu 24.04 LTS V1R5. The baseline oscap run scored 69.58% with 28 rules passed and 11 failed. An Ansible playbook generated from that same profile by oscap xccdf generate fix applied 13 configuration changes with 0 failures, covering audit subsystem configuration, privilege escalation re-authentication, SSSD credential handling, audit log permissions, and kernel module load auditing. The rescan reused the identical profile and datastream so the difference isolates remediation alone: 78.06%, 38 passed, 7 failed, a gain of 8.48 points. The 7 residual findings are treated as the deliverable rather than a gap to hide -- each is tracked in a POA&M keyed to its real DISA STIG rule ID, risk level, responsible party, and target completion date, split into environment-inherent findings that cannot be remediated here (POA-001 / UBTU-24-600090, filesystem encryption at rest, since WSL2 exposes no block-level disk encryption) and findings requiring a configuration decision beyond an unattended run (UBTU-24-100850 SSH client ciphers, UBTU-24-400360 and UBTU-24-400370 SSSD certificate trust). The package ships an SSP summary with FIPS 199 categorization and per-family implementation status across all 20 NIST SP 800-53 Rev 5 families, a 52-control FedRAMP Moderate matrix marking inherited versus customer responsibility per control, a 10-control CIS/STIG/NIST crosswalk drawn only from rules carrying all three references in the same rule definition, and a SOX/COSO access certification over 15 simulated users across 3 systems with a separation of duties matrix and sign-off log. Implementation status is tied to evidence: Partially Implemented always means an open POA&M item exists in that family, so the SSP and the POA&M cannot drift apart.",
    date: "Sep 2026",
    link: "https://github.com/ronankongala/fedramp-rmf-lab",
  },
  {
    id: "CASE-20",
    title: "GuardDutySync: GuardDuty to MITRE ATT&CK to Jira Pipeline",
    tags: ["AWS GuardDuty", "boto3", "MITRE ATT&CK", "Jira Cloud REST API", "Python", "Security Automation"],
    desc: "Three-stage Python pipeline that turns raw AWS GuardDuty alerts into enriched, deduplicated Jira triage tickets with no manual analyst step in between. The poller authenticates through an IAM user scoped to AmazonGuardDutyReadOnlyAccess and pulls findings from the GuardDuty API with boto3, validated against 434 sample findings generated in us-east-1. The enricher resolves each finding type to a MITRE ATT&CK technique through a hand-built mapping table covering 13 GuardDuty finding types across 12 techniques, then pulls the full technique name, tactic, and description out of the MITRE enterprise-attack STIX bundle, so a ticket carries T1611 Escape to Host and privilege-escalation rather than an opaque finding string. The ticketer posts a structured issue to the Jira Cloud REST API with every enriched field, mapping the GuardDuty 0 to 10 severity float onto Jira High, Medium, and Low priority. Local state in processed_findings.json makes reruns idempotent: a verified run fetched 10 alerts and created 10 tickets with 0 errors, and an immediate second run skipped all 10 as duplicates and created none.",
    date: "Sep 2026",
    link: "https://github.com/ronankongala/guardduty-sync",
  },
  {
    id: "CASE-19",
    title: "Authorized Penetration Test, Metasploit Lab",
    tags: ["Metasploit Framework", "Nmap", "Kali Linux", "Penetration Testing", "CVSS", "MITRE ATT&CK"],
    desc: "Conducted an authorized penetration test against two intentionally vulnerable lab environments (Metasploitable2 self-hosted, TryHackMe Blue). Performed full reconnaissance with Nmap across all 65,535 ports, identifying vsftpd 2.3.4, Samba 3.0.20, rexec, and unpatched SMBv1. Exploited CVE-2011-2523 (vsftpd backdoor, root shell via malicious username), CVE-2007-2447 (Samba usermap_script command injection, root shell), cleartext rexec authentication service (port 512), and CVE-2017-0144 EternalBlue (SMBv1 buffer overflow, NT AUTHORITY\\SYSTEM). All 4 exploits executed using Metasploit Framework. Documented findings in a structured pentest report with CVSS v3 scoring, MITRE ATT&CK mapping (T1190, T1210, T1021), reproduction steps, business impact analysis, and remediation recommendations.",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/metasploit-pentest-report",
  },
  {
    id: "CASE-18",
    title: "Zeek Beacon Detector (OCaml)",
    tags: ["OCaml", "dune", "Zeek", "Beacon Detection", "Functional Programming", "Network Forensics"],
    desc: "Functional rewrite of the CASE-17 beacon-scoring logic in OCaml, built with dune, comparing an imperative Python pipeline against a purely functional one solving the same detection problem. Parses a Zeek conn.log, groups connections by source IP through Map.Make(String) at O(n log k), sorts per-IP timestamps, folds consecutive inter-arrival gaps with List.fold_left, and computes population variance over those gaps to flag low-variance periodic senders as C2 beacon candidates -- the same signal RITA scores. Tuned with min_conns = 5 and a variance threshold of 5.0 seconds squared; against the bundled synthetic conn.log it isolates 10.0.0.5 at a 477.1s mean interval and variance 1.84 across 6 connections, separating it from two high-variance talkers. Results are modeled as a beacon_verdict variant (TooFewConns, HighVariance, BeaconCandidate), making an unscored IP structurally unable to reach the output printer and removing the sentinel-plus-assert guard the Python version needed.",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/zeek-beacon-ocaml",
  },
  {
    id: "CASE-17",
    title: "Zeek Network Forensics + Beacon Detection",
    tags: ["Zeek", "RITA", "Jupyter", "Beacon Detection", "Network Forensics", "Cobalt Strike"],
    desc: "End-to-end network forensics lab detecting SSLoad and Cobalt Strike C2 beaconing from a real malware PCAP. Ran Zeek 8.2.1 against a 6.4MB PCAP to generate 17 structured logs including conn.log, dns.log, ssl.log, kerberos.log, and ldap.log. RITA v5.1.2 scored all external connections for beacon regularity, auto-tagging 85.239.53.219 with rare_signature:SSLoad/1.1 (beacon score 0.504, 11 connections, 5,087s total duration, mean interval 477 seconds). Built 3 Jupyter threat hunting notebooks: conn.log duration analysis, DNS query profiling, and beacon interval visualization. Mapped findings to 6 MITRE ATT&CK techniques (T1071, T1071.004, T1008, T1095, T1557, T1018) with a full IOC table and 2 Sigma detection rules in the investigation report PDF.",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/zeek-network-forensics-lab",
  },
  {
    id: "CASE-16",
    title: "Malware Analysis Lab: AgentTesla Static, Dynamic + Memory Forensics",
    tags: ["PEStudio", "CAPA", "Ghidra", "YARA", "CAPE Sandbox", "Any.run", "Volatility 3", "Malware Analysis"],
    desc: "End-to-end malware analysis of a real AgentTesla credential stealer across 6 phases on an isolated FlareVM + REMnux lab. Static: PEStudio found 5 imports and entropy 6.454; CAPA mapped T1027 XOR x16 and T1497 anti-sandbox evasion; Ghidra confirmed MurmurHash API hashing at FUN_1400015a0, seed 0xa7e8bf08. Wrote 3 YARA rules from extracted indicators with zero false positives against System32. Dynamic: Any.run sandbox confirmed Stealc/Vidar stealer behavior, 87 IOCs, 32 dropped files targeting Chrome/Edge credential stores, 11 MITRE ATT&CK techniques. Memory: winpmem v4.0-rc1 acquired a 7GB live dump; Volatility 3 windows.malfind detected PAGE_EXECUTE_READWRITE code injection in SearchApp.exe (PID 6656) and powershell.exe (PID 7848).",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/malware-analysis-lab",
  },
  {
    id: "CASE-15",
    title: "AppSec Pipeline + Secrets Management Lab",
    tags: ["Semgrep", "Checkov", "Trivy", "OWASP ZAP", "Vault", "Okta", "Terraform", "GitHub Actions", "PCI-DSS"],
    desc: "Wrapped OWASP WebGoat (a deliberately vulnerable Java app) with a 3-gate CI/CD security pipeline: Semgrep SAST surfaced 66 findings across 1,002 files, Checkov flagged 3 Dockerfile misconfigurations with Prisma Cloud policy IDs, and Trivy identified 71 CVEs in the container image. OWASP ZAP active scan (961 requests) found 8 vulnerability categories including missing CSRF protections. Migrated app credentials from hardcoded config into HashiCorp Vault's KV engine with secret rotation demo (v1 → v2). Configured Okta OIDC SSO with MFA enforcement via Okta Verify. Mapped the full environment against 16 PCI-DSS 4.0 requirements with an accepted risk register.",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/Appsec-pipeline-lab",
  },
  {
    id: "CASE-14",
    title: "Access-Governed RAG Console (LLM Access Control)",
    tags: ["RAG", "LLM Security", "Entra ID", "RBAC", "Flask", "Azure"],
    desc: "Built a retrieval-augmented AI assistant that enforces role-based access control at the retrieval layer, so a restricted document is excluded from an unauthorized user's candidate set before the model ever sees it, rather than trusting the model to keep a secret. Wired real Microsoft Entra ID (OAuth2) sign-in with app-role claims mapped to backend RBAC, added a prompt-injection scanner validated by a 10-case attack battery (10/10 resisted), and logged every access decision to an audit trail. Deployed to Azure App Service, with a README section documenting the honest gaps a production version would still need.",
    date: "Jul 2026",
    link: "https://github.com/ronankongala/Access-governed-rag-console",
  },
  {
    id: "CASE-13",
    title: "NIST 800-171 / CMMC Compliance Baseline Lab",
    tags: ["Active Directory", "Microsoft Intune", "Entra ID", "NIST 800-171", "CMMC"],
    desc: "Built a hands-on lab simulating the environment a small defense contractor would run: Windows Server 2022 Active Directory with GPO-enforced password and lockout policies, Microsoft Intune device compliance, Entra ID Conditional Access in report-only mode, and Windows Defender Firewall rules restricting SMB and blocking outbound Telnet. Mapped every control to NIST 800-171 requirements in a documented System Security Plan and CMMC Level 2 self-assessment scorecard, with two real gaps (FIPS-validated cryptography, periodic vulnerability scanning) transparently flagged as next steps rather than hidden.",
    date: "Jul 2026",
    link: "https://github.com/ronankongala/nist-cmmc-compliance-lab",
  },
  {
    id: "CASE-12",
    title: "Kali SSH MCP",
    tags: ["MCP", "Kali Linux", "SSH", "Open Source"],
    desc: "A bridge between Kali Linux and the Model Context Protocol over SSH, letting an AI assistant interact directly with a Kali environment for security research and pen-testing workflows.",
    date: "2025 \u2013 present",
    link: "https://github.com/ronankongala/kali-ssh-mcp",
  },
  {
    id: "CASE-11",
    title: "Music Scale Detector",
    tags: ["Goertzel", "librosa", "yt-dlp"],
    desc: "A side project outside security work: a browser-based tool pulling audio, running Goertzel pitch detection and Krumhansl-Schmuckler key profiling, and rendering a chromagram for chord and key analysis.",
    date: "Jun 2026",
    link: "https://ronankongala.github.io/scale-detector",
  },
  {
    id: "CASE-10",
    title: "Agentic GRC Analyst",
    tags: ["In progress", "LLM", "Control mapping"],
    desc: "An in-progress assistant for mapping controls across overlapping frameworks, NIST, PCI DSS, and GDPR, and flagging coverage gaps automatically.",
    date: "In progress",
    link: "https://github.com/ronankongala",
  },
  {
    id: "CASE-09",
    title: "Fake Job Posting Detection (IEEE ICAISS 2025)",
    tags: ["Ensemble ML", "SMOTE", "Research"],
    desc: "First-author research using an ensemble of Random Forest, Gradient Boosting, XGBoost, and AdaBoost with SMOTE, reaching 98% accuracy across 9,000+ job postings and a 22% false positive reduction.",
    date: "Jun 2024 \u2013 Feb 2025",
    link: "https://github.com/ronankongala/Fake-Job-Posting-Detection",
  },
  {
    id: "CASE-08",
    title: "Agentic Cybersecurity Analyst",
    tags: ["Claude", "Microsoft Sentinel", "KQL"],
    desc: "Built an LLM-driven SOC analyst that queries Microsoft Sentinel via KQL across Azure Log Analytics, triaging alerts and drafting incident summaries for human review.",
    date: "Apr 2026",
    link: "https://github.com/ronankongala/agentic-soc-sentinel",
  },
  {
    id: "CASE-07",
    title: "SOC 2 Type I Audit, GRC Portfolio",
    tags: ["SOC 2", "NIST", "Risk Register"],
    desc: "Ran a mock SOC 2 Type I audit assessing 14 controls end to end, producing 6 remediation recommendations backed by a documented risk register and audit evidence trail.",
    date: "Apr 2026",
    link: "https://github.com/ronankongala/SOC2-Audit-Lab",
  },
  {
    id: "CASE-06",
    title: "SOC Security Solution Deployment",
    tags: ["Splunk", "SIEM", "Automation"],
    desc: "Deployed a Splunk SIEM lab monitoring 1,000+ daily security events, automating 15 incident response playbooks and cutting mean time to detect from 45 to 12 minutes, a 73% improvement.",
    date: "Aug \u2013 Oct 2025",
    link: "https://github.com/ronankongala/SOC-Automation-Lab",
  },
  {
    id: "CASE-05",
    title: "S3 Security Auditor",
    tags: ["Python", "boto3", "AWS S3"],
    desc: "Built a Python auditing tool using boto3 to scan AWS S3 buckets for misconfigurations, running 6 checks per bucket across public ACLs, encryption, versioning, and logging. Scanned 2 buckets, identified 3 medium-severity findings, and produced a structured JSON risk report.",
    date: "Jun 2026",
    link: "https://github.com/ronankongala/s3-security-auditor",
  },
  {
    id: "CASE-04",
    title: "Suricata IDS + ELK Stack on AWS EC2",
    tags: ["Suricata", "Elasticsearch", "Kibana", "Filebeat"],
    desc: "Deployed Suricata 7.0.3 on AWS EC2 with 3 custom detection rules monitoring live traffic, piping alerts through Filebeat into an Elasticsearch/Kibana stack built via Docker Compose. Indexed 110+ security events and built a dashboard visualizing event distribution across ICMP, SSH, and HTTP.",
    date: "Jun 2026",
    link: "https://github.com/ronankongala/suricata-ids-elk-lab",
  },
  {
    id: "CASE-03",
    title: "AWS CloudTrail Threat Detection Pipeline",
    tags: ["AWS Lambda", "S3", "SNS", "DynamoDB"],
    desc: "Engineered a serverless AWS threat detection pipeline using CloudTrail, Lambda (Python 3.12), S3, SNS, and DynamoDB, implementing 11 detection rules mapped to MITRE ATT&CK across Defense Evasion, Privilege Escalation, and Credential Access. Real-time IAM alerting ran at a 100% Lambda execution success rate.",
    date: "Jun 2026",
    link: "https://github.com/ronankongala/aws-cloudtrail-threat-detector",
  },
  {
    id: "CASE-02",
    title: "Nessus Vulnerability Management Pipeline",
    tags: ["Nessus", "PowerShell", "Python", "CVSS v3.0"],
    desc: "Built a vulnerability assessment pipeline on Nessus Essentials with a custom PowerShell/Python risk-scoring engine, scanning and analyzing 25+ vulnerabilities within an 8-minute window. A custom weighting algorithm (CVSS score, severity, blast radius) ranked remediation order, mapped to NIST CSF, ISO 27001, and PCI DSS.",
    date: "Jul 2026",
    link: "https://github.com/ronankongala/nessus-vulnerability-pipeline",
  },
  {
    id: "CASE-01",
    title: "Cloud OT Honeypot with SIEM Integration",
    tags: ["GCP", "T-Pot", "Suricata", "Splunk Cloud"],
    desc: "Deployed an internet-facing OT honeypot on GCP using T-Pot, Conpot, and Cowrie to emulate Modbus, DNP3, and Telnet/SSH industrial services, capturing 66,000+ real attacker events within the first hour. Suricata IDS and Splunk Cloud SIEM ingested the telemetry, flagging 15,000+ intrusion alerts and mapping attacker behavior to 4 MITRE ATT&CK techniques.",
    date: "Jul 2026",
    link: "https://github.com/ronankongala/ot-honeypot-gcp",
  },
];

// Derived from the projects array so these never drift when a case is added.
const caseCount = projects.length;
const caseRange = `open [1-${caseCount}]`;

const experience = [
  {
    date: "Sep 2026 - Present",
    role: "AI Cybersecurity Intern",
    org: "Abbott &middot; Madison, WI (Hybrid)",
    desc: "Contributing to ExmanIq, an internal vulnerability management platform monitoring 22,000+ tracked vulnerabilities across organizational assets using a predictive Impact x Likelihood risk model enriched with EPSS and NVD threat intelligence. Diagnosed a 27-day silent data-pipeline failure by recognizing an anomalous flat trend in the platform's composite risk score. Also built CrowdCheck Hive with a teammate, correlating CrowdStrike, Microsoft Intune, and ServiceNow CMDB data to identify device coverage gaps across the organization's endpoint security controls.",
  },
  {
    date: "Jun 2026 - Sep 2026",
    role: "Cybersecurity Intern",
    org: "Exact Sciences &middot; Madison, WI (Hybrid)",
    desc: "Built Baseline Guardian with a teammate, correlating data across multiple internal systems (CrowdStrike, Microsoft Intune, Tanium, ServiceNow CMDB) to assess security posture and endpoint compliance. Automated KeyCheck, a credential-risk monitoring pipeline scanning 1,300+ application registrations to identify expiring-credential risk before it became an incident.",
  },
  {
    date: "Jan 2026 - Apr 2026",
    role: "Teaching Assistant, CY5001",
    org: "Northeastern University, Khoury College",
    desc: "Ran lab sessions and graded 200+ assignments for 61 graduate students in Cybersecurity Threats and Defenses, resolving 150+ Piazza queries within a 24-hour SLA and cutting lab completion time by 30%.",
  },
  {
    date: "2025",
    role: "First author, IEEE ICAISS",
    org: "Fake job posting detection research",
    desc: "Published an ensemble ML approach (Random Forest, Gradient Boosting, XGBoost, AdaBoost with SMOTE) reaching 98% accuracy across 9,000+ postings.",
  },
  {
    date: "Aug 2024 - Oct 2024",
    role: "Cybersecurity Intern",
    org: "NIELIT Virtual Academy, Ministry of Electronics and IT",
    desc: "Conducted network security assessments across 3 live environments, applying threat modeling with Nmap and Docker, and used Random Forest models to detect anomalies in security data.",
  },
  {
    date: "Feb 2024 - Apr 2024",
    role: "Web Development Trainee",
    org: "Quizaro ExtendedEdge &middot; Remote",
    desc: "Completed an ISO 9001:2015 certified specialization covering frontend architecture and modern web technologies.",
  },
  {
    date: "Oct 2023 - Nov 2023",
    role: "Data Science Analyst Intern",
    org: "Rejolt Edtech Pvt Ltd &middot; Hyderabad, India",
    desc: "Built and automated data extraction pipelines with Python (NumPy, Pandas, scikit-learn) to streamline client reporting workflows.",
  },
];

const stack = [
  {
    group: "Malware Analysis",
    items: [
      { name: "PEStudio / CAPA", level: 85 },
      { name: "Ghidra", level: 80 },
      { name: "YARA", level: 82 },
      { name: "Volatility 3 / winpmem", level: 78 },
    ],
  },
  {
    group: "Detection & SIEM",
    items: [
      { name: "Splunk", level: 88 },
      { name: "Microsoft Sentinel / KQL", level: 82 },
      { name: "Suricata", level: 85 },
      { name: "ELK Stack", level: 80 },
    ],
  },
  {
    group: "Network Forensics",
    items: [
      { name: "Zeek", level: 80 },
      { name: "RITA", level: 78 },
      { name: "Wireshark", level: 85 },
      { name: "Jupyter / pandas", level: 82 },
    ],
  },
  {
    group: "Cloud & Infra",
    items: [
      { name: "AWS (Lambda, CloudTrail, S3)", level: 84 },
      { name: "GCP", level: 78 },
      { name: "Azure", level: 65 },
      { name: "Docker", level: 80 },
    ],
  },
  {
    group: "Recon & Offense",
    items: [
      { name: "Kali Linux", level: 82 },
      { name: "Shodan / Censys", level: 75 },
      { name: "SpiderFoot", level: 70 },
      { name: "Nmap", level: 80 },
    ],
  },
  {
    group: "GRC & Frameworks",
    items: [
      { name: "NIST CSF", level: 88 },
      { name: "ISO 27001", level: 80 },
      { name: "PCI DSS", level: 78 },
      { name: "SOC 2 / GDPR / HIPAA", level: 76 },
    ],
  },
  {
    group: "Languages & Tools",
    items: [
      { name: "Python", level: 90 },
      { name: "PowerShell", level: 78 },
      { name: "n8n", level: 72 },
      { name: "GitHub Actions", level: 74 },
    ],
  },
];

// ===== Render =====

function renderTicker() {
  const build = () => tickerLines
    .map(l => `<span class="${l.sev === 'high' ? 'sev-high' : 'sev-ok'}">${l.text}</span>`)
    .join("");
  document.getElementById("tickerA").innerHTML = build();
  document.getElementById("tickerB").innerHTML = build();
}

function renderProjects() {
  const grid = document.getElementById("caseGrid");
  grid.innerHTML = projects.map((p, i) => `
    <article class="case-card reveal" data-index="${i}" data-tags="${p.tags.join("|")}" tabindex="0" role="button" aria-label="Open details for ${p.title}">
      <span class="case-id">${p.id} &middot; ${p.date}</span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="case-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <a class="case-link" href="${p.link}" target="_blank" rel="noopener">View repository &rarr;</a>
    </article>
  `).join("");

  grid.querySelectorAll(".case-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".case-link")) return;
      openModal(projects[Number(card.dataset.index)]);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openModal(projects[Number(card.dataset.index)]);
    });
  });
}

function renderFilterBar() {
  const bar = document.getElementById("filterBar");
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));
  bar.innerHTML = `<button class="filter-chip active" data-tag="all">All</button>` +
    allTags.map(t => `<button class="filter-chip" data-tag="${t}">${t}</button>`).join("");

  bar.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      bar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const tag = chip.dataset.tag;
      const cards = document.querySelectorAll(".case-card");

      cards.forEach(card => card.classList.add("filtering-out"));

      setTimeout(() => {
        let visibleIndex = 0;
        cards.forEach(card => {
          const tags = card.dataset.tags.split("|");
          const show = tag === "all" || tags.includes(tag);
          card.classList.toggle("hidden-by-filter", !show);
          if (show) {
            card.style.transitionDelay = Math.min(visibleIndex, 6) * 40 + "ms";
            visibleIndex++;
          }
        });
        requestAnimationFrame(() => {
          cards.forEach(card => card.classList.remove("filtering-out"));
        });
      }, 180);
    });
  });
}

function openModal(p) {
  document.getElementById("modalId").textContent = `${p.id} \u00b7 ${p.date}`;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalTags").innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
  document.getElementById("modalLink").href = p.link;
  const overlay = document.getElementById("modalOverlay");
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("is-open"));
  });
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  const finish = () => { overlay.hidden = true; };
  if (prefersReduced) {
    finish();
  } else {
    setTimeout(finish, 280);
  }
}

function initModal() {
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function renderTimeline() {
  const tl = document.getElementById("timeline");
  tl.innerHTML = experience.map(e => `
    <div class="tl-item reveal">
      <span class="tl-date">${e.date}</span>
      <div>
        <p class="tl-role">${e.role}</p>
        <p class="tl-org">${e.org}</p>
        <p class="tl-desc">${e.desc}</p>
      </div>
    </div>
  `).join("");
}

function renderStack() {
  const grid = document.getElementById("stackGrid");
  grid.innerHTML = stack.map(s => `
    <div class="stack-group reveal">
      <h4>${s.group}</h4>
      <ul>
        ${s.items.map(i => `
          <li class="skill-row">
            <div class="skill-row-top"><span>${i.name}</span></div>
            <div class="skill-meter"><div class="skill-meter-fill" data-level="${i.level}"></div></div>
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("");
}

function initSkillMeters() {
  const fills = document.querySelectorAll(".skill-meter-fill");
  if (!("IntersectionObserver" in window)) {
    fills.forEach(f => f.style.width = f.dataset.level + "%");
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level + "%";
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  fills.forEach(f => io.observe(f));
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");

  const groups = new Map();
  els.forEach(el => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach(siblings => {
    siblings.forEach((el, i) => {
      const delay = Math.min(i, 6) * 70;
      el.style.transitionDelay = delay + "ms";
    });
  });

  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

// ===== Greeter =====

const greeting = `Hey, I'm Ronan. This log covers ${caseCount} security builds, from cloud honeypots to malware forensics. Have a look around.`;

let typeSpeechToken = 0;

function typeSpeech(text, el, speed = 22) {
  const myToken = ++typeSpeechToken;
  el.textContent = "";
  let i = 0;
  const tick = () => {
    if (myToken !== typeSpeechToken) return;
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(tick, speed);
    }
  };
  tick();
}

function playAvatarVideo() {
  const video = document.getElementById("avatarVideo");
  if (!video) return;
  try {
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && playPromise.catch) playPromise.catch(() => {});
  } catch (e) {}
}

function startGreetingSpeech() {
  const speechEl = document.getElementById("speechText");
  if (!speechEl) return;
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  typeSpeech(greeting, speechEl, prefersReduced ? 0 : 22);
}

function initGreeter() {
  const avatarBtn = document.getElementById("avatarBtn");
  const contactPill = document.querySelector(".contact-pill");

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  avatarBtn.addEventListener("click", (e) => {
    if (e.target.closest(".contact-pill")) return;
    playAvatarVideo();
    startGreetingSpeech();
  });

  if (contactPill) {
    contactPill.addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("contact").scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    });
  }
}

// ===== Terminal =====

function tprint(body, text, cls) {
  const line = document.createElement("div");
  line.className = "tline" + (cls ? " " + cls : "");
  line.innerHTML = text;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;
}

const terminalCommands = {
  help: () => `Commands: <span class="thl">about</span>, <span class="thl">projects</span>, <span class="thl">experience</span>, <span class="thl">stack</span>, <span class="thl">contact</span>, <span class="thl">whoami</span>, <span class="thl">${caseRange}</span>, <span class="thl">clear</span>`,
  about: () => "MS Cybersecurity @ Northeastern (GPA 3.8). AI Cybersecurity Intern @ Abbott. Focused on detection engineering, malware analysis, cloud security, and GRC.",
  whoami: () => "ronan-kongala &middot; cybersecurity engineer &middot; open to Summer and Fall 2027 roles",
  projects: () => `${caseCount} cases logged. Type <span class="thl">${caseRange}</span> for a case, or scroll to Project Log.`,
  experience: () => "Abbott (AI Cybersecurity Intern), Exact Sciences, Northeastern TA (CY5001), NIELIT Virtual Academy, IEEE ICAISS 2025 first author. See Experience section for the full timeline.",
  stack: () => "PEStudio, CAPA, Ghidra, YARA, Volatility 3, Zeek, RITA, Splunk, Sentinel/KQL, Suricata, ELK, AWS, GCP, Docker, Kali, Python. Full breakdown in the Stack section.",
  contact: () => "kongalaronan@gmail.com &middot; linkedin.com/in/ronan-kongala &middot; github.com/ronankongala",
  sudo: () => "Nice try. Access denied: this terminal only reads public data.",
};

function runCommand(raw, body) {
  const cmd = raw.trim();
  if (!cmd) return;
  tprint(body, cmd, "tcmd");

  if (cmd === "clear") {
    body.innerHTML = "";
    return;
  }

  const openMatch = cmd.match(/^open\s+(\d+)/i);
  if (openMatch) {
    const idx = Number(openMatch[1]) - 1;
    if (projects[idx]) {
      openModal(projects[idx]);
      tprint(body, `Opening ${projects[idx].id}: ${projects[idx].title}...`);
    } else {
      tprint(body, `No case with that number. Try open 1 through open ${caseCount}.`, "terr");
    }
    return;
  }

  const key = cmd.toLowerCase();
  if (terminalCommands[key]) {
    tprint(body, terminalCommands[key]());
  } else {
    tprint(body, `Command not found: ${cmd}. Type <span class="thl">help</span>.`, "terr");
  }
}

function initTerminal() {
  const input = document.getElementById("terminalInput");
  const body = document.getElementById("terminalBody");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runCommand(input.value, body);
      input.value = "";
    }
  });

  body.addEventListener("click", (e) => {
    const target = e.target.closest(".thl");
    if (!target) return;
    const cmd = target.textContent.trim();
    if (cmd === caseRange) {
      runCommand("open 1", body);
    } else {
      runCommand(cmd, body);
    }
    input.focus();
  });
}

// ===== Scrollspy =====

function initScrollspy() {
  const links = document.querySelectorAll("#topnav a");
  const sections = Array.from(links)
    .map(l => document.getElementById(l.dataset.section))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.toggle("active", l.dataset.section === entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(s => io.observe(s));
}

// ===== Interactive network web (hero) =====

function initNetworkGraph() {
  const canvas = document.getElementById("netCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const LINE = "45, 212, 191";
  const DOT = "94, 234, 212";
  const ALERT = "232, 162, 61";

  const LINK_DIST = 132;
  const MAX_LINKS = 2;
  const CURSOR_DIST = 210;
  const CURSOR_LINK_DIST = 190;
  const PULL = 0.075;

  // Base drift is constant forever. Everything interactive lands in a separate
  // impulse velocity that decays, so a shove fades back to the base drift
  // instead of permanently speeding a node up.
  const IMPULSE_DAMP = 0.92;
  const SPEED_MIN = 0.15;
  const SPEED_MAX = 0.35;

  // One node per this many pixels of open space, measured after the content
  // boxes are carved out, so density holds steady across viewport sizes.
  const AREA_PER_NODE = 14000;
  const COUNT_MIN = 30;
  const COUNT_MAX = 120;

  const ZONE_PAD = 16;
  const ZONE_MARGIN = 54;
  const ZONE_PUSH = 0.1;

  const SEP_DIST = 74;
  const SEP_PUSH = 0.05;

  let w = 0, h = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // The headline and the photo card are no-go areas. The web should read as
  // living in the open space around them, not as texture behind them.
  const ZONE_SELECTORS = [".hero-inner", ".laptop-showcase"];
  let zones = [];

  function measureZones() {
    const cr = canvas.getBoundingClientRect();
    zones = ZONE_SELECTORS
      .map(sel => document.querySelector(sel))
      .filter(el => el && el.getBoundingClientRect().width > 0)
      .map(el => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - cr.left - ZONE_PAD,
          y: r.top - cr.top - ZONE_PAD,
          w: r.width + ZONE_PAD * 2,
          h: r.height + ZONE_PAD * 2,
        };
      });
  }

  function inZone(x, y) {
    for (const z of zones) {
      if (x > z.x && x < z.x + z.w && y > z.y && y < z.y + z.h) return z;
    }
    return null;
  }

  function openArea() {
    let taken = 0;
    for (const z of zones) {
      taken += Math.max(0, Math.min(z.w, w)) * Math.max(0, Math.min(z.h, h));
    }
    return Math.max(w * h - taken, w * h * 0.15);
  }

  // Steer away from a zone before reaching it, along whichever axis the node is
  // shallowest on, so it slides around the box instead of stalling against it.
  function zoneSteer(n) {
    for (const z of zones) {
      const hx = z.w / 2 + ZONE_MARGIN;
      const hy = z.h / 2 + ZONE_MARGIN;
      const dx = n.x - (z.x + z.w / 2);
      const dy = n.y - (z.y + z.h / 2);
      const ox = 1 - Math.abs(dx) / hx;
      const oy = 1 - Math.abs(dy) / hy;
      if (ox <= 0 || oy <= 0) continue;
      if (ox < oy) n.ivx += (dx >= 0 ? 1 : -1) * ox * ZONE_PUSH;
      else n.ivy += (dy >= 0 ? 1 : -1) * oy * ZONE_PUSH;
    }
  }

  // Last-resort clamp so a node can never actually render on top of content.
  function evictFromZone(n) {
    const z = inZone(n.x, n.y);
    if (!z) return;
    const dLeft = n.x - z.x;
    const dRight = z.x + z.w - n.x;
    const dTop = n.y - z.y;
    const dBottom = z.y + z.h - n.y;
    const min = Math.min(dLeft, dRight, dTop, dBottom);
    if (min === dLeft) { n.x = z.x; n.bvx = -Math.abs(n.bvx); n.ivx = 0; }
    else if (min === dRight) { n.x = z.x + z.w; n.bvx = Math.abs(n.bvx); n.ivx = 0; }
    else if (min === dTop) { n.y = z.y; n.bvy = -Math.abs(n.bvy); n.ivy = 0; }
    else { n.y = z.y + z.h; n.bvy = Math.abs(n.bvy); n.ivy = 0; }
  }

  resize();
  measureZones();

  function openSpot() {
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      if (!inZone(x, y)) return { x, y };
    }
    return { x: Math.random() * w, y: Math.random() * h };
  }

  function makeNode() {
    const spot = openSpot();
    const angle = Math.random() * Math.PI * 2;
    const speed = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    return {
      x: spot.x,
      y: spot.y,
      bvx: Math.cos(angle) * speed,
      bvy: Math.sin(angle) * speed,
      ivx: 0,
      ivy: 0,
      pulse: Math.random() * Math.PI * 2,
      alert: Math.random() < 0.1,
      lit: 0,
    };
  }

  function targetCount() {
    const n = Math.round(openArea() / AREA_PER_NODE);
    return Math.min(Math.max(n, COUNT_MIN), COUNT_MAX);
  }

  const nodes = [];
  function syncCount() {
    const target = targetCount();
    while (nodes.length < target) nodes.push(makeNode());
    if (nodes.length > target) nodes.length = target;
    if (degree.length < nodes.length) degree = new Uint8Array(nodes.length);
  }

  let degree = new Uint8Array(COUNT_MAX);
  const pairs = [];

  syncCount();

  window.addEventListener("resize", () => { resize(); measureZones(); syncCount(); });

  // Pointer is tracked in canvas space. The canvas is pointer-events:none and sits
  // behind the hero content, so we listen on window and project into local coords.
  const pointer = { x: 0, y: 0, active: false };
  const ripples = [];

  function projectPointer(e) {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    const inBounds =
      pointer.x > -60 && pointer.x < w + 60 &&
      pointer.y > -60 && pointer.y < h + 60;
    // Over the headline or the photo, the web stays out of the way entirely.
    pointer.active = inBounds && !inZone(pointer.x, pointer.y);
  }

  function bindPointer() {
    window.addEventListener("pointermove", projectPointer, { passive: true });
    window.addEventListener("pointerleave", () => { pointer.active = false; }, { passive: true });
    window.addEventListener("pointerdown", (e) => {
      projectPointer(e);
      if (pointer.active) ripples.push({ x: pointer.x, y: pointer.y, r: 0 });
    }, { passive: true });
  }

  function drawStrand(ax, ay, bx, by, opacity, width) {
    ctx.strokeStyle = "rgba(" + LINE + ", " + opacity + ")";
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  }

  // A strand can still clip a zone corner even when both ends are outside it,
  // so sample the midpoint and the quarter points before drawing.
  function strandClear(ax, ay, bx, by) {
    return !inZone((ax + bx) / 2, (ay + by) / 2)
      && !inZone(ax + (bx - ax) * 0.25, ay + (by - ay) * 0.25)
      && !inZone(ax + (bx - ax) * 0.75, ay + (by - ay) * 0.75);
  }

  function step() {
    // Spread pass: push apart anything that has bunched up. This is what keeps
    // cursor attraction from collapsing the whole field into the pointer.
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > SEP_DIST * SEP_DIST || d2 < 0.01) continue;
        const d = Math.sqrt(d2);
        const f = (1 - d / SEP_DIST) * SEP_PUSH;
        const ux = dx / d, uy = dy / d;
        a.ivx += ux * f; a.ivy += uy * f;
        b.ivx -= ux * f; b.ivy -= uy * f;
      }
    }

    for (const n of nodes) {
      zoneSteer(n);

      // Cursor tugs nearby nodes toward it, so the web leans your way.
      if (pointer.active) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CURSOR_DIST && dist > 0.5) {
          const force = (1 - dist / CURSOR_DIST) * PULL;
          n.ivx += (dx / dist) * force;
          n.ivy += (dy / dist) * force;
          n.lit = Math.max(n.lit, 1 - dist / CURSOR_DIST);
        }
      }

      // Ripple rings shove nodes outward as the wavefront passes through them.
      for (const rp of ripples) {
        const dx = n.x - rp.x;
        const dy = n.y - rp.y;
        const dist = Math.hypot(dx, dy);
        const band = Math.abs(dist - rp.r);
        if (band < 34 && dist > 0.5) {
          const force = (1 - band / 34) * 0.5;
          n.ivx += (dx / dist) * force;
          n.ivy += (dy / dist) * force;
          n.lit = Math.max(n.lit, 1 - band / 34);
        }
      }

      n.ivx *= IMPULSE_DAMP;
      n.ivy *= IMPULSE_DAMP;

      n.x += n.bvx + n.ivx;
      n.y += n.bvy + n.ivy;

      // Wrap rather than bounce. Bouncing walls collect nodes in the corners.
      const m = 12;
      if (n.x < -m) n.x = w + m;
      else if (n.x > w + m) n.x = -m;
      if (n.y < -m) n.y = h + m;
      else if (n.y > h + m) n.y = -m;

      evictFromZone(n);

      n.pulse += 0.02;
      n.lit *= 0.93;
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].r += 7;
      if (ripples[i].r > Math.hypot(w, h)) ripples.splice(i, 1);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Nearest-neighbour strands with a degree cap. Linking every pair in range
    // fuses the field into one mesh, so each node takes at most MAX_LINKS
    // partners, shortest first, leaving separate lines across the open space.
    pairs.length = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist >= LINK_DIST) continue;
        if (!strandClear(a.x, a.y, b.x, b.y)) continue;
        pairs.push({ i: i, j: j, dist: dist });
      }
    }
    pairs.sort((p, q) => p.dist - q.dist);

    degree.fill(0);
    for (const p of pairs) {
      if (degree[p.i] >= MAX_LINKS || degree[p.j] >= MAX_LINKS) continue;
      degree[p.i]++;
      degree[p.j]++;
      const a = nodes[p.i], b = nodes[p.j];
      const base = (1 - p.dist / LINK_DIST) * 0.34;
      const boost = Math.max(a.lit, b.lit);
      drawStrand(a.x, a.y, b.x, b.y, base + boost * 0.45, 1 + boost * 0.8);
    }

    // Strands anchoring the web to the cursor itself. This is the detail that
    // makes the field feel responsive rather than decorative.
    if (pointer.active) {
      for (const n of nodes) {
        const dist = Math.hypot(pointer.x - n.x, pointer.y - n.y);
        if (dist >= CURSOR_LINK_DIST) continue;
        if (!strandClear(pointer.x, pointer.y, n.x, n.y)) continue;
        const t = 1 - dist / CURSOR_LINK_DIST;
        drawStrand(pointer.x, pointer.y, n.x, n.y, t * 0.6, 0.9 + t);
      }
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + DOT + ", 0.95)";
      ctx.fill();
    }

    for (const rp of ripples) {
      const fade = Math.max(0, 1 - rp.r / Math.hypot(w, h));
      ctx.strokeStyle = "rgba(" + LINE + ", " + (fade * 0.3) + ")";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (const n of nodes) {
      const r = n.alert ? 2.6 + Math.sin(n.pulse) * 1.2 : 1.9 + n.lit * 1.8;
      ctx.beginPath();
      ctx.arc(n.x, n.y, Math.max(r, 0.6), 0, Math.PI * 2);
      ctx.fillStyle = n.alert
        ? "rgba(" + ALERT + ", " + (0.6 + Math.sin(n.pulse) * 0.3) + ")"
        : "rgba(" + DOT + ", " + (0.55 + n.lit * 0.45) + ")";
      ctx.fill();
    }
  }

  if (prefersReduced) {
    draw();
    return;
  }

  bindPointer();

  // Only burn frames while the hero is actually on screen and the tab is focused.
  let rafId = 0;
  let onScreen = true;
  let tick = 0;

  function frame() {
    // The hero stages fade in after load, so zone boxes settle a beat late.
    if (tick++ % 30 === 0) { measureZones(); syncCount(); }
    step();
    draw();
    rafId = requestAnimationFrame(frame);
  }
  function start() {
    if (!rafId && onScreen && !document.hidden) rafId = requestAnimationFrame(frame);
  }
  function stop() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen) start(); else stop();
    }, { threshold: 0 }).observe(canvas);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop(); else start();
  });

  start();
}

// ===== Text motion =====

const SCRAMBLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>*+-_";

// Resolves text left to right out of noise. Keeps the final string on aria-label
// so assistive tech never reads the intermediate garbage.
function scrambleIn(el, speed = 1.6) {
  const text = el.dataset.text || el.textContent;
  el.dataset.text = text;
  el.setAttribute("aria-label", text);

  // Pin the settled height first: mid-scramble the string is shorter, and a
  // wrapped title would otherwise collapse a line and shove the page around.
  el.style.minHeight = el.offsetHeight + "px";

  let frame = 0;
  function tick() {
    const settled = Math.floor(frame / speed);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (i < settled || ch === " ") {
        out += ch;
      } else if (i < settled + 6) {
        out += SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
      }
    }
    el.textContent = out;
    frame++;
    if (settled <= text.length) requestAnimationFrame(tick);
    else { el.textContent = text; el.style.minHeight = ""; }
  }
  tick();
}

// Splits a line into word spans so they can rise in sequence instead of as a block.
function splitWords(el) {
  if (el.dataset.split === "1") return;
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute("aria-label", el.textContent.trim());
  el.textContent = "";
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    span.style.transitionDelay = Math.min(i * 28, 700) + "ms";
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.dataset.split = "1";
}

function initTextFX() {
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const role = document.getElementById("heroRole");
  if (role) {
    splitWords(role);
  }

  if (!("IntersectionObserver" in window)) return;
  // Hero labels are handled by the intro sequence; observing them here would burn
  // the scramble while the hero is still faded out.
  const titles = Array.from(document.querySelectorAll(".section-title, .eyebrow"))
    .filter(el => !el.closest(".hero"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      scrambleIn(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  titles.forEach(t => io.observe(t));
}

renderTicker();
renderProjects();
renderFilterBar();
renderTimeline();
renderStack();
initReveal();
initSkillMeters();
initGreeter();
initTerminal();
initModal();
initScrollspy();
// Background flourishes must never block the intro from dismissing.
try { initNetworkGraph(); } catch (e) { console.error("network web failed:", e); }
try { initTextFX(); } catch (e) { console.error("text fx failed:", e); }
initIntro();

function initIntro() {
  const overlay = document.getElementById("introOverlay");

  if (!overlay) {
    initHeroIntro();
    return;
  }

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alreadySeen = false;

  if (prefersReduced || alreadySeen) {
    overlay.remove();
    initHeroIntro();
    return;
  }

  const linesEl = document.getElementById("introLines");
  const skipEl = document.querySelector(".intro-skip");
  const bootLines = [
    { text: "$ initiating portfolio.sys", cls: "icmd" },
    { text: `[OK] loading ${caseCount} case files`, cls: "iok" },
    { text: "[OK] establishing signal", cls: "iok" },
    { text: "[OK] access granted<span class=\"isignal\">, welcome</span>", cls: "iok" },
  ];

  let dismissed = false;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    sessionStorage.setItem("introSeen", "1");
    overlay.classList.add("intro-out");
    initHeroIntro();
    setTimeout(() => overlay.remove(), 550);
  }

  bootLines.forEach((line, i) => {
    const div = document.createElement("div");
    div.className = "iline " + line.cls;
    div.innerHTML = line.text;
    linesEl.appendChild(div);
    setTimeout(() => div.classList.add("in"), 220 * i + 120);
  });

  setTimeout(() => { if (skipEl) skipEl.classList.add("in"); }, 200);

  overlay.addEventListener("click", dismiss);
  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    dismiss();
  }, { once: true });
  window.addEventListener("wheel", dismiss, { once: true, passive: true });
  window.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dismiss();
  }, { once: true, passive: false });

  const totalTime = 10000;
  setTimeout(dismiss, totalTime);
}

function initHeroIntro() {
  const nameEl = document.getElementById("heroNameType");
  const caretEl = document.getElementById("heroNameCaret");
  const stages = document.querySelectorAll(".hero-stage");
  if (!nameEl) return;

  const fullName = "Ronan Kongala";
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealStages() {
    stages.forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), i * 90);
    });
    const eyebrow = document.getElementById("heroEyebrow");
    if (eyebrow) scrambleIn(eyebrow);
    const role = document.getElementById("heroRole");
    if (role) setTimeout(() => role.classList.add("words-in"), 220);
    playAvatarVideo();
    startGreetingSpeech();
  }

  if (prefersReduced) {
    nameEl.textContent = fullName;
    if (caretEl) caretEl.classList.add("done");
    stages.forEach(el => el.classList.add("in"));
    playAvatarVideo();
    startGreetingSpeech();
    return;
  }

  let i = 0;
  function typeNext() {
    if (i <= fullName.length) {
      nameEl.textContent = fullName.slice(0, i);
      i++;
      setTimeout(typeNext, 65);
    } else {
      if (caretEl) caretEl.classList.add("done");
      revealStages();
    }
  }
  typeNext();
}
