// ===== Data =====

const tickerLines = [
  { text: "[FRAUDSENTRY] RandomForest 0.748 ROC-AUC, 649 of 4,064 held-out fraud cases caught at a 3% FPR budget", sev: "high" },
  { text: "[FRAUDSENTRY] 23.7-point subgroup false-positive-rate spread flagged in merchant-category fairness audit", sev: "high" },
  { text: "[GUARDDUTY] 10 findings auto-ticketed to Jira, 13 finding types mapped to MITRE ATT&CK", sev: "ok" },
  { text: "[T-POT] 66,185 attacker events captured across Conpot/Cowrie honeypots in the first hour", sev: "high" },
  { text: "[SURICATA] 15,315 IDS alerts raised in the first hour of deployment", sev: "high" },
  { text: "[MITRE ATT&CK] 4 techniques mapped: T1046, T1110, T1595, T1071", sev: "ok" },
  { text: "[NESSUS] 25 findings scored via custom CVSS v3.0 engine, 8m scan window", sev: "high" },
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
  { text: "[POA&M] 7 findings open post-remediation, each keyed to a DISA STIG rule ID", sev: "high" },
  { text: "[OPA] 7/7 Rego policy tests passing, manager delete allowed, non-manager denied 403", sev: "ok" },
  { text: "[VAULT] delete-order AppRole credential minted, 20s TTL, rejected after expiry", sev: "ok" },
  { text: "[MTLS] tcpdump on ztlab-net shows TLS records only, no legible method, path or body", sev: "ok" },
  { text: "[SONARQUBE] SAST gate blocked on BLOCKER java:S6437 and CRITICAL java:S5547, cleared after removal", sev: "high" },
  { text: "[HELM] vulntrack chart deployed, backend/frontend/postgres pods running, 0 restarts", sev: "ok" },
  { text: "[BURP] 3 DAST findings on VulnTrack API: missing CSP, JWT enforced, SQLi on filters not exploitable", sev: "ok" },
  { text: "[SLIVER C2] 7 ATT&CK techniques executed across the kill chain: T1204.002, T1071.001, T1547.001, T1134.001, T1003.002, T1550.002, T1041", sev: "high" },
  { text: "[PYPYKATZ] 5 accounts extracted from SAM hive: Administrator, Guest, DefaultAccount, WDAGUtilityAccount, Victim", sev: "high" },
  { text: "[IMPACKET] pass-the-hash SMB auth confirmed against 192.168.93.138, ADMIN$ C$ IPC$ shares enumerated", sev: "high" },
];

