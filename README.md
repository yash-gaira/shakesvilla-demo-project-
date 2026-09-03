# SHAKESVILLA // HIMALAYAN ARTISANAL ROASTERS & SHAKES LAB

> High-end brutalist, typography-heavy editorial web experience inspired by [dversostudio.io](https://dversostudio.io/?ref=landing.love). Built for an artisanal roastery and craft shakes laboratory based in **Haldwani, Uttarakhand, India** (`29.2183° N, 79.5130° E`).

---

## ⚡ Highlights & Key Features

- **Liquid Coffee 3D Vessel**: Monumental `SHAKESVILLA` headline acting as an interactive 3D glass vessel that fills with dynamic multi-layered liquid coffee and golden crema foam on cursor movement, sloshes with fluid inertia, and completely drains/vanishes as you scroll down.
- **Dedicated 3D Menu Cards**: 4 interactive floating perspective cards (`THICK SHAKES [01]`, `VINTAGE CORNER [02]`, `DRY FRUIT & TEA [03]`, and `MOJITOS & FIZZ [04]`) tilting in real-time 3D space.
- **Standalone 3D Lab Page (`cards.html`)**: Full-screen 3D cards laboratory featuring a real-time gyroscopic angle HUD telemetry display (`ROTATION-X`, `ROTATION-Y`).
- **Complete 22-Item Artisanal Menu**: Interactive category filter bar (`ALL ITEMS`, `THICK SHAKES`, `VINTAGE CORNER`, `DRY FRUIT CLASSICS`, `MOJITOS & MOCKTAILS`, `HOT BEVERAGES`) with expandable rows and slide-out order dossier drawer.
- **Zero Heavy Frameworks**: Pure Vanilla HTML5, CSS3, and JavaScript with Web Audio API sound synthesis and GSAP for smooth scroll animations.
- **Cream & Dark Themes**: Dual-theme switcher with persistent state.

---

## 🚀 Getting Started

To run the project locally:

### Option 1: PowerShell Built-In Server
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Then open [http://localhost:8080/](http://localhost:8080/) in your browser.

### Option 2: Any Static Server
```bash
# Python
python -m http.server 8080

# Or npx
npx serve .
```

---

## 📂 Project Structure

```
├── index.html            # Main landing page
├── cards.html            # Dedicated 3D Menu Cards Lab page
├── style.css             # Brutalist design system & responsive layout
├── main.js               # 3D tilt engine, liquid coffee simulation, menu filters
├── server.ps1            # Lightweight localhost HTTP server
└── README.md             # Project documentation
```

---

© 2026 Shakesvilla. Haldwani, India.
