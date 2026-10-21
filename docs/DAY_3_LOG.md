# Day 3 Development Log — Norque Studios Website

**Date:** October 21, 2026  
**Objective:** Project optimization, repository decluttering, code readability pass, documentation suite, and GitHub repository preparation.

---

## 🎯 Objectives Completed

1. **Size Optimization & Asset Audit**:
   - Conducted an audit of the entire `D:\Norque website` directory tree.
   - Identified and safely staged **over 200 MB** of unneeded files, old test screenshots, loose extraction scripts, duplicate videos, raw Figma blobs, and unused high-resolution originals into `_cleanup_staging/`.
   - Key decluttering highlights:
     - Root test screenshots removed (~10.6 MB).
     - Figma extraction temporary dumps and scripts staged (~54.8 MB).
     - Old openfig extraction hash directories (`images/`, `page2_figma/`) staged (~34.4 MB).
     - Duplicate 13.5MB background video and 2.39MB gif in `public/assets/` eliminated (Vite directly bundles from `src/assets/`).
     - Unreferenced `-orig` photo files in `public/images/about/` staged (~14.8 MB).
     - Old `.playwright-mcp/` test cache staged (~10.9 MB).
     - Build artifacts (`dist/`) cleaned and freshly rebuilt.
   - Reduced production build time from **22.0 seconds** down to **3.9 seconds** (a 5.6x speedup).
   - Reduced production bundle size in `dist/` from **62 MB** to **31 MB**.

2. **Clean & Developer-Friendly Directory Layout**:
   - Arranged all project files into clean standard directories (`src/`, `public/`, `docs/`).
   - Root directory now only contains core configuration files (`package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `.gitignore`, `README.md`, `VERSION.md`).

3. **Code Quality & Section Landmarks**:
   - Cleaned all core React components (`App.jsx`, `HomePage.jsx`, `AboutPage.jsx`, `Navbar.jsx`, `Hero.jsx`, `Showcase.jsx`, `SelectedWorks.jsx`, `Philosophy.jsx`, `NewsSection.jsx`, `Footer.jsx`, `InteractiveInfiniteCarousel.jsx`, `MuteButton.jsx`, `SplashScreen.jsx`, `AboutHero.jsx`, `AboutTeam.jsx`, `AboutNews.jsx`).
   - Replaced noisy per-line comments with clear, structured section banners and component headers so any incoming developer or AI can immediately identify layout sections and logic blocks.

4. **Handover Documentation & UI Refinements**:
   - Reverted original 3-paragraph studio manifesto and caption row under the pinned Showcase reveal.
   - Refined Showcase uncropped reveal geometry to align pixel-perfect with universal `1.6667vw` margins upon 100% expansion.
   - Enhanced Mute Button with a darker satin frosted glass optical shader while preserving real-time liquid glass refraction and rim specular reflections.
   - Maintained full suite in `docs/` (`HANDOVER.md`, `ARCHITECTURE.md`, `DAY_1_LOG.md`, `DAY_2_LOG.md`, `DAY_3_LOG.md`).

5. **GitHub Repository & GitHub Pages Deployment**:
   - Configured Vite `base: './'` and dynamic asset interpolation (`import.meta.env.BASE_URL`) so assets load without 404s on subpaths (`username.github.io/repo/`) or custom domains.
   - Created official automated deployment workflow `.github/workflows/deploy.yml` using GitHub Actions.
   - Identified and documented the custom domain formatting fix (`norque` is not a valid FQDN; clear the custom domain field in GitHub Pages settings unless using a verified top-level domain).
   - Repository successfully linked to `https://github.com/Anashossam64/Norque-website.git`.
