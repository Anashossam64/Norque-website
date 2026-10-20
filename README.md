# NORQUE STUDIOS™ — Official Website

A 1:1 pixel-perfect recreation of the Figma design for **NORQUE STUDIOS™** built with React, Vite, and Tailwind CSS.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will start on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 📐 Design Specifications (1:1 with Figma)

* **Canvas Scale**: 1440px grid system with 12px margins and 4-column layout
* **Theme**: Authentic deep dark aesthetic (`#000000` background with `#121212` / `#262626` / `#363636` structural accents)
* **Logos**: Extracted directly from Figma binary vector network blobs into lossless mathematical SVGs (`MainLogo.jsx` and `CompactLogo.jsx`)
* **Assets**: All high-definition raster assets extracted directly from the Figma package into `src/assets/`
* **Typography**: Matched to *Beausite Classic* / *Inter* with exact `-0.03em` (`-3%`) letter tracking and proportional leading
* **Dynamic Features**: Live Cairo/Egypt GMT clock with real-time seconds ticking in the navigation bar

---

## 🗂 Project Structure

```
src/
├── assets/                  # Extracted native images & graphics
├── components/
│   ├── CompactLogo.jsx      # Top navigation vector logo
│   ├── MainLogo.jsx         # Full-width brand vector logo
│   ├── Navbar.jsx           # Top navigation bar with live Egypt clock
│   ├── Hero.jsx             # Hero section with statement & giant logo
│   ├── Showcase.jsx         # Recent works card & brand manifesto
│   ├── SelectedWorks.jsx    # 4-project portfolio grid with metadata
│   ├── Philosophy.jsx       # 2-column typographic intention statement
│   ├── NewsSection.jsx      # "What's happening now" 4-column editorial grid
│   └── Footer.jsx           # Contact callout, bottom logo & directory
├── App.jsx                  # Main Homepage view
├── index.css                # Base Tailwind & custom typography rules
└── main.jsx                 # React root entry
```