const projects = [
  {
    id: "CASE-24",
    title: "Red Team C2 Lab: Sliver C2 Adversary Emulation",
    tags: ["Sliver C2", "MITRE ATT&CK", "Red Team", "impacket", "pypykatz", "VMware", "Adversary Emulation"],
    desc: "Sliver C2 v1.7.7 run against a Windows 11 Enterprise victim on an isolated VMware NAT network, covering 7 MITRE ATT&CK techniques. The chain started with HTTPS beacon delivery (T1204.002) and C2 traffic on port 443 at a 60-second interval (T1071.001), then registry run key persistence confirmed in regedit (T1547.001) and token impersonation with SeImpersonatePrivilege (T1134.001). A SAM and SYSTEM hive dump parsed with pypykatz yielded 5 accounts (T1003.002), impacket carried pass-the-hash SMB authentication (T1550.002), and files left over the live C2 channel (T1041). On the detection side there are 3 Sigma rules, an ATT&CK Navigator layer, and a structured red team report.",
    date: "Sep 2026",
    link: "https://github.com/ronankongala/red-team-c2-lab",
  },
  {
    id: "CASE-23",
    title: "VulnTrack: Full-Stack Vulnerability Management with a DevSecOps Pipeline",
    tags: ["Spring Boot", "React", "PostgreSQL", "JWT", "Jenkins", "SonarQube", "SAST", "Kubernetes", "Helm", "Burp Suite", "DAST"],
    desc: "Vulnerability management app taken through a DevSecOps pipeline from commit to cluster. The backend is a Spring Boot 4 REST API on Java 21 with PostgreSQL, Flyway migrations, and JWT authentication; the React and TypeScript dashboard adds severity color-coding and filters. The SonarQube SAST gate in the 7-stage Jenkins pipeline was tested with injected defects: it failed on a BLOCKER java:S6437 and a CRITICAL java:S5547 and passed once both were removed. A Helm chart deploys it to Kubernetes, with all 3 pods running and 0 restarts. Manual Burp Suite DAST produced 3 documented findings: a missing CSP header, JWT enforcement confirmed, and SQL injection on filters not exploitable.",
    date: "Sep 2026",
    link: "https://github.com/ronankongala/vulntrack",
  },
  {
    id: "CASE-22",
    title: "Zero Trust Test Bed: mTLS, OIDC, OPA + Just-in-Time Vault Credentials",
    tags: ["Zero Trust", "NIST SP 800-207", "mutual TLS", "Keycloak", "OIDC", "SAML 2.0", "Open Policy Agent", "Rego", "HashiCorp Vault", "Docker"],
    desc: "Every request to these 3 microservices must clear 4 independent layers, and only the gateway publishes a port. Layer 1 is mutual TLS with lab-CA certificates on every service. Layer 2 is OIDC through Keycloak, returning 401 without a token. Layer 3 is Open Policy Agent deciding every request, with 7 of 7 Rego tests passing and a live 403 versus 200 split driven only by token roles. Layer 4 replaces standing privilege with Vault credentials on a 20 second TTL, rejected after expiry. tcpdump confirms encryption against a plaintext baseline, and every control maps to NIST SP 800-207.",
    date: "Sep 2026",
    link: "https://github.com/ronankongala/zerotrust-lab",
  },
  {
    id: "CASE-21",
    title: "FedRAMP RMF Compliance Lab: STIG Hardening, OpenSCAP + POA&M",
    tags: ["FedRAMP Moderate", "NIST 800-53 Rev 5", "DISA STIG V1R5", "OpenSCAP", "Ansible", "POA&M", "SSP", "SOX/COSO"],
    desc: "Took an Ubuntu 24.04 host through a FedRAMP Moderate RMF cycle: assessment, automated remediation, reassessment, and the documentation package an assessor receives. The SCAP content was built from ComplianceAsCode source and pinned to DISA STIG V1R5. The baseline OpenSCAP run scored 69.58%. An Ansible playbook generated from the same profile applied 13 changes with 0 failures and raised the score to 78.06%. The 7 residual findings are tracked in a POA&M keyed to DISA STIG rule IDs, alongside an SSP summary across all 20 NIST 800-53 Rev 5 families, a 52-control FedRAMP matrix, and a SOX/COSO access certification.",
    date: "Sep 2026",
    link: "https://github.com/ronankongala/fedramp-rmf-lab",
  },
  {
    id: "CASE-20",
    title: "GuardDutySync: GuardDuty to MITRE ATT&CK to Jira Pipeline",
    tags: ["AWS GuardDuty", "boto3", "MITRE ATT&CK", "Jira Cloud REST API", "Python", "Security Automation"],
    desc: "Three-stage Python pipeline that turns raw AWS GuardDuty alerts into enriched, deduplicated Jira tickets with no manual analyst step. The poller pulls findings with boto3 under a read-only IAM user, validated against 434 sample findings. The enricher maps 13 finding types to 12 MITRE ATT&CK techniques, pulling technique names and tactics from the STIX bundle. The ticketer posts to the Jira Cloud REST API, mapping GuardDuty severity onto Jira priority. Reruns are idempotent: a verified run created 10 tickets with 0 errors, and an immediate second run skipped all 10 as duplicates.",
    date: "Sep 2026",
    link: "https://github.com/ronankongala/guardduty-sync",
  },
  {
    id: "CASE-19",
    title: "Authorized Penetration Test, Metasploit Lab",
    tags: ["Metasploit Framework", "Nmap", "Kali Linux", "Penetration Testing", "CVSS", "MITRE ATT&CK"],
    desc: "Authorized penetration test against two intentionally vulnerable lab environments (Metasploitable2 self-hosted, TryHackMe Blue). Nmap reconnaissance across all 65,535 ports turned up vsftpd 2.3.4, Samba 3.0.20, rexec, and unpatched SMBv1. Exploited with the Metasploit Framework: CVE-2011-2523 (vsftpd backdoor, root shell via malicious username), CVE-2007-2447 (Samba usermap_script command injection, root shell), the cleartext rexec authentication service (port 512), and CVE-2017-0144 EternalBlue (SMBv1 buffer overflow, NT AUTHORITY\\SYSTEM). The pentest report scores all 4 findings with CVSS v3, maps them to MITRE ATT&CK (T1190, T1210, T1021), and gives reproduction steps, business impact, and remediation recommendations.",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/metasploit-pentest-report",
  },
  {
    id: "CASE-18",
    title: "Zeek Beacon Detector (OCaml)",
    tags: ["OCaml", "dune", "Zeek", "Beacon Detection", "Functional Programming", "Network Forensics"],
    desc: "Functional rewrite of the CASE-17 beacon-scoring logic in OCaml, comparing an imperative Python pipeline against a purely functional one on the same detection problem. Parses a Zeek conn.log, groups connections by source IP with Map.Make(String), folds inter-arrival gaps with List.fold_left, and flags low-variance periodic senders as C2 beacon candidates. Against the sample log it isolates 10.0.0.5 at a 477.1s mean interval and variance 1.84, separating it from two high-variance talkers. Results are modeled as a variant type, so an unscored IP cannot reach the output printer.",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/zeek-beacon-ocaml",
  },
  {
    id: "CASE-17",
    title: "Zeek Network Forensics + Beacon Detection",
    tags: ["Zeek", "RITA", "Jupyter", "Beacon Detection", "Network Forensics", "Cobalt Strike"],
    desc: "85.239.53.219 beaconed every 477 seconds on average, and Zeek and RITA found it in an SSLoad and Cobalt Strike malware PCAP. Zeek 8.2.1 turned the 6.4MB capture into 17 structured logs, including conn.log, dns.log, ssl.log, kerberos.log, and ldap.log. RITA v5.1.2 scored every external connection for beacon regularity and auto-tagged the host with rare_signature:SSLoad/1.1 (beacon score 0.504, 11 connections, 5,087s total duration). Three Jupyter threat hunting notebooks cover conn.log duration analysis, DNS query profiling, and beacon interval visualization. The investigation report PDF maps the findings to 6 MITRE ATT&CK techniques (T1071, T1071.004, T1008, T1095, T1557, T1018) with an IOC table and 2 Sigma detection rules.",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/zeek-network-forensics-lab",
  },
  {
    id: "CASE-16",
    title: "Malware Analysis Lab: AgentTesla Static, Dynamic + Memory Forensics",
    tags: ["PEStudio", "CAPA", "Ghidra", "YARA", "CAPE Sandbox", "Any.run", "Volatility 3", "Malware Analysis"],
    desc: "Six-phase teardown of an AgentTesla credential stealer on an isolated FlareVM + REMnux lab. Static: PEStudio found 5 imports and entropy 6.454; CAPA mapped T1027 XOR x16 and T1497 anti-sandbox evasion; Ghidra confirmed MurmurHash API hashing at FUN_1400015a0, seed 0xa7e8bf08. Three YARA rules written from the extracted indicators had zero false positives against System32. Dynamic: the Any.run run produced 87 IOCs, 32 dropped files targeting Chrome/Edge credential stores, and 11 MITRE ATT&CK techniques, and the sandbox verdict also tagged Stealc/Vidar. Memory: winpmem v4.0-rc1 acquired a 7GB live dump; Volatility 3 windows.malfind detected PAGE_EXECUTE_READWRITE code injection in SearchApp.exe (PID 6656) and powershell.exe (PID 7848).",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/malware-analysis-lab",
  },
  {
    id: "CASE-15",
    title: "AppSec Pipeline + Secrets Management Lab",
    tags: ["Semgrep", "Checkov", "Trivy", "OWASP ZAP", "Vault", "Okta", "Terraform", "GitHub Actions", "PCI-DSS"],
    desc: "Wrapped OWASP WebGoat (a deliberately vulnerable Java app) with a 3-gate CI/CD security pipeline: Semgrep SAST surfaced 66 findings across 1,002 files, Checkov flagged 3 Dockerfile misconfigurations with Prisma Cloud policy IDs, and Trivy identified 71 CVEs in the container image. OWASP ZAP active scan (961 requests) found 8 vulnerability categories including missing CSRF protections. Migrated app credentials from hardcoded config into HashiCorp Vault's KV engine with secret rotation demo (v1 → v2). Configured Okta OIDC SSO with MFA enforcement via Okta Verify. Mapped the environment against 16 PCI-DSS 4.0 requirements with an accepted risk register.",
    date: "Aug 2026",
    link: "https://github.com/ronankongala/Appsec-pipeline-lab",
  },
  {
    id: "CASE-14",
    title: "Access-Governed RAG Console (LLM Access Control)",
    tags: ["RAG", "LLM Security", "Entra ID", "RBAC", "Flask", "Azure"],
    desc: "Retrieval-augmented AI assistant that enforces role-based access control at the retrieval layer. A restricted document is dropped from an unauthorized user's candidate set before the model sees it, so the model is never trusted to keep a secret. Microsoft Entra ID (OAuth2) sign-in maps app-role claims to backend RBAC, a prompt-injection scanner resisted all 10 cases in an attack battery, and every access decision goes to an audit trail. It runs on Azure App Service, and the README lists what a production version would still need.",
    date: "Jul 2026",
    link: "https://github.com/ronankongala/Access-governed-rag-console",
  },
  {
    id: "CASE-13",
    title: "NIST 800-171 / CMMC Compliance Baseline Lab",
    tags: ["Active Directory", "Microsoft Intune", "Entra ID", "NIST 800-171", "CMMC"],
    desc: "Lab environment modeled on what a small defense contractor would run: Windows Server 2022 Active Directory with GPO-enforced password and lockout policies, Microsoft Intune device compliance, Entra ID Conditional Access in report-only mode, and Windows Defender Firewall rules restricting SMB and blocking outbound Telnet. Each control maps to a NIST 800-171 requirement in a System Security Plan and a CMMC Level 2 self-assessment scorecard. Two gaps (FIPS-validated cryptography, periodic vulnerability scanning) are flagged as next steps.",
    date: "Jul 2026",
    link: "https://github.com/ronankongala/nist-cmmc-compliance-lab",
  },
  {
    id: "CASE-12",
    title: "Kali SSH MCP",
    tags: ["MCP", "Kali Linux", "SSH", "Open Source"],
    desc: "Lets Claude Desktop run commands in a Kali Linux terminal over SSH through the Model Context Protocol, so an AI assistant can work directly in a Kali environment for security research and pen-testing workflows.",
    date: "2025 to Present",
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
    title: "FraudSentry: Fraud Detection, SHAP Explainability + Fairness Audit",
    tags: ["Fraud Detection", "XGBoost", "SHAP", "scikit-learn", "Fairness Audit", "GDPR DPIA"],
    desc: "Fraud detection on the IEEE-CIS dataset, audited for bias and privacy as well as accuracy. Velocity, amount-deviation, geo-mismatch, and temporal features fed logistic regression, RandomForest, XGBoost, and IsolationForest, compared on a time-based split. Scored on recall at a fixed 3% false-positive budget, RandomForest led at 0.748 ROC-AUC and caught 649 of 4,064 held-out fraud cases. SHAP ranked amount, hour_of_day, and electronics merchant category as the top drivers, and a fairness audit found a 23.7-point false-positive-rate spread across merchant categories. A SQLite case-management layer and a GDPR Article 35 DPIA sit on top.",
    date: "Sep 2026",
    link: "https://github.com/ronankongala/fraudsentry",
  },
  {
    id: "CASE-09",
    title: "Nessus Vulnerability Management Pipeline",
    tags: ["Nessus", "PowerShell", "Python", "CVSS v3.0"],
    desc: "Nessus Essentials scan pipeline with a custom PowerShell/Python risk-scoring engine. An 8-minute scan window surfaced 25 vulnerabilities, and a custom weighting algorithm (CVSS score, severity, blast radius) ranked the remediation order, mapped to NIST CSF, ISO 27001, and PCI DSS.",
    date: "Jul 2026",
    link: "https://github.com/ronankongala/nessus-vulnerability-pipeline",
  },
  {
    id: "CASE-08",
    title: "Cloud OT Honeypot with SIEM Integration",
    tags: ["GCP", "T-Pot", "Suricata", "Splunk Cloud"],
    desc: "Internet-facing OT honeypot on GCP, with T-Pot, Conpot, and Cowrie emulating Modbus, DNP3, and Telnet/SSH industrial services. It captured 66,185 attacker events in the first hour. Suricata IDS raised 15,315 alerts over the same hour, and Splunk Cloud SIEM ingested the telemetry and mapped attacker behavior to 4 MITRE ATT&CK techniques.",
    date: "Jul 2026",
    link: "https://github.com/ronankongala/ot-honeypot-gcp",
  },
  {
    id: "CASE-07",
    title: "S3 Security Auditor",
    tags: ["Python", "boto3", "AWS S3"],
    desc: "Python (boto3) tool that audits AWS S3 buckets for misconfigurations, running 6 checks per bucket across public ACLs, encryption, versioning, and logging. A scan of 2 buckets turned up 3 medium-severity findings, written to a structured JSON risk report.",
    date: "Jun 2026",
    link: "https://github.com/ronankongala/s3-security-auditor",
  },
  {
    id: "CASE-06",
    title: "Suricata IDS + ELK Stack on AWS EC2",
    tags: ["Suricata", "Elasticsearch", "Kibana", "Filebeat"],
    desc: "Deployed Suricata 7.0.3 on AWS EC2 with 3 custom detection rules monitoring live traffic, piping alerts through Filebeat into an Elasticsearch/Kibana stack built via Docker Compose. Indexed 110+ security events and built a dashboard visualizing event distribution across ICMP, SSH, and HTTP.",
    date: "Jun 2026",
    link: "https://github.com/ronankongala/suricata-ids-elk-lab",
  },
  {
    id: "CASE-05",
    title: "AWS CloudTrail Threat Detection Pipeline",
    tags: ["AWS Lambda", "S3", "SNS", "DynamoDB"],
    desc: "Serverless AWS threat detection on CloudTrail, Lambda (Python 3.12), S3, SNS, and DynamoDB. Eleven detection rules map to MITRE ATT&CK across Defense Evasion, Privilege Escalation, and Credential Access, and IAM alerting ran at a 100% Lambda execution success rate.",
    date: "Jun 2026",
    link: "https://github.com/ronankongala/aws-cloudtrail-threat-detector",
  },
  {
    id: "CASE-04",
    title: "Agentic Cybersecurity Analyst",
    tags: ["Claude", "Microsoft Sentinel", "KQL"],
    desc: "LLM-driven SOC analyst built on Claude. It queries Microsoft Sentinel via KQL across Azure Log Analytics, triages alerts, maps them to MITRE ATT&CK, and drafts incident summaries for human review.",
    date: "Apr 2026",
    link: "https://github.com/ronankongala/agentic-soc-sentinel",
  },
  {
    id: "CASE-03",
    title: "SOC 2 Type I Audit, GRC Portfolio",
    tags: ["SOC 2", "NIST", "Risk Register"],
    desc: "Mock SOC 2 Type I audit of my SOC automation lab against the CC6, CC7, and A1 trust service criteria. It ended in 6 findings with remediation recommendations, backed by a documented risk register and audit evidence trail.",
    date: "Apr 2026",
    link: "https://github.com/ronankongala/SOC2-Audit-Lab",
  },
  {
    id: "CASE-02",
    title: "SOC Security Solution Deployment",
    tags: ["Splunk", "SIEM", "Automation"],
    desc: "Windows event logs flow into Splunk, n8n hands each alert to OpenAI GPT-4 for analysis, and the verdict posts to Slack in under 60 seconds. Tested end to end on failed-logon events.",
    date: "Aug 2025 to Oct 2025",
    link: "https://github.com/ronankongala/SOC-Automation-Lab",
  },
  {
    id: "CASE-01",
    title: "Fake Job Posting Detection (IEEE ICAISS 2025)",
    tags: ["Ensemble ML", "SMOTE", "Research"],
    desc: "First-author research using an ensemble of Random Forest, Gradient Boosting, XGBoost, and AdaBoost with SMOTE, reaching 98% accuracy across 9,000+ job postings and a 22% false positive reduction.",
    date: "Jun 2024 to Feb 2025",
    link: "https://github.com/ronankongala/Fake-Job-Posting-Detection",
  },
];

