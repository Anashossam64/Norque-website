# NORQUE STUDIOS™ — Version Log

## Version 0.2.2 (Day 3 Complete)
**Date:** October 21, 2026 (End of Day 3 Sprint)  
**Status:** Design Aligned, Universal Typography Stagger, Production Verified

### Overview
Version `0.2.2` finalizes Day 3 with complete design alignment against Figma and reference clips, universal 12px margins across all pages, word-level nav hover stagger, in-place opacity crossfade page transitions with synchronous navbar fading, and universal masked word stagger reveals across all manifesto and philosophy statements.

### Key Deliverables in 0.2.2
- **Universal Horizontal Margins**:
  - Enforced strict `12px` = `0.8333vw` (`px-[0.8333vw]`) margin across all views and sections.
  - Eliminated `max-w-[1416px] mx-auto` restrictions on About page sub-sections so layouts sit edge-to-edge flush with universal margins.
- **Word-Level Staggered Nav Buttons**:
  - Re-engineered nav link hover animation to roll by word with masked duplicate replacement from below matching `references/Hover Stagger reference.mp4` (`0.38s` duration, `[0, 0.8, 0.2, 1]` ease).
  - Nav links remain permanently in default state with no sticky active selection.
- **Scale-Free Opacity Page Transitions**:
  - Transition operates purely via opacity (`1 -> 0` exit, `0 -> 1` enter, `0.35s` duration).
  - Removed pre-emptive scroll jump from `handleNavigate`; page fades out in place wherever scrolled.
  - Synchronized navbar opacity: fades out during transition, and fades in when the destination page mounts.
  - Scroll reset to top is deferred to `onExitComplete`, ensuring destination pages always start cleanly from the hero section.
- **Universal Masked Word Stagger (`MaskedWordStagger.jsx`)**:
  - Deployed universal component across 5 statements:
    1. Showcase Brand Statement / Manifesto (`Showcase.jsx`).
    2. Philosophy Section (`Philosophy.jsx`).
    3. Footer Project Inquiry Callout (`Footer.jsx`).
    4. About Hero Manifesto (`AboutHero.jsx`).
    5. Multidisciplinary Network Statement (`AboutTeam.jsx`).
  - Standardized universal values: `0.65s` duration, `[0, 0.8, 0.2, 1]` ease, `0.018s` stagger, `overflow-hidden` mask with descender padding.
- **Documentation Suite Updated**:
  - `docs/HANDOVER.md`, `docs/DAY_3_LOG.md`, `docs/ARCHITECTURE.md`, `VERSION.md`.

---

## Version 0.2.1 (Day 3 Milestone)
**Date:** October 21, 2026 (Day 3 Optimization Sprint)  
**Status:** Lean, Developer-Friendly, Handover-Ready

### Overview
Version `0.2.1` optimized the workspace size, removed over 200 MB of redundant files, structured the code with developer-friendly section landmarks, and introduced the dedicated documentation suite in `docs/` for seamless AI and human developer handovers.

---

## Version 0.2.0 (Day 2 Milestone)
**Date:** October 21, 2026 (End of Day 2)  
**Status:** Stable, Production Build Verified

### Overview
Version `0.2.0` marked the completion of the multi-page architecture, the full About Page implementation based on Figma designs, unified interactive carousels, and perfected audio interaction physics.
