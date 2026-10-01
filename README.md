# ronankongala.github.io

My personal cybersecurity portfolio, built from scratch with vanilla HTML, CSS, and JavaScript and served as static files from GitHub Pages.

**Live site:** [ronankongala.github.io](https://ronankongala.github.io)

## About

I'm an MS Cybersecurity candidate at Northeastern University's Khoury College, currently an AI Cybersecurity Intern at Abbott, following a Cybersecurity Intern co-op at Exact Sciences. This site is a running log of my security engineering work, styled like a field notebook or case log. It covers detection pipelines, cloud honeypots, GRC audits, LLM security, red team emulation, and fraud detection with model fairness, plus a few side projects.

## Features

- A short terminal-style boot log plays on load.
- The hero name types in letter by letter, synced with a short avatar video introduction.
- The background is a signal graph drawn on canvas with no libraries. Nodes drift, link to their nearest neighbours, lean toward the cursor, and stay clear of the headline and photo.
- An interactive terminal takes `help`, `about`, `projects`, `experience`, `stack`, `contact`, `whoami` and `clear`. `open N` opens the modal for CASE-N, so `open 26` shows the red team lab; a number with no case (such as 24) prints an error.
- The project grid holds 25 case studies (CASE-01 through CASE-23, plus CASE-25 and CASE-26). Click a tag to filter, or a card to read the write-up in a modal.
- A scrolling ticker shows stats from my projects (honeypot events captured, IDS alerts, CVSS scores and more).
- Skill meters animate in, sections reveal on scroll, and the layout is responsive, keyboard accessible and respects `prefers-reduced-motion`.

## Tech stack

Plain HTML5, CSS3 (custom properties, Grid, Flexbox), and vanilla JavaScript (ES6+), with no dependencies.

Fonts: Space Grotesk, IBM Plex Sans, IBM Plex Mono via Google Fonts.

## Structure

```
├── index.html          # markup for all sections, meta and link-preview tags
├── styles.css          # all styling and design tokens
├── script.js           # terminal, filters, animations, case data
├── favicon.svg         # RK wordmark
├── social-card-v3.jpg  # 2400x1260 og:image for link previews
├── avatar-poster.jpg   # video poster frame
├── Avatar video.mp4    # hero greeting clip
└── Avatar image.png    # full-size source for the poster, not served to visitors
```

## Running locally

There is no build step or `npm install`. Clone the repo and serve it:

```
git clone https://github.com/ronankongala/ronankongala.github.io.git
cd ronankongala.github.io
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deployment

Hosted on GitHub Pages, served directly from the `main` branch. Any push to `main` redeploys automatically.

## Contact

- Email: kongalaronan@gmail.com
- LinkedIn: linkedin.com/in/ronan-kongala
- GitHub: github.com/ronankongala

Open to Summer and Fall 2027 roles in SOC and detection engineering, malware analysis, cloud security, vulnerability management, GRC, and AI/LLM security.