// Derived from the projects array so these never drift when a case is added.
const caseCount = projects.length;
const caseNumber = p => Number(p.id.replace("CASE-", ""));
const maxCase = Math.max(...projects.map(caseNumber));
const caseRange = `open [1-${maxCase}]`;
const projectsTitle = document.getElementById("projectsTitle");
if (projectsTitle) projectsTitle.textContent = `${caseCount} builds, from honeypots to malware forensics`;

const experience = [
  {
    date: "Sep 2026 to Present",
    role: "AI Cybersecurity Intern",
    org: "Abbott &middot; Madison, WI (Hybrid)",
    desc: "Contributing to ExmanIq, an internal vulnerability management platform that tracks 22,000+ vulnerabilities across organizational assets with a predictive Impact x Likelihood risk model enriched with EPSS and NVD threat intelligence. Diagnosed a 27-day silent data-pipeline failure after spotting an anomalous flat trend in the platform's composite risk score. With a teammate, also built CrowdCheck Hive, which pulls CrowdStrike, Microsoft Intune, and ServiceNow CMDB data together to find devices missing endpoint security coverage.",
  },
  {
    date: "Jun 2026 to Sep 2026",
    role: "Cybersecurity Intern",
    org: "Exact Sciences &middot; Madison, WI (Hybrid)",
    desc: "Automated KeyCheck, a credential-risk monitoring pipeline that scans 1,300+ application registrations for expiring credentials before they cause an incident. Co-built Baseline Guardian, an endpoint compliance check that compares CrowdStrike, Microsoft Intune, Tanium, and ServiceNow CMDB records to assess security posture.",
  },
  {
    date: "Jan 2026 to Apr 2026",
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
    date: "Aug 2024 to Oct 2024",
    role: "Cybersecurity Intern",
    org: "NIELIT Virtual Academy, Ministry of Electronics and IT",
    desc: "Assessed network security across 3 live environments with Nmap and Docker, and used Random Forest models to detect anomalies in security data.",
  },
  {
    date: "Feb 2024 to Apr 2024",
    role: "Web Development Trainee",
    org: "Quizaro ExtendedEdge &middot; Remote",
    desc: "Completed an ISO 9001:2015 certified specialization in frontend architecture and web technologies.",
  },
  {
    date: "Oct 2023 to Nov 2023",
    role: "Data Science Analyst Intern",
    org: "Rejolt Edtech Pvt Ltd &middot; Hyderabad, India",
    desc: "Automated data extraction pipelines for client reporting with Python (NumPy, Pandas, scikit-learn).",
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
    group: "Identity & Access",
    items: [
      { name: "Keycloak (OIDC / SAML)", level: 78 },
      { name: "Open Policy Agent / Rego", level: 76 },
      { name: "HashiCorp Vault", level: 74 },
      { name: "mTLS / PKI", level: 76 },
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
  about: () => "MS Cybersecurity @ Northeastern (GPA 3.86). AI Cybersecurity Intern @ Abbott. Focused on detection engineering, malware analysis, cloud security, and GRC.",
  whoami: () => "ronan-kongala &middot; cybersecurity engineer &middot; open to Summer and Fall 2027 roles",
  projects: () => `${caseCount} cases logged. Type <span class="thl">${caseRange}</span> for a case, or scroll to Project Log.`,
  experience: () => "Abbott (AI Cybersecurity Intern), Exact Sciences, Northeastern TA (CY5001), NIELIT Virtual Academy, IEEE ICAISS 2025 first author. The Experience section has the timeline.",
  stack: () => "PEStudio, CAPA, Ghidra, YARA, Volatility 3, Zeek, RITA, Splunk, Sentinel/KQL, Suricata, ELK, AWS, GCP, Docker, Kali, Python. The Stack section has the breakdown.",
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
    const match = projects.find(p => caseNumber(p) === Number(openMatch[1]));
    if (match) {
      openModal(match);
      tprint(body, `Opening ${match.id}: ${match.title}...`);
    } else {
      tprint(body, `No case with that number. Try a number from open 1 to open ${maxCase}.`, "terr");
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
      runCommand(`open ${maxCase}`, body);
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

  const IMPULSE_DAMP = 0.92;
  const SPEED_MIN = 0.15;
  const SPEED_MAX = 0.35;

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

  const pointer = { x: 0, y: 0, active: false };
  const ripples = [];

  function projectPointer(e) {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    const inBounds =
      pointer.x > -60 && pointer.x < w + 60 &&
      pointer.y > -60 && pointer.y < h + 60;
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

  function strandClear(ax, ay, bx, by) {
    return !inZone((ax + bx) / 2, (ay + by) / 2)
      && !inZone(ax + (bx - ax) * 0.25, ay + (by - ay) * 0.25)
      && !inZone(ax + (bx - ax) * 0.75, ay + (by - ay) * 0.75);
  }

  function step() {
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

  let rafId = 0;
  let onScreen = true;
  let tick = 0;

  function frame() {
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

function scrambleIn(el, speed = 1.6) {
  const text = el.dataset.text || el.textContent;
  el.dataset.text = text;
  el.setAttribute("aria-label", text);

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
