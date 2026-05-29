# xTab Pro Brand Kit Documentation

## Overview
Comprehensive branding and asset organization for xTab Pro across three deployment targets: Web/PWA, Chrome Extension, and Tauri Desktop.

---

## Directory Structure

### Root Brand Files
- **brands.root.json** - Organization hierarchy (IRI National parent, Luv Media Group sub-brand)
- **lmg.brand.json** - Luv Media Group brand specification
- **site-dark.webmanifest** - PWA dark theme configuration

### `/logos`
SVG logo variations for flexible scaling:
- `lmg-neon.svg` - Neon LM gradient (pink to yellow)
- `lmg-heart-crown.svg` - Heart with crown logo
- `lmg-icons-purple.svg` - Collection of icons (book, people, hearts)
- `lmg-story-community.svg` - Story and community focused icons

### `/icons` (50+ files)
High-quality icon assets in multiple formats and sizes:
- **Favicon Suite**: animated, static, SVG variants
- **LM Core Logos**: v2, v2-micro, v2-animated (SVG)
- **App Icons**: multiple size variants (16px, 36px, 684px, 1024px)
  - `luv-app-icon-*-card*.png` - App store ready icons
  - `luv-core-lm-v2-card*.png` - Core LM logos
- **Avatar Assets**: circle, gradient, square variants
- **Splash Icons**: LMG branded splash screens
- **Mixed Sets**: Combined icon compositions

### `/palettes`
Color palette definitions and specifications (prepared)

### `/banners`
Banner graphics for web, social, and marketing (prepared)

### `/avatars`
User profile avatar templates (prepared)

### `/headers`
Page header and hero image templates (prepared)

### `/social-cards`
Open Graph and social media card templates (prepared)

### `/previews`
Brand preview mockups (prepared)

### `/brand-boards`
Brand mood boards and style inspiration (prepared)

### `/favicon-kit`
Complete favicon generation assets (prepared)

### `/legal`
Legal documents and brand law (prepared)

### `/config`
Brand configuration files (prepared)

### `/audit`
Brand compliance audit reports (prepared)

### `/internal`
Internal documentation and guidelines (prepared)

### `/standardized`
Standardized brand assets by format (prepared)

### `/iri-national` & `/iri-productions`
Parent company and production branding (legacy)

---

## Using Assets in Build

### Web/PWA Build
```javascript
// In vite.config.js or CSS
// Icons from /assets/icons/
// Styles reference /assets/palettes/ for colors
```

### Chrome Extension
```json
// manifest.json
"icons": {
  "16": "assets/icons/luv-app-icon-16-card.png",
  "48": "assets/icons/luv-app-icon-36-card.png",
  "128": "assets/icons/luv-app-icon-1024-card.png"
}
```

### Desktop App (Tauri)
```toml
// src-tauri/tauri.conf.json
"bundle": {
  "icon": [
    "assets/icons/luv-app-icon-16-card.png",
    "assets/icons/luv-app-icon-1024-card.png"
  ]
}
```

---

## Brand Guidelines

### Color Scheme
- **Primary**: Gradient pink (#ff1493) to gold (#ffd700)
- **Secondary**: Purple (#a855f7)
- **Accent**: Light pink (#f8a5c8)
- **Dark**: #111827

### Typography
- Leverage Monaco editor's default font stack
- Headers: Bold sans-serif
- Body: Standard sans-serif

### Logo Usage
- **Web**: SVG (lmg-neon.svg for hero, lm-v2.svg for compact)
- **Extension**: PNG icons (luv-app-icon-*)
- **Desktop**: High-res PNG (1024px variants)

---

## Build Configuration

The build process automatically incorporates brand assets:
1. **Vite** references `/assets/icons/` for favicons
2. **CSS** imports colors from `/assets/palettes/`
3. **Extension build** uses `/assets/icons/` for manifest icons
4. **Tauri build** uses `/assets/icons/` for bundled icons

No manual configuration needed—all paths are resolved relative to project root.

---

## Next Steps
- [ ] Populate `/palettes/` with color exports (JSON/CSS)
- [ ] Create SVG icon aliases for easy component imports
- [ ] Generate responsive banner series
- [ ] Complete legal documentation in `/legal/`
