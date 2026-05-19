# Músicos:Bandas — Design TODOs

These items must be resolved before the linked screens can be built. Each has a clear blocker and rationale.

---

## HIGH PRIORITY — blocks specific screens

### TODO-1: Resolve subscription pricing (Pro and Studio amounts)
**Status: PARTIALLY RESOLVED** — Platform fee set at **8%**. Pro/Studio monthly prices still TBD.
**What remains:** Decide the monthly price for Pro and Studio tiers.
**Why:** The pricing page and musician onboarding step 5 (plan selection) cannot be designed or built until these numbers exist.
**Context:** Platform targets global markets. $19/mo (original plan) may be too high for Latin America, SE Asia, Eastern Europe. Suggested starting point: Free / Pro $12/mo / Studio $29/mo.
**Depends on:** Business / pricing strategy decision.

---

### TODO-2: Define video upload limits per subscription tier
**What:** Specify how many demo videos each plan allows (Free / Pro / Studio).
**Why:** This determines the gating logic on the video upload screen and the "upgrade" prompt that appears when a free user hits the limit.
**Pros of resolving:** Lets devs build upload limits and upgrade nudge in one pass.
**Cons of deferring:** Upload screen ships without limits; adding them later breaks existing musician expectations.
**Context:** Suggested: Free = 3 videos, Pro = unlimited, Studio = unlimited + higher resolution/length.
**Depends on:** TODO-1 (pricing/tier definition).

---

### ~~TODO-3: Define calendar/availability scope for v1~~ ✅ RESOLVED
**Decision:** Date picker (structured date + time input) on booking request form. No musician-side availability calendar in Phase 1. Musician accepts or declines after seeing the requested date. Full calendar widget deferred to Phase 2.

---

### TODO-4: Design multi-member band profile model
**What:** Decide whether a band (e.g., "The Jazz Trio") gets one shared account or whether each member has their own profile linked to a band.
**Why:** The profile creation flow for a band is different from a solo musician. If bands share one account, who manages it? If members are linked, how does the public profile show them?
**Pros of shared account:** Simpler to build; one payout destination.
**Cons:** No individual musician reputation; band breakup = profile problem.
**Suggested model:** One band account (owner) with optional "member profiles" linked for display purposes only. Payouts go to the band account owner.
**Depends on:** Nothing — can be decided now.

---

### TODO-5: Confirm i18n launch languages
**What:** Decide which languages the platform launches with, and whether UI or only content is translated.
**Why:** String externalization must be built from day one or translation becomes an expensive backfill. The routing strategy (locale in URL vs. subdomain) affects SEO.
**Pros of resolving early:** i18n infrastructure built once, correctly. Spanish + English covers the largest initial addressable market.
**Cons of deferring:** Hardcoded English strings require a full audit to extract.
**Suggested launch languages:** English + Spanish (covers Latin America and Spain — highest density of potential musician supply). Portuguese (Brazil) as fast follow.
**Depends on:** Engineering decision on URL strategy (e.g., `musicos.com/es/` vs. `es.musicos.com`).

---

## MEDIUM PRIORITY — design debt, not blocking v1

### TODO-6: Verification badge design and criteria
**What:** What does it take to get a "Verified" badge on a musician profile? Government ID? Phone verification? Video submission review? Manual review?
**Why:** The badge is a trust signal for clients. A badge with no clear criteria is meaningless — worse, it trains users to ignore it.
**Suggested criteria for v1:** Email verified + phone verified + at least 1 completed booking with a 4+ star review.
**Depends on:** TODO-1 (Pro/Studio tiers — verification might be a Studio-only feature).

### ~~TODO-7: Escrow / payment release UX~~ ✅ RESOLVED
**Decision:** Payment model changed to pass-through (no escrow). Client pays → platform immediately transfers to musician → charges musician commission. No release window needed. Dispute handling is about service quality, not fund release.

### TODO-8: RTL language support
**What:** If the platform expands to Arabic or Hebrew markets, the entire layout needs to flip (RTL). Designing for RTL from the start is significantly cheaper than retrofitting.
**Why:** Latin America + Spain is the target, so RTL is not v1. But the CSS architecture choice now (flexbox direction, padding/margin conventions) determines how hard RTL is later.
**Suggested:** Build with logical CSS properties (`margin-inline-start` vs `margin-left`) from day one.
**Depends on:** Engineering decision at component-library setup.
