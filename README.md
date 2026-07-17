# ronankongala.github.io

My personal cybersecurity portfolio, built from scratch with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, just static files served directly from GitHub Pages.

**Live site: [ronankongala.github.io](https://ronankongala.github.io)**

## About

I'm an MS Cybersecurity candidate at Northeastern University's Khoury College, currently on a co-op as a Cybersecurity Intern (AI/ML) at Abbott (Exact Sciences). This site is a running log of the security engineering work I've built, detection pipelines, cloud honeypots, GRC audits, and a few side projects, styled like a field notebook / case log rather than a generic template.

## Features

- **Animated intro sequence** – a short terminal-style boot log plays on load
- **Typewriter hero** – name types in letter by letter, synced with a short avatar video introduction
- **Live signal-graph background** – an animated node network rendered on canvas, no libraries
- **Interactive terminal** – type real commands (`help`, `projects`, `open 1`–`12`, `whoami`, `contact`, `clear`) to navigate the site
- **Filterable project grid** – 12 case studies, click any tag to filter, click a card for the full write-up in a modal
- **Scrolling signal-log ticker** – real stats pulled from my own projects (attacker sessions captured, IDS alerts correlated, CVSS scores, etc.)
- **Animated skill meters, staggered scroll reveals, smooth page transitions**
- Fully responsive, respects `prefers-reduced-motion`, keyboard accessible

## Tech stack

Plain HTML5, CSS3 (custom properties, Grid, Flexbox), and vanilla JavaScript (ES6+). No build tools, no dependencies, no npm install required, clone it and open `index.html`.

Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts.

## Structure

```
├── index.html      # markup for all sections
├── styles.css      # all styling and design tokens
├── script.js       # terminal, filters, animations, project data
└── assets/         # avatar video/poster image
```

## Running locally

No build step needed:

```bash
git clone https://github.com/ronankongala/ronankongala.github.io.git
cd ronankongala.github.io
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deployment

Hosted on **GitHub Pages**, served directly from the `main` branch. Any push to `main` redeploys automatically.

## Contact

- **Email:** [kongalaronan@gmail.com](mailto:kongalaronan@gmail.com)
- **LinkedIn:** [linkedin.com/in/ronan-kongala](https://www.linkedin.com/in/ronan-kongala)
- **GitHub:** [github.com/ronankongala](https://github.com/ronankongala)

Open to Summer 2027 opportunities in SOC/detection engineering, GRC, and vulnerability management.
