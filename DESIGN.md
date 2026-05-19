# Músicos:Bandas — Design System

## Visual Direction: Dark Concert Atmosphere

Live music is an evening, dramatic experience. This platform looks like the stage, not a job board.

## Color Tokens

```css
:root {
  --color-bg:           #0A0A0F;  /* near-black: hero, landing */
  --color-bg-app:       #12121A;  /* dashboard, app sections */
  --color-surface:      #1C1C28;  /* cards, modals, panels */
  --color-border:       #2E2E3E;  /* subtle dividers */
  --color-accent:       #D4A853;  /* warm amber/gold: primary CTA */
  --color-accent-hover: #E8C06A;  /* gold on hover */
  --color-text:         #F2F2F4;  /* near-white body text */
  --color-text-muted:   #8A8A9A;  /* meta, labels, secondary */
  --color-text-on-accent: #0A0A0F;/* dark text on gold buttons */
  --color-success:      #4CAF82;
  --color-error:        #E85B5B;
}
```

## Typography

| Role | Font | Weight | Size (desktop) | Size (mobile) |
|------|------|--------|----------------|---------------|
| Hero heading | DM Sans | 700 | 64px | 40px |
| Section heading | DM Sans | 700 | 40px | 28px |
| Card title | DM Sans | 600 | 18px | 16px |
| Body | Inter | 400 | 16px | 16px |
| Meta / labels | Inter | 400 | 13px | 13px |
| Button | DM Sans | 600 | 15px | 15px |

**Rules:**
- Minimum body text: 16px
- Never use placeholder text as the only label for a form field
- Visited links must have a distinct color from unvisited

## Spacing Scale

4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

## Border Radius

| Component | Radius |
|-----------|--------|
| Cards | 8px |
| Buttons | 6px |
| Inputs | 4px |
| Avatars | 50% (circle) |
| Video thumbnails | 8px |

## Component Rules

### Buttons
- Primary: `--color-accent` background, `--color-text-on-accent` text, 6px radius
- Secondary / Ghost: transparent, `--color-accent` border and text
- Destructive: `--color-error` background
- Minimum touch target: 44×44px
- Never use disabled state as the default — if an action is unavailable, explain why

### Cards (Musician Card in Search)
- Background: `--color-surface`
- Hover: lift shadow `0 8px 32px rgba(212,168,83,0.12)` — warm gold glow, not grey
- Click: entire card is clickable (not just a nested button)
- Required elements: photo, name, genre(s), location, price-from, star rating

### Forms
- Labels: always ABOVE the field, visible even when input has content
- Input background: `rgba(255,255,255,0.08)` on dark bg
- Focus ring: `2px solid --color-accent`
- Error state: `--color-error` border + error message below the field

### "How It Works" Section
- 3 numbered steps in large display type (64px number, `--color-accent`)
- Each step: number + headline + 2-sentence description + single photo
- Layout: alternating left/right (number+text left, photo right; then photo left, text right)
- NO icons in colored circles

## Navigation

Global nav (desktop):
```
[Logo] ──────── [Search bar] ──────── [For Musicians] [Find Musicians] [Sign In]
```

Global nav (mobile): hamburger icon, full-screen overlay menu

## Accessibility

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- Keyboard navigation: all interactive elements reachable via Tab
- Focus indicators: visible at all times (not just on keyboard)
- ARIA landmarks: `<nav>`, `<main>`, `<aside>` for all layouts
- Images: meaningful alt text; decorative images: `alt=""`
- Video demos: captions required (auto-generated acceptable for v1)

## Anti-Patterns (never do these)

1. Purple/violet gradients — we use amber/gold
2. Icon-in-colored-circle × 3 in any "features" or "how it works" section
3. Centered everything — left-align body content
4. Bubbly border-radius (>12px) on cards or buttons
5. Decorative blobs or wavy SVG dividers
6. `system-ui` or `-apple-system` as the primary font
7. Placeholder text as the only label for form inputs
8. Emoji in headings or navigation
