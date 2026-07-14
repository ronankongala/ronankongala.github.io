// ===== Data =====

const tickerLines = [
  { text: "[T-POT] 66,204 attacker sessions captured across Conpot/Cowrie honeypots", sev: "high" },
  { text: "[SURICATA] 15,382 IDS alerts correlated in first 6h of deployment", sev: "high" },
  { text: "[MITRE ATT&CK] 4 techniques mapped: T1046, T1110, T1595, T1071", sev: "ok" },
  { text: "[NESSUS] 27 findings scored via custom CVSS v3.0 engine, 8m scan window", sev: "high" },
  { text: "[S3-AUDITOR] public-read bucket flagged, CVSS 7.5, remediation logged", sev: "high" },
  { text: "[CLOUDTRAIL] 11 detection rules live across Lambda + DynamoDB", sev: "ok" },
  { text: "[ELK] 110+ events indexed, Kibana dashboard verified", sev: "ok" },
  { text: "[GRC] control mapping complete: PCI DSS 4.0, SOX 404, NIST CSF 2.0", sev: "ok" },
];

const projects = [
  {
    id: "CASE-01",
    title: "Cloud OT Honeypot with SIEM Integration",
    tags: ["GCP", "T-Pot", "Suricata", "Splunk Cloud"],
    desc: "Deployed an internet-facing OT honeypot on GCP using T-Pot, Conpot, and Cowrie to emulate Modbus, DNP3, and Telnet/SSH industrial services, capturing 66,000+ real attacker events within the first hour. Suricata IDS and Splunk Cloud SIEM ingested the telemetry, flagging 15,000+ intrusion alerts and mapping attacker behavior to 4 MITRE ATT&CK techniques.",
    date: "Jul 2026",
    link: "https://github.com/ronankongala/ot-honeypot-gcp",
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
    id: "CASE-03",
    title: "AWS CloudTrail Threat Detection Pipeline",
    tags: ["AWS Lambda", "S3", "SNS", "DynamoDB"],
    desc: "Engineered a serverless AWS threat detection pipeline using CloudTrail, Lambda (Python 3.12), S3, SNS, and DynamoDB, implementing 11 detection rules mapped to MITRE ATT&CK across Defense Evasion, Privilege Escalation, and Credential Access. Real-time IAM alerting ran at a 100% Lambda execution success rate.",
    date: "Jun 2026",
    link: "https://github.com/ronankongala/-aws-cloudtrail-threat-detector",
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
    id: "CASE-05",
    title: "S3 Security Auditor",
    tags: ["Python", "boto3", "AWS S3"],
    desc: "Built a Python auditing tool using boto3 to scan AWS S3 buckets for misconfigurations, running 6 checks per bucket across public ACLs, encryption, versioning, and logging. Scanned 2 buckets, identified 3 medium-severity findings, and produced a structured JSON risk report.",
    date: "Jun 2026",
    link: "https://github.com/ronankongala/-s3-security-auditor",
  },
  {
    id: "CASE-06",
    title: "SOC Security Solution Deployment",
    tags: ["Splunk", "SIEM", "Automation"],
    desc: "Deployed a Splunk SIEM lab monitoring 1,000+ daily security events, automating 15 incident response playbooks and cutting mean time to detect from 45 to 12 minutes, a 73% improvement.",
    date: "Aug \u2013 Oct 2025",
    link: "https://github.com/ronanlucky/SOC-Automation-Lab",
  },
  {
    id: "CASE-07",
    title: "SOC 2 Type I Audit, GRC Portfolio",
    tags: ["SOC 2", "NIST", "Risk Register"],
    desc: "Ran a mock SOC 2 Type I audit assessing 14 controls end to end, producing 6 remediation recommendations backed by a documented risk register and audit evidence trail.",
    date: "Apr 2026",
    link: "https://github.com/ronanlucky/SOC2-Audit-Lab",
  },
  {
    id: "CASE-08",
    title: "Agentic Cybersecurity Analyst",
    tags: ["Claude", "Microsoft Sentinel", "KQL"],
    desc: "Built an LLM-driven SOC analyst that queries Microsoft Sentinel via KQL across Azure Log Analytics, triaging alerts and drafting incident summaries for human review.",
    date: "Apr 2026",
    link: "https://github.com/ronanlucky/agentic-soc-sentinel",
  },
  {
    id: "CASE-09",
    title: "Fake Job Posting Detection (IEEE ICAISS 2025)",
    tags: ["Ensemble ML", "SMOTE", "Research"],
    desc: "First-author research using an ensemble of Random Forest, Gradient Boosting, XGBoost, and AdaBoost with SMOTE, reaching 98% accuracy across 9,000+ job postings and a 22% false positive reduction.",
    date: "Jun 2024 \u2013 Feb 2025",
    link: "https://github.com/ronanlucky/Fake-Job-Posting-Detection",
  },
  {
    id: "CASE-10",
    title: "Agentic GRC Analyst",
    tags: ["In progress", "LLM", "Control mapping"],
    desc: "An in-progress assistant for mapping controls across overlapping frameworks, NIST, PCI DSS, and GDPR, and flagging coverage gaps automatically.",
    date: "In progress",
    link: "https://github.com/ronanlucky",
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
    id: "CASE-12",
    title: "Kali SSH MCP",
    tags: ["MCP", "Kali Linux", "SSH", "Open Source"],
    desc: "A bridge between Kali Linux and the Model Context Protocol over SSH, letting an AI assistant interact directly with a Kali environment for security research and pen-testing workflows.",
    date: "2025 \u2013 present",
    link: "https://github.com/ronanlucky/kali-ssh-mcp",
  },
];

