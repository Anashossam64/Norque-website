# NORQUE STUDIOS™ — Version Log

## Version 0.2.1 (Day 3 Milestone)
**Date:** October 21, 2026 (Day 3 Optimization Sprint)  
**Status:** Lean, Developer-Friendly, Handover-Ready

### Overview
Version `0.2.1` optimizes the workspace size, removes over 200 MB of redundant files, structures the code with developer-friendly section landmarks, and introduces a dedicated documentation suite in `docs/` for seamless AI and human developer handovers.

### Key Deliverables in 0.2.1
- **Storage & Asset Optimization**:
  - Safely isolated >200MB of loose dump files, test screenshots, and raw Figma unpacked assets into `_cleanup_staging/`.
  - Eliminated duplicate video and gif files in `public/assets/`.
  - Vite production build time dropped from **22.0s to 3.9s** (5.6x faster).
  - Production build bundle size trimmed from **62 MB to 31 MB**.
- **Developer-Friendly Code Structure**:
  - Added clean section banners across all 15 React components.
  - Standardized project layout into `src/`, `public/`, and `docs/`.
- **Documentation Suite (`docs/`)**:
  - `HANDOVER.md`: Master onboarding guide for AI models & incoming engineers.
  - `ARCHITECTURE.md`: Mermaid flowcharts of component tree, routing transitions, audio engine, and carousel geometry.
  - `DAY_1_LOG.md`: Day 1 genesis and Homepage sprint log.
  - `DAY_2_LOG.md`: Day 2 multi-page sprint log (About page, carousels, audio system).
  - `DAY_3_LOG.md`: Day 3 optimization and documentation sprint log.

---

## Version 0.2.0 (Day 2 Milestone)
**Date:** October 21, 2026 (End of Day 2)  
**Status:** Stable, Production Build Verified

### Overview
Version `0.2.0` marked the completion of the multi-page architecture, the full About Page implementation based on Figma designs, unified interactive carousels, and perfected audio interaction physics.

### Key Deliverables in 0.2.0
- **Pages & Navigation**:
  - Home Page (`HomePage.jsx`) with splash screen, video hero, showcase uncrop reveal, selected works, news carousel, and footer.
  - About Page (`AboutPage.jsx`) with manifesto, country directory, founders & team grid, and latest updates carousel.
  - Cinematic 1-second page transitions with Lenis scroll resets.
- **Interactive Infinite Carousels**:
  - Bidirectional loop with 5-track buffer geometry.
  - Pointer click & drag with physics inertia decay.
  - Trackpad horizontal swipe & wheel support.
  - Click vs Drag separation preventing false navigation or SFX during drags.
- **Sound System**:
  - Dual-layer audio with ambient track and click SFX.
  - Optical Liquid Glass refraction shader mute button.