const experience = [
  {
    date: "Jun 2026 &ndash; Dec 2026",
    role: "Cybersecurity Intern (AI/ML)",
    org: "Abbott (Exact Sciences) &middot; Madison, WI",
    desc: "Contributing to two internal platforms built with a teammate, Baseline Guardian and CrowdCheck Hive, integrating CrowdStrike, Microsoft Intune, Tanium, and ServiceNow CMDB data for endpoint compliance scoring and device inventory correlation. Collaborating on Baseline Guardian's Python/FastAPI/PostgreSQL/AWS backend and CrowdCheck Hive's correlation logic and dashboard architecture. Regular participant in cybersecurity tabletop exercises stress-testing incident response plans.",
  },
  {
    date: "Jan 2026 &ndash; Apr 2026",
    role: "Teaching Assistant, CY5001",
    org: "Northeastern University, Khoury College",
    desc: "Ran lab sessions and graded 200+ assignments for 61 graduate students in Cybersecurity Threats and Defenses, resolving 150+ Piazza queries within a 24-hour SLA and cutting lab completion time by 30%.",
  },
  {
    date: "Aug 2024 &ndash; Oct 2024",
    role: "Cybersecurity Intern",
    org: "NIELIT Virtual Academy, Ministry of Electronics and IT",
    desc: "Conducted network security assessments across 3 live environments, applying threat modeling with Nmap and Docker, and used Random Forest models to detect anomalies in security data.",
  },
  {
    date: "Feb 2024 &ndash; Apr 2024",
    role: "Web Development Trainee",
    org: "Quizaro ExtendedEdge &middot; Remote",
    desc: "Completed an ISO 9001:2015 certified specialization covering frontend architecture and modern web technologies.",
  },
  {
    date: "Oct 2023 &ndash; Nov 2023",
    role: "Data Science Analyst Intern",
    org: "Rejolt Edtech Pvt Ltd &middot; Hyderabad, India",
    desc: "Built and automated data extraction pipelines with Python (NumPy, Pandas, scikit-learn) to streamline client reporting workflows.",
  },
  {
    date: "2025",
    role: "First author, IEEE ICAISS",
    org: "Fake job posting detection research",
    desc: "Published an ensemble ML approach (Random Forest, Gradient Boosting, XGBoost, AdaBoost with SMOTE) reaching 98% accuracy across 9,000+ postings.",
  },
];

const stack = [
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
      { name: "Wireshark", level: 85 },
      { name: "Shodan / Censys", level: 75 },
      { name: "SpiderFoot", level: 70 },
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
      document.querySelectorAll(".case-card").forEach(card => {
        const tags = card.dataset.tags.split("|");
        const show = tag === "all" || tags.includes(tag);
        card.classList.toggle("hidden-by-filter", !show);
      });
    });
  });
}

function openModal(p) {
  document.getElementById("modalId").textContent = `${p.id} \u00b7 ${p.date}`;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalTags").innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
  document.getElementById("modalLink").href = p.link;
  document.getElementById("modalOverlay").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").hidden = true;
  document.body.style.overflow = "";
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

const greeting = "Hey, I'm Ronan. This log covers 11 security builds, from cloud honeypots to GRC audits. Have a look around.";

function typeSpeech(text, el, speed = 22) {
  el.textContent = "";
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(tick, speed);
    }
  };
  tick();
}

function initGreeter() {
  const speechEl = document.getElementById("speechText");
  const avatarBtn = document.getElementById("avatarBtn");
  const waveHand = document.getElementById("waveHand");
  const contactPill = document.querySelector(".contact-pill");

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  typeSpeech(greeting, speechEl, prefersReduced ? 0 : 22);

  avatarBtn.addEventListener("click", (e) => {
    if (e.target.closest(".contact-pill")) return;
    waveHand.style.animation = "none";
    void waveHand.offsetWidth;
    waveHand.style.animation = "";
    typeSpeech(greeting, speechEl, prefersReduced ? 0 : 22);
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
  help: () => `Commands: <span class="thl">about</span>, <span class="thl">projects</span>, <span class="thl">experience</span>, <span class="thl">stack</span>, <span class="thl">contact</span>, <span class="thl">whoami</span>, <span class="thl">open [1-12]</span>, <span class="thl">clear</span>`,
  about: () => "MS Cybersecurity @ Northeastern (GPA 3.8). Cybersecurity Intern (AI/ML) @ Abbott. Focused on detection engineering, cloud security, and GRC.",
  whoami: () => "ronan-kongala &middot; cybersecurity engineer &middot; open to Spring 2027 roles",
  projects: () => "12 cases logged. Type <span class=\"thl\">open [1-12]</span> for a case, or scroll to Project Log.",
  experience: () => "Abbott (Exact Sciences), Northeastern TA (CY5001), NIELIT Virtual Academy, IEEE ICAISS 2025 first author. See Experience section for the full timeline.",
  stack: () => "Splunk, Sentinel/KQL, Suricata, ELK, AWS, GCP, Docker, Kali, Python. Full breakdown in the Stack section.",
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
      tprint(body, "No case with that number. Try open 1 through open 12.", "terr");
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

// ===== Simulated risk scan =====

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function initScanTool() {
  const input = document.getElementById("scanInput");
  const btn = document.getElementById("scanBtn");
  const resultBox = document.getElementById("scanResult");
  const meterFill = document.getElementById("scanMeterFill");
  const readout = document.getElementById("scanReadout");

  function runScan() {
    const target = (input.value || "unspecified-host").trim();
    const h = hashString(target.toLowerCase());
    const severity = h % 40;
    const blastRadius = (h >> 3) % 30;
    const score = Math.min(100, Math.round(severity * 1.4 + blastRadius * 1.1 + (h % 15)));

    let label, colorVar, sevClass;
    if (score < 34) { label = "LOW"; colorVar = "var(--accent-verified)"; sevClass = "sev-label-low"; }
    else if (score < 67) { label = "MEDIUM"; colorVar = "var(--accent-alert)"; sevClass = "sev-label-med"; }
    else { label = "HIGH"; colorVar = "#E8636B"; sevClass = "sev-label-high"; }

    resultBox.hidden = false;
    meterFill.style.width = "0%";
    meterFill.style.background = colorVar;
    requestAnimationFrame(() => { meterFill.style.width = score + "%"; });

    readout.innerHTML =
      `target      : ${target}\n` +
      `risk_score  : ${score}/100\n` +
      `severity    : <span class="${sevClass}">${label}</span>\n` +
      `weighting   : cvss 40% / severity 40% / blast_radius 20%\n` +
      `note        : simulated locally, no scan was performed`;
  }

  btn.addEventListener("click", runScan);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") runScan(); });
}

// ===== Network graph background (hero) =====

function initNetworkGraph() {
  const canvas = document.getElementById("netCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const zone = document.querySelector(".hero-visual-zone");
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COUNT = window.innerWidth < 700 ? 22 : 40;
  const LINK_DIST = 150;
  const nodes = Array.from({ length: COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    pulse: Math.random() * Math.PI * 2,
    alert: Math.random() < 0.12,
  }));

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      n.pulse += 0.02;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const opacity = (1 - dist / LINK_DIST) * 0.16;
          ctx.strokeStyle = `rgba(91, 141, 239, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const r = n.alert ? 2.4 + Math.sin(n.pulse) * 1.2 : 1.8;
      ctx.beginPath();
      ctx.arc(n.x, n.y, Math.max(r, 0.6), 0, Math.PI * 2);
      ctx.fillStyle = n.alert
        ? `rgba(232, 162, 61, ${0.5 + Math.sin(n.pulse) * 0.3})`
        : "rgba(139, 150, 165, 0.5)";
      ctx.fill();
    }

    if (!prefersReduced) requestAnimationFrame(frame);
  }

  frame();
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
initScanTool();
initNetworkGraph();
