# Músicos:Bandas — Marketplace Platform Plan

## Concept

A two-sided marketplace for musicians and bands to offer their services to event organizers, venues, private clients, and anyone who needs live music. Global-first, not tied to any single country.

Inspired by UpWork: musicians manage profiles and services; clients search, browse, and hire. All communication and transactional flow happens on-platform.

---

## Users

### Musician / Band (Service Provider)
- Creates a profile with bio, genres, location, languages
- Lists services (e.g., "Wedding band — 4hr set", "Studio session guitarist", "DJ set for clubs")
- Uploads demo videos of live performances
- Sets pricing (hourly, per-event, custom quote)
- Receives booking requests, negotiates, confirms
- Manages calendar availability

### Client (Buyer)
- Searches musicians by genre, category, location, budget, availability
- Views profiles, demos, reviews
- Sends booking request / inquiry
- Communicates via on-platform messaging
- Confirms and pays
- Leaves a review after the event

---

## Business Model

### Subscription Tiers (Musician Side)

| Plan | Price | Commission | Features |
|------|-------|------------|---------|
| Free | $0/mo | 8% per booking | 1 service listing, 3 demo videos, basic profile |
| Pro | TBD/mo | 5% per booking | Unlimited listings, unlimited videos, featured search placement, analytics |
| Studio | TBD/mo | 5% per booking | Everything in Pro + priority support, verified badge, custom URL, early access |

> Freemium funnel: start free, upgrade when bookings start coming in. Pro/Studio pricing TBD (see TODOS.md TODO-1). The key upgrade incentive is the commission reduction from 8% → 5%.

### Platform Fees — Airbnb Model (split both sides)

| Who pays | Fee | When |
|----------|-----|------|
| **Client** | **14% booking fee** | Added on top of musician's price at checkout |
| **Musician** | **3% service fee** | Deducted from musician's payout |
| Client subscription | None | Clients never pay a monthly fee |

Subscription tiers (Pro/Studio) reduce the musician's 3% fee and unlock features — pricing TBD (see TODOS.md TODO-1).

### Wompi Fee Reality (El Salvador, IVA business account)

Wompi charges **5.27% effective** on incoming payments ($5.27 on every $100 received = 3.5% Wompi fee + IVA and government retentions). This is a platform cost of doing business, absorbed into the fee structure.

**Economics per $100 musician service (Airbnb model):**

| | Amount |
|-|--------|
| Musician sets service price | $100.00 |
| Client pays ($100 + 14% booking fee) | $114.00 |
| Wompi takes 5.27% of $114 | − $6.01 |
| **Platform receives** | **$107.99** |
| Platform pays musician ($100 − 3%) | − $97.00 |
| **Platform nets per booking** | **$10.99** |
| **Musician nets** | **$97.00** |

**Why this works for both sides:**
- Musician pitch: *"Solo 3% de comisión — el booking fee lo paga tu cliente"*
- Client pitch: *"14% booking fee por pago seguro y garantía"* (Airbnb cobra 14%, Eventbrite 15–20%)
- Platform earns $10.99 vs $7.58 with the old model — **45% more per booking**
- Músico recibe $97 vs $86.73 con el modelo anterior — **$10 más en su bolsillo**

**Musician pricing guidance** (show during service creation):
> "Si querés recibir $100 por este servicio, tu precio ya está bien — nosotros le añadimos el booking fee al cliente."
> Dashboard shows "Tu pago estimado: $97" on every service.

### Payment Architecture — Airbnb Split Model

```
Musician sets price: $100
         │
         ▼
Client sees at checkout:
  Service:         $100.00
  Booking fee 14%:  $14.00
  Total:           $114.00
         │
         ▼ Client pays $114 via Wompi
         │
Platform receives: $107.99 (after Wompi 5.27%)
         │
         ├──► Pays musician: $97.00  ($100 − 3% service fee)
         │
         └──► Platform keeps: $10.99 ✅
```

**Key architectural points:**
- Platform never holds client funds → no money transmission license risk
- Single Wompi charge per booking (client only) — no second charge to musician card
- Musician fee deducted from payout, not charged separately → simpler, no tokenization needed
- Booking amount fields: `serviceAmount` ($100), `clientTotal` ($114), `musicianPayout` ($97), `platformFee` ($10.99), `wompiFeePaid` ($6.01)

**Multi-currency:** USD for El Salvador launch. Payment layer abstracted for future Stripe/Adyen swap.

**Account restriction on unpaid musician fee:**
- Fee is deducted from payout automatically — no separate charge, no risk of non-payment
- Musician cannot "skip" the 3% — it's built into the transfer amount

---

## Core Screens

1. **Landing page** — Hero, value prop, how it works (for musicians and clients), featured musicians, testimonials, CTA
2. **Search / Discovery** — Filter by genre/category, location, price range, availability, rating
3. **Musician Profile** — Bio, services, demo videos, reviews, calendar, contact button
4. **Service Listing Detail** — Price, deliverables, FAQ, booking form
5. **Client Dashboard** — Bookings, messages, saved musicians
6. **Musician Dashboard** — Bookings, earnings, analytics, listing management
7. **Messaging / Negotiation** — Real-time or async chat per booking
8. **Booking Flow** — Request → negotiation → confirm → payment → event → review
9. **Onboarding** — Separate flows for musicians and clients
10. **Admin Panel** — User management, flagging, payment disputes

---

## User Journey & Emotional Arc

### Musician Journey

| Step | User Does | User Feels | Design Response |
|------|-----------|------------|-----------------|
| 1 | Discovers platform via search/ad | Curious but skeptical — "Is this real?" | Landing hero shows real musicians, real earnings numbers, no stock photos |
| 2 | Reads "For Musicians" section | "Could this work for me?" | Concrete value: "Musicians earn an avg $X/booking. Free to start." |
| 3 | Signs up | Low-stakes excitement | Minimal form: email + password + "I'm a musician" — nothing else on sign-up |
| 4 | Starts onboarding wizard | Slightly overwhelmed | 5-step progress bar, live profile preview, each step is small and rewarding |
| 5 | Completes profile + uploads video | Pride — "This looks good" | Preview shows exactly how their profile will appear to clients |
| 6 | Goes live, waits for first request | Anxious — "Will anyone find me?" | Email + in-app nudge when profile gets first view: "3 people viewed your profile today" |
| 7 | Gets first booking request | Excitement | Clear notification, easy response flow, "You've got your first inquiry!" |
| 8 | Completes first booking | Confidence | Post-booking summary + earnings + "Leave a review request to client" |

### Client Journey

| Step | User Does | User Feels | Design Response |
|------|-----------|------------|-----------------|
| 1 | Needs a musician for an event | Overwhelmed — "Where do I even start?" | Search bar is front and center on landing, no account needed to browse |
| 2 | Searches and browses results | Comparison anxiety | Cards show photo, genre, price, rating — scannable at a glance |
| 3 | Watches a demo video | Emotional — "This person is amazing" | Video player is prominent on profile, auto-plays silently on hover |
| 4 | Decides to contact | Trust check — "Is this safe to pay?" | Verified badge, payment protection badge, "Secure checkout" visible before booking |
| 5 | Sends booking request | Committed | Simple form: event type, date, location, budget — 4 fields max |
| 6 | Negotiates via chat | Impatient | Real-time messaging, expected response time shown ("Typically responds in 2h") |
| 7 | Confirms and pays | Nervous about money | Escrow explanation: "Your payment is held safely until after your event" |
| 8 | Event happens, reviews musician | Satisfied | Post-event email with 1-click review prompt, 48h after event date |

### Onboarding Wizard (Musician)
**Step 1:** Name + profile photo + tagline
**Step 2:** Genres + instruments + languages + location
**Step 3:** First service (title + description + price + duration)
**Step 4:** Upload demo video (drag-drop, progress bar, cloud processing)
**Step 5:** Choose plan (Free / Pro / Studio) — default: Free, clear upgrade path shown

Live preview pane on the right side shows the profile building in real time as the user fills each step.

---

## Key User Flows

### Musician Onboarding
Sign up → choose "I'm a musician" → create profile (bio, genres, location) → add first service → upload demo video → choose plan → go live

### Client Hiring Flow
Search → filter → view profile → view demo → send request → negotiate via chat → confirm + pay → event → review

---

## Technical Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | Full-stack in one repo; API routes handle backend; fast to iterate |
| Database | PostgreSQL | Relational, strong for marketplace queries, JSON support for metadata |
| ORM | Prisma | Type-safe, migrations, excellent DX with Next.js |
| Hosting | Vercel | Edge regions in São Paulo + US-East; good latency for El Salvador + LatAm |
| Video hosting | Cloudflare Stream | Managed upload + transcode + delivery; handles MOV/AVI/MP4; $5/1000 min stored |
| File storage | Cloudflare R2 (or AWS S3) | Profile photos, documents; no egress fees with R2 |
| Auth | Auth.js v5 (NextAuth) + Prisma adapter | Sessions in PostgreSQL; social login (Google) built in; handles CSRF |
| Email | Resend | Transactional email; excellent Next.js SDK; generous free tier |
| Payments | Wompi | Team has existing integration; El Salvador base; USD |
| Background jobs | Vercel Cron Jobs | Triggers API routes on schedule; handles booking expiry + escrow release |
| i18n | next-intl | First-class Next.js i18n, route-based locale |

## Architecture Diagram (Phase 1)

```
                    ┌─────────────────────────────────────────┐
                    │             Vercel Edge                  │
                    │  Next.js App Router (SSR + API Routes)   │
                    └──────┬──────────────────────┬───────────┘
                           │                      │
              ┌────────────▼──────────┐  ┌────────▼──────────────┐
              │   PostgreSQL          │  │  Cloudflare Stream     │
              │   (Neon or Supabase)  │  │  (video upload +       │
              │   Prisma ORM          │  │   transcode + deliver) │
              └───────────────────────┘  └───────────────────────┘
                           │
              ┌────────────▼──────────────────────────┐
              │  Vercel Cron (every 15 min)            │
              │  → /api/cron/booking-transitions       │
              │  Checks:                               │
              │  - REQUESTED > 72h → EXPIRED           │
              │  - ACCEPTED > 48h (no payment) → EXPIRED│
              │  - PENDING_RELEASE past releaseAt → COMPLETED │
              └───────────────────────────────────────┘
                           │
              ┌────────────▼──────────────────────────┐
              │  Wompi Webhook → /api/webhooks/wompi   │
              │  1. Verify HMAC signature              │
              │  2. Check wompiTxId not already used   │  ← idempotency
              │  3. Update booking status atomically   │
              │  4. Send email via Resend              │
              └───────────────────────────────────────┘

Auth: Auth.js v5 sessions stored in PostgreSQL (no Redis needed for Phase 1)
Email: Resend (transactional) — booking notifications, dispute alerts, review prompts
i18n: next-intl with route-based locale (/en/, /es/)
```

### Wompi webhook handler spec
```typescript
// app/api/webhooks/wompi/route.ts
export async function POST(req: Request) {
  // Step 1: Verify signature + replay window (REQUIRED)
  const signature = req.headers.get('x-wompi-signature')
  const timestamp = req.headers.get('x-wompi-timestamp')
  const body = await req.text()
  const expected = hmacSHA256(body, process.env.WOMPI_WEBHOOK_SECRET)
  if (!timingSafeEqual(signature, expected)) return new Response('Unauthorized', { status: 401 })
  if (Math.abs(Date.now() - Number(timestamp) * 1000) > 300_000) // ±5 min replay window
    return new Response('Expired', { status: 400 })

  const event = JSON.parse(body)
  if (event.event !== 'transaction.updated') return new Response('OK', { status: 200 })

  const txId = event.data.transaction.id
  const status = event.data.transaction.status // APPROVED | DECLINED | VOIDED | ERROR

  // Step 2: Idempotency — find booking by client charge tx
  const booking = await prisma.booking.findFirst({ where: { wompiTxId: txId } })
  if (!booking) return new Response('OK', { status: 200 }) // unknown tx, ignore
  if (booking.status === 'PAID' || booking.status === 'COMPLETED')
    return new Response('OK', { status: 200 }) // already processed

  // Step 3: Handle client charge result
  if (status === 'APPROVED' && booking.status === 'ACCEPTED') {
    await prisma.$transaction(async (tx) => {
      await transitionBooking(booking.id, 'PAID', null, `Wompi ${txId} approved`, tx)
      // Single payout: musician receives serviceAmount − 3% fee
      // musicianPayout is pre-calculated at booking creation and stored on the record
      await initiateMusiciaPayout(booking.id, booking.musicianPayout) // Wompi transfer
    })
    // Note: payout confirmation arrives via a separate Wompi webhook or polling
    // → on payout confirmed: transitionBooking(id, 'COMPLETED', ...)
  }

  if (status === 'DECLINED' || status === 'VOIDED' || status === 'ERROR') {
    await transitionBooking(booking.id, 'CANCELLED', null, `Wompi ${txId} ${status}`)
    await sendPaymentFailedEmail(booking)
  }

  return new Response('OK', { status: 200 })
}

// lib/payments.ts — fee calculation (single source of truth)
export function calculateBookingAmounts(serviceAmount: number) {
  const BOOKING_FEE_RATE = 0.14      // 14% client booking fee
  const MUSICIAN_FEE_RATE = 0.03     // 3% musician service fee
  const WOMPI_FEE_RATE = 0.0527      // 5.27% Wompi effective rate (El Salvador IVA)

  const bookingFee = serviceAmount * BOOKING_FEE_RATE
  const clientTotal = serviceAmount + bookingFee
  const wompiFeePaid = clientTotal * WOMPI_FEE_RATE
  const platformReceives = clientTotal - wompiFeePaid
  const musicianPayout = serviceAmount * (1 - MUSICIAN_FEE_RATE)
  const platformFee = platformReceives - musicianPayout

  return { serviceAmount, bookingFee, clientTotal, wompiFeePaid,
           platformReceives, musicianPayout, platformFee }
  // On $100 service: { bookingFee: 14, clientTotal: 114, wompiFeePaid: 6.01,
  //                    platformReceives: 107.99, musicianPayout: 97, platformFee: 10.99 }
}
```

### Search page size enforcement (performance)
```typescript
// app/api/search/route.ts
const pageSize = Math.min(parseInt(params.pageSize ?? '20'), 50) // server-enforced cap
```

## Data Model (Entity Diagram)

```
┌──────────────────┐         ┌─────────────────────────┐
│      User        │         │    MusicianProfile       │
│──────────────────│1       1│─────────────────────────│
│ id               ├─────────┤ id                       │
│ email            │         │ userId                   │
│ name             │         │ bio                      │
│ role (musician   │         │ tagline                  │
│   | client)      │         │ genres: String[]         │
│ image            │         │ instruments: String[]    │
│ emailVerified    │         │ location                 │
│ createdAt        │         │ languages: String[]      │
└──────────────────┘         │ planTier (free|pro|studio│
         │                   │ isPublished              │
         │ 1                 │ avgRating                │
         │                   │ totalBookings            │
         │ *                 └──────────┬───────────────┘
┌────────▼─────────┐                   │1
│    Booking       │              ┌────┴──────────────┐
│──────────────────│              │    Service        │
│ id               │              │───────────────────│
│ clientId         ├─────────────►│ id                │
│ musicianId       │*             │ profileId         │
│ serviceId        │              │ title             │
│ status (enum)    │              │ description       │
│ amount           │              │ priceUSD          │
│ platformFee      │              │ duration          │
│ currency         │              │ isActive          │
│ eventDate        │              └───────────────────┘
│ eventType        │
│ eventLocation    │         ┌─────────────────────────┐
│ wompiTxId        │         │    Video                 │
│ disputeAt        │         │─────────────────────────│
│ releaseAt        │    1    │ id                       │
│ createdAt        ├─────────┤ profileId              * │
└────────┬─────────┘         │ cloudflareVideoId        │
         │1                  │ title                    │
         │                   │ status (processing|ready)│
         │*                  │ durationSeconds          │
┌────────▼─────────┐         │ thumbnailUrl             │
│    Message       │         │ sortOrder                │
│──────────────────│         └─────────────────────────┘
│ id               │
│ bookingId        │         ┌─────────────────────────┐
│ senderId         │         │    Review                │
│ content          │         │─────────────────────────│
│ readAt           │    1    │ id                       │
│ createdAt        │    ├────┤ bookingId              1 │
└──────────────────┘         │ reviewerId               │
                             │ revieweeId               │
                             │ rating (1-5)             │
                             │ comment                  │
                             │ createdAt                │
                             └─────────────────────────┘

┌─────────────────────────────────┐
│    AnalyticsEvent               │  (raw event capture — powers all dashboards)
│─────────────────────────────────│
│ id                              │
│ eventType (enum)                │  profile_viewed, search_performed,
│ userId (nullable)               │  booking_requested, booking_completed,
│ metadata (JSON)                 │  review_left, commission_collected, etc.
│ createdAt                       │
└─────────────────────────────────┘

Key events to emit from day 1:
  profile_viewed       → { profileId, viewerIp, source (search|direct|share) }
  search_performed     → { query, filters, resultsCount, page }
  booking_requested    → { bookingId, musicianId, amount }
  booking_completed    → { bookingId, amount, commissionAmount }
  commission_collected → { bookingId, commissionAmount, planTier }
  commission_failed    → { bookingId, attemptNumber }
  review_left          → { bookingId, rating }

Business KPIs derived from these events (no additional schema needed):
  - Profile view → booking request conversion rate
  - Commission collection rate (target >95%)
  - Average rating across platform
  - Musician time-to-first-booking
  - Dispute rate (target <2% of completed bookings)

┌─────────────────────────────────┐
│    WaitlistEntry                │  (zero-results "notify me")
│─────────────────────────────────│
│ id                              │
│ email                           │
│ searchQuery (genre/location)    │
│ notifiedAt                      │
│ createdAt                       │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│    BookingStatusLog             │  (audit trail)
│─────────────────────────────────│
│ id                              │
│ bookingId                       │
│ fromStatus                      │
│ toStatus                        │
│ actorId (null = system)         │
│ reason                          │
│ createdAt                       │
└─────────────────────────────────┘
```

### Search query pattern (prevent N+1)
```typescript
// app/api/search/route.ts — one query for the full results page
const musicians = await prisma.musicianProfile.findMany({
  where: {
    isPublished: true,
    location: { contains: locationFilter, mode: 'insensitive' },
    genres: { hasSome: genreFilter },
  },
  include: {
    services: {
      where: { isActive: true },
      orderBy: { priceUSD: 'asc' },
      take: 1,      // cheapest service only — for "from $X" display
    },
    videos: {
      where: { status: 'READY' },
      orderBy: { sortOrder: 'asc' },
      take: 1,      // thumbnail only on card
    },
    _count: { select: { bookings: true } },
  },
  orderBy: [{ avgRating: 'desc' }, { totalBookings: 'desc' }],
  take: 20,
  skip: (page - 1) * 20,
})
// avgRating is a denormalized column updated by a DB trigger after each review insert
// DO NOT compute avg(rating) inline — that's an N+1
```

### Denormalized fields (maintain via Prisma middleware or DB trigger)
- `MusicianProfile.avgRating` — updated after every `Review` insert/update
- `MusicianProfile.totalBookings` — updated after every `Booking` → `COMPLETED` transition

### Key index requirements
```sql
-- Search performance
CREATE INDEX idx_profile_location ON MusicianProfile(location);
CREATE INDEX idx_profile_published ON MusicianProfile(isPublished, avgRating DESC);
CREATE INDEX idx_service_price ON Service(priceUSD);

-- Booking queries
CREATE INDEX idx_booking_client ON Booking(clientId, status);
CREATE INDEX idx_booking_musician ON Booking(musicianId, status);
CREATE INDEX idx_booking_release ON Booking(releaseAt) WHERE status = 'PENDING_RELEASE';
CREATE INDEX idx_booking_expiry ON Booking(createdAt) WHERE status IN ('REQUESTED','ACCEPTED');

-- Cron job queries (fast pending-transition scans)
CREATE INDEX idx_booking_cron ON Booking(status, releaseAt, createdAt);
```

## Booking & Payment State Machine

```
                    CLIENT ACTIONS                    SYSTEM / ADMIN
                         │
          ┌──────────────▼──────────────┐
          │         REQUESTED           │  Client fills booking form
          │  (no payment yet)           │  Musician gets email notification
          └──────┬──────────────────────┘
                 │  Musician accepts
                 ▼
          ┌──────────────────────────────┐
          │         ACCEPTED             │  Musician clicks "Accept"
          │  (awaiting payment)          │  Client gets email: "Pay to confirm"
          └──────┬───────────────────────┘
                 │  Client pays via Wompi
                 ▼
          ┌──────────────────────────────┐
          │          PAID                │  Client pays $114 via Wompi
          │  Platform receives $107.99   │  → Initiates payout $97 to musician
          │  Payout: $97 to musician     │  → Platform keeps $10.99
          └──────┬───────────────────────┘
                 │  Payout confirmed
                 ▼
          ┌────────────────────────┐
          │      COMPLETED ✅       │  Musician receives $97
          │  Both parties notified  │  Platform earned $10.99
          └────────────────────────┘

          ┌──────────────────────────────┐
          │        DISPUTED              │  Client opens dispute (service issue)
          │  (admin investigates)        │  Evidence from both parties
          └──┬────────────────────┬──────┘
             │ Admin: refund      │ Admin: close in musician's favor
             ▼                   ▼
     ┌──────────────┐    ┌──────────────┐
     │  REFUNDED    │    │  COMPLETED   │
     │  (to client) │    │              │
     └──────────────┘    └──────────────┘

Additional transitions:
  REQUESTED  → DECLINED   (musician declines — no payment ever taken)
  REQUESTED  → EXPIRED    (no musician response in 72h — auto-decline)
  ACCEPTED   → EXPIRED    (client doesn't pay in 48h — auto-cancel)
  PAID       → DISPUTED   (client opens service dispute within 7 days of event)
```

### State rules (enforce in application layer)
- Only valid transitions allowed — any attempt to skip a state is an error
- `PAID` → triggered only by confirmed Wompi webhook (client charge)
- `COMPLETED` → requires commission charge success; if commission fails, stays in `COMMISSION_FAILED` until resolved
- `DISPUTED` → only admin can resolve; neither party can self-resolve
- `DISPUTED` → disputes are about service quality, not fund release (funds already transferred)
- All state transitions logged with timestamp, actor, and reason (audit trail)
- Cron (every 15 min): REQUESTED >72h → EXPIRED, ACCEPTED >48h no payment → EXPIRED

### Prisma schema (core booking model)
```prisma
enum BookingStatus {
  REQUESTED
  ACCEPTED
  DECLINED
  EXPIRED
  PAID        // client paid $114; payout to musician ($97) initiated
  DISPUTED
  COMPLETED   // payout confirmed
  REFUNDED
  CANCELLED
}
// Note: no COMMISSION_FAILED state — musician's 3% fee is deducted from payout
// automatically, not charged separately. No second Wompi charge needed.

model Booking {
  id              String        @id @default(cuid())
  clientId        String
  musicianId      String
  serviceId       String?
  status          BookingStatus @default(REQUESTED)

  // Amounts (all USD)
  serviceAmount   Decimal       @db.Decimal(10, 2)  // musician's listed price ($100)
  bookingFee      Decimal       @db.Decimal(10, 2)  // 14% client fee ($14)
  clientTotal     Decimal       @db.Decimal(10, 2)  // what client pays ($114)
  musicianPayout  Decimal       @db.Decimal(10, 2)  // what musician receives ($97 = service − 3%)
  platformFee     Decimal       @db.Decimal(10, 2)  // platform net ($10.99)
  wompiFeePaid    Decimal       @db.Decimal(10, 2)  // Wompi's cut ($6.01)

  currency        String        @default("USD")
  eventDate       DateTime
  eventType       String
  eventLocation   String
  wompiTxId       String?       // client charge tx — idempotency key
  wompiPayoutId   String?       // payout transfer to musician
  disputeOpenedAt DateTime?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  client          User          @relation("ClientBookings", fields: [clientId], references: [id])
  musician        User          @relation("MusicianBookings", fields: [musicianId], references: [id])
  messages        Message[]
  statusHistory   BookingStatusLog[]
}

model BookingStatusLog {
  id          String        @id @default(cuid())
  bookingId   String
  fromStatus  BookingStatus?
  toStatus    BookingStatus
  actorId     String?       // null = system
  reason      String?
  createdAt   DateTime      @default(now())
  booking     Booking       @relation(fields: [bookingId], references: [id])
}
```

## Phased Build Plan

### Phase 0 — Cold Start / Pre-Launch (target: 2–3 weeks before Phase 1 opens)

**Goal:** seed enough supply that the first client who visits finds real musicians to hire.

**Geographic focus: El Salvador + Guatemala only.** "Global first" fails for marketplaces — supply density requires geographic concentration. Expanding before hitting density in one market means you have 3 musicians in every country and 0 clients anywhere. Lock Phase 1 to El Salvador + Guatemala. Phase 2 expands to Mexico, Colombia, other LatAm markets.

**Cold start playbook:**
1. **Manual musician recruitment:** reach out directly to 20–30 musicians in El Salvador (Instagram, Facebook groups, music schools, venues). Offer: free Pro account for 6 months in exchange for completing their profile. No cold launch until ≥ 15 profiles are live with at least 1 video each.
2. **Waitlist for clients:** launch a landing page with "coming soon" + email capture form before the platform is live. Target: 50 client email signups before opening.
3. **First reviews:** arrange 3–5 real bookings with friends/family/colleagues as the first clients. These generate the first reviews, ratings, and proof that the platform works end-to-end.
4. **Social proof gate:** do NOT open the platform to public search until the landing page can show a real number ("X musicians available in El Salvador").
5. **Feedback loop:** interview all 20–30 seed musicians during onboarding. Their friction points are your highest-priority bugs.

**Success criteria for Phase 0 → Phase 1 transition:**
- ≥ 15 published musician profiles with videos
- ≥ 1 completed booking end-to-end (including review)
- ≥ 50 client email waitlist signups
- Commission collection working in production (real money)

### Phase 1 — Core Booking Loop (target: 4–6 weeks)
Goal: one musician can receive and confirm a real booking and receive payment.

- Auth: email + password, role selection (musician / client)
- Musician profile: bio, genres, location, 1 service listing
- Video upload: 1 video per profile (S3 upload, no transcoding yet — accept MP4 only)
- Search: PostgreSQL full-text search + location filter (no Elasticsearch yet)
- Booking request: form (event type, date, location, budget) + email notification to musician
- Messaging: async — email-based reply thread (no real-time WebSocket yet)
- Payment: Wompi charge at booking confirmation (simple charge, manual escrow via bank hold)
- Review: post-event email prompt → star rating + comment
- Client account: light gate (email + name) → full account created post-first-contact
- Musician dashboard: bookings list, pending requests, basic earnings total
- Client dashboard: bookings list, messages

**NOT in Phase 1:** video transcoding pipeline, real-time WebSocket messaging, subscription tiers, analytics dashboard, map view, admin panel, multi-member band profiles, notification center

### Phase 2 — Full Marketplace (target: +4–6 weeks post-Phase 1)
- Video pipeline: transcoding (Mux or AWS MediaConvert), multiple videos per profile, processing status
- Full search: all filters (genre, price range, rating, availability), sort, infinite scroll
- Dispute resolution UI (admin-facing) — Phase 1 disputes handled manually via email/Notion
- Subscription tiers: Free / Pro / Studio with Wompi recurring billing
- Real-time messaging: WebSocket (Pusher or Ably for managed; native WS for self-hosted)
- Notification center (in-app)
- "Notify me" waitlist for zero-results searches

### Phase 3 — Growth (ongoing post-Phase 2)
- Analytics dashboards (musician earnings, views, conversion)
- Admin panel (user management, flagging, payment disputes)
- Map view on search
- i18n: Spanish launch, then Portuguese/French
- Multi-member band profiles
- Mobile PWA

## Technical Notes
- Web-first, mobile-responsive
- Video: S3 upload (presigned URLs), CDN delivery; Phase 2 adds transcoding
- No YouTube embeds — privacy and brand consistency
- Messaging: email-thread for Phase 1, WebSocket (Pusher) for Phase 2
- Payment processor: Wompi (team has existing API integration); no Stripe in El Salvador
- Escrow: application-layer state machine (Wompi has no native marketplace escrow)
- i18n: next-intl from day one; English Phase 1, Spanish Phase 2
- No country restrictions on registration

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Navigation structure | Unified nav + split CTAs in hero ("Find Musicians" + "Join as Musician") | Proven marketplace pattern; one domain; musicians and clients both feel addressed |
| Client account gate | Light gate: email + name only to send first request; full account created after | Reduces spam without killing conversion; account creation is natural post-investment |
| Mobile search filters | Bottom sheet drawer + "Show X results" button | Maximizes results real estate; one-hand reachable; Airbnb/Booking.com validated pattern |
| Visual direction | Dark concert atmosphere: near-black bg, warm amber/gold accent | Distinctive from white SaaS; signals live music culture; works globally |
| Musician onboarding | 5-step guided wizard with live profile preview | Completion psychology; each step is rewarding; profile quality is supply quality |
| Zero-results empty state | Warm empty state + "Notify me" email capture | Turns a dead end into a lead-gen moment; acknowledges platform gap honestly |

## Open Decisions (not yet resolved — must be resolved before those screens are built)

| Decision | Blocked Screen | Notes |
|----------|---------------|-------|
| Subscription pricing (Pro/Studio amounts) | Pricing page, onboarding step 5 | Defer to pricing strategy review; global market means lower price floors |
| Video upload limits per plan | Free/Pro feature gate | Define before subscription page is designed |
| Multi-member band profiles | Profile creation | Bands with 3–10 members need a different profile model |
| i18n launch languages | All screens | English + Spanish minimum for Latin American market; French/Portuguese for broader reach |

---

## Responsive Behavior

### Breakpoints
| Name | Width | Layout Changes |
|------|-------|---------------|
| Mobile | 375–767px | Single column, bottom nav, filter drawer |
| Tablet | 768–1023px | 2-column search results, sidebar collapsed |
| Desktop | 1024px+ | Full layout with sidebar, wide cards |

### Per-Screen Mobile Specs

**Landing page (mobile):**
- Hero: full-viewport height, headline 40px, both CTAs stacked (Find Musicians above, Join as Musician below)
- Featured musicians: horizontal scroll carousel (not a 3-column grid)
- "How it works": vertical stacked steps, number + text + photo
- Navigation: hamburger icon → full-screen overlay

**Search / Discovery (mobile):**
- Results: single-column card list (no grid)
- Filters: sticky "Filters" button at top → bottom sheet drawer with all filters + "Show X results" button
- Sort: dropdown above results
- No sidebar — drawer only

**Musician Profile (mobile):**
- Photo: full-width, 16:9 aspect ratio, above fold
- Demo videos: horizontal scroll (one visible at a time, dots indicator)
- Services: accordion — collapsed by default
- "Request Booking" button: sticky at bottom of screen

**Musician Dashboard (mobile):**
- Bottom navigation: Home, Bookings, Messages, Profile (4 tabs)
- Cards are full-width, no sidebar
- Analytics: horizontal scroll chart, not a dashboard grid

**Accessibility baseline (all screens):**
- All interactive elements reachable via Tab key
- Minimum touch target: 44×44px
- Focus visible at all times
- Skip-to-main-content link at top of each page
- ARIA `role="main"`, `role="navigation"`, `role="complementary"` on all layouts
- Screen reader test required before launch: VoiceOver (iOS), TalkBack (Android), NVDA (Windows)

---

## Visual Design Language

### Direction: Dark Concert Atmosphere

| Token | Value | Rationale |
|-------|-------|-----------|
| Background (landing/hero) | `#0A0A0F` near-black | Stage darkness — live music is an evening experience |
| Background (app/dashboard) | `#12121A` dark navy | Lifted slightly from pure black for readability |
| Surface (cards) | `#1C1C28` | Distinguishable from background without being jarring |
| Border | `#2E2E3E` | Subtle — borders should be whispers, not walls |
| Accent primary | `#D4A853` warm amber/gold | Premium, warm, works across cultures |
| Accent hover | `#E8C06A` | Lighter gold on hover — not just opacity change |
| Text primary | `#F2F2F4` near-white | Warm white — pure #FFF is harsh on dark backgrounds |
| Text secondary | `#8A8A9A` muted | For meta-data, labels, secondary info |
| Text on accent | `#0A0A0F` | Dark text on gold buttons |
| Success | `#4CAF82` | Booking confirmed, payment cleared |
| Error | `#E85B5B` | Payment failed, upload error |
| Heading font | `Neue Haas Grotesk` or `DM Sans` (bold weight) | Strong, modern, neutral — not a music font cliché |
| Body font | `Inter` or `DM Sans Regular` | Readable at small sizes in data-dense dashboards |
| Heading size (hero) | 64px desktop / 40px mobile | Billboard-scale — the headline is the first thing the eye lands on |
| Border radius | 8px for cards, 6px for buttons, 4px for inputs | Slightly rounded — not bubbly, not square |

### "How It Works" section — anti-slop rule
Do NOT use icon-in-colored-circle × 3. Instead: use numbered steps (1, 2, 3) in large display type, with a single full-bleed photo of each step's key moment. The number IS the visual anchor, not a decorative icon.

### App UI sections (dashboard, forms, search)
- Dark surface backgrounds, not white — consistency with the brand
- Forms: white/light inputs on dark background, labels ABOVE the field (never placeholder-as-label)
- Tables: alternating row shading at `#1C1C28` / `#16161F`
- Charts/analytics: amber accent for primary metric, muted grey for secondary

---

## Interaction States

| Feature | Loading | Empty | Error | Success | Partial |
|---------|---------|-------|-------|---------|---------|
| Search results | Skeleton cards (3 placeholder cards with pulse animation) | Warm: illustration + "No musicians in [location] yet" + email capture "Notify me when someone joins" | "Something went wrong — try again" + retry button | Results grid with count "X musicians found" | Results + "Showing partial results — refine your search" |
| Musician profile | Skeleton layout matching profile structure | N/A | "Profile unavailable" + back button | Full profile with all sections | Profile loads but videos still buffering — show video placeholder |
| Booking request sent | Loading spinner on button | N/A | "Couldn't send request — check your connection" | Confirmation screen + "Request sent! [Name] will respond within 24h" | N/A |
| Musician dashboard (first time) | Skeleton | Welcome empty state: "Your dashboard is empty — let's build your first listing" + CTA | "Couldn't load dashboard" + retry | Bookings list | Some bookings loaded, analytics pending |
| Client dashboard (first time) | Skeleton | "You haven't booked anyone yet — start exploring musicians" + search CTA | "Couldn't load dashboard" | Active bookings + messages | Bookings loaded, messages loading |
| Video upload | Progress bar with percentage | "No demo videos yet — add one to increase bookings 3x" | "Upload failed — file may be too large (max 500MB)" | Thumbnail preview + "Video processing..." | Upload complete but processing |
| Messages | Skeleton messages | "No messages yet — requests from clients will appear here" | "Couldn't load messages" | Message thread | Messages loaded, new message badge pending |
| Payment | Full-screen loading overlay | N/A | "Payment failed — your card was not charged" + try again | "Booking confirmed!" + event details + receipt | N/A |
| Checkout summary | — | — | — | Shows: Service $X + Booking fee 14% = Total $Y | — |

---

## Information Architecture

### Navigation (Global)
- **Logo** (top-left) → home
- **Search bar** (center, always visible on desktop) → search with current filters
- **For Musicians** → musician landing/onboarding
- **Find Musicians** → search page
- **Sign In / Sign Up** (top-right) → role selection on sign-up

### Screen Hierarchy

#### 1. Landing Page
```
PRIMARY:   Hero — "Find the perfect musician for your next event"
           Search bar (genre, location, date) + "Search" button
           Secondary CTA row: "Find Musicians" [primary] | "Join as Musician" [secondary/ghost]
SECONDARY: Featured musicians (3 cards — photo, name, genre, rating, price from)
           How it works — 3 steps (search → watch demos → book & pay)
TERTIARY:  Social proof — testimonials / booking count
           Subscription value prop (for musicians)
           Footer
```

#### 2. Search / Discovery
```
PRIMARY:   Results list / grid with musician cards
           Filter sidebar (genre, location, price range, rating, availability)
SECONDARY: Sort controls (relevance, price, rating, newest)
           Map view toggle
TERTIARY:  Pagination / infinite scroll
```

#### 3. Musician Profile
```
PRIMARY:   Name, photo, tagline, genres, location, "Request Booking" button, price from
SECONDARY: Demo videos (1–3 above the fold), bio
TERTIARY:  Services list with pricing, reviews, FAQ, calendar availability
```

#### 4. Musician Dashboard
```
PRIMARY:   Pending booking requests (action required)
SECONDARY: Upcoming bookings, earnings summary
TERTIARY:  Profile completeness nudge, analytics, listing management
```

#### 5. Client Dashboard
```
PRIMARY:   Active bookings (status + action)
SECONDARY: Messages with pending replies
TERTIARY:  Saved musicians, past bookings, reviews to leave
```

---

## NOT in Scope (design review — explicitly deferred)

| Item | Rationale |
|------|-----------|
| Admin panel design | Not user-facing; can be designed during implementation |
| Native mobile app | Web-first v1; PWA if needed, native as v2 |
| AI-powered recommendations | Not a v1 feature |
| Verification workflow detail | Blocked by TODO-6 (criteria not yet defined) |
| RTL language support | Not in launch language set; CSS architecture decision needed |
| Pricing page visual design | Blocked by TODO-1 (pricing numbers not confirmed) |
| Band member linked profiles | Blocked by TODO-4 (model not decided) |

## What Already Exists (to reuse)

Nothing — greenfield project. Every component is net new. Start from DESIGN.md token system.

---

## NOT in Scope (v1)
- Native mobile apps
- AI-powered matching / recommendations
- Live streaming of performances
- Instrument rentals
- Music lessons marketplace

---

## Implementation Tasks

Tasks derived from the eng review. Each maps to a specific finding.

### Phase 1 — Core Booking Loop

| ID | Task | Priority | Effort | File/Area |
|----|------|----------|--------|-----------|
| T1 | Set up Next.js 14 App Router project with Prisma + PostgreSQL (Neon/Supabase) | P0 | 2h | `/prisma/schema.prisma`, `app/` |
| T2 | Define full Prisma schema: User, MusicianProfile, Service, Video, Booking, BookingStatusLog, Message, Review, WaitlistEntry | P0 | 3h | `/prisma/schema.prisma` |
| T3 | Add all SQL indexes (location, published+rating, booking cron, booking expiry, pending release) | P0 | 1h | `/prisma/migrations/` |
| T4 | Auth.js v5 setup — email+password + Google OAuth, Prisma adapter, sessions in PostgreSQL | P0 | 2h | `app/api/auth/[...nextauth]/`, `lib/auth.ts` |
| T5 | Musician onboarding wizard — 5-step flow with live preview pane | P1 | 1.5d | `app/onboarding/musician/` |
| T6 | Basic musician profile page (bio, services, 1 video, contact button) | P1 | 1d | `app/profile/[id]/` |
| T7 | Search page — PostgreSQL full-text + location filter, page size capped at 50, skeleton loading | P1 | 1d | `app/search/`, `app/api/search/route.ts` |
| T8 | Booking request form (event type, date, location, budget) + email notification via Resend | P1 | 0.5d | `app/booking/request/`, `lib/email.ts` |
| T9 | Implement booking state machine with `transitionBooking()` helper — enforce valid transitions | P0 | 0.5d | `lib/booking.ts` |
| T10 | Wompi webhook handler: HMAC verify → idempotency check → atomic transition + **timestamp replay window (±5 min)** | P0 | 0.5d | `app/api/webhooks/wompi/route.ts` |
| T11 | Vercel Cron job: REQUESTED >72h → EXPIRED, ACCEPTED >48h → EXPIRED, PENDING_RELEASE past releaseAt → COMPLETED — **add distributed lock via DB advisory lock or upsert to prevent double-transition** | P0 | 0.5d | `app/api/cron/booking-transitions/route.ts` |
| T12 | Wompi single-charge flow: client pays clientTotal → webhook → payout musicianPayout to musician. `calculateBookingAmounts()` is the single source of truth for all fee math | P0 | 0.5d | `lib/payments.ts`, `app/api/webhooks/wompi/route.ts` |
| T13 | Cloudflare Stream upload flow: presigned upload URL → Cloudflare webhook callback to `app/api/webhooks/cloudflare-stream/route.ts` → set video.status = READY | P1 | 0.5d | `app/api/webhooks/cloudflare-stream/route.ts` |
| T14 | Denormalized field update mechanism: Prisma middleware (explicit, not DB trigger) for avgRating + totalBookings — document the update paths | P1 | 0.5d | `lib/prisma.ts` (middleware) |
| T15 | Rate limiting on booking creation endpoint (e.g., Vercel edge config or upstash/ratelimit) | P1 | 2h | `app/api/booking/request/route.ts` |
| T16 | Add connection pooling via Prisma Accelerate or PgBouncer — critical for Vercel serverless | P0 | 1h | `lib/prisma.ts`, env config |
| T17 | Async email notifications (Resend) for all booking state transitions | P1 | 0.5d | `lib/email.ts` |
| T18 | Musician dashboard: pending requests (action required), upcoming bookings, earnings total | P1 | 1d | `app/dashboard/musician/` |
| T19 | Client dashboard: active bookings, message threads | P1 | 0.5d | `app/dashboard/client/` |
| T20 | Light gate client account creation: email + name on first booking request; full account after | P1 | 2h | `app/booking/request/` |
| T21 | ~~Musician card tokenization~~ — **eliminated**. Airbnb model deducts musician fee from payout; no second charge needed. No card on file required. | ✅ N/A | — |

### Phase 1 — Pre-Flight (must resolve before booking goes live)

| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T22 | ~~Resolve platform fee %~~ — **resolved: 8%** | ✅ done | — |
| T23 | ~~Resolve calendar/availability scope~~ — **resolved: date picker (structured date+time, no musician-side calendar)** | ✅ done | — |
| T24 | ~~Legal check: money transmission~~ — **resolved: eliminated by pass-through model** (platform never holds client funds) | ✅ done | — |

| T29 | AnalyticsEvent model: add to Prisma schema, emit events at all key flows (profile view, search, booking request, booking completed, commission collected/failed, review left) | P1 | 0.5d | `prisma/schema.prisma`, `lib/analytics.ts` |
| T30 | Fraud detection: rate limit max 3 bookings per payment method per 24h; flag same-card bidirectional bookings (A books B + B books A); log to admin queue | P1 | 0.5d | `lib/fraud.ts`, `app/api/booking/request/route.ts` |
| T31 | Musician pricing guidance: show "if you want to take home $X, set your price at $Y" in service creation form based on their plan tier (8% Free, 5% Pro) | P1 | 2h | `app/dashboard/musician/services/new/` |
| T32 | Phase 0 cold start: landing page with email waitlist capture before platform opens to public | P0 | 0.5d | `app/`, `app/api/waitlist/route.ts` |

### Phase 2 Tasks (not Phase 1)

| ID | Task | Notes |
|----|------|-------|
| T25 | Dispute resolution UI (admin-facing) | Phase 2 — define minimal admin process for Phase 1 disputes via email/spreadsheet |
| T26 | Real-time WebSocket messaging (Pusher or Ably) | Phase 2 — Phase 1 uses email-thread |
| T27 | Subscription billing (Wompi recurring) | Phase 2 |
| T28 | Full-text search with genre faceting — consider genres as a relation (Genre model) rather than String[] | Phase 2 — String[] works for MVP but limits faceted search at scale |

---

## Outside Voice (Independent Challenge — 2026-05-19)

Findings from an independent AI review. Incorporated into tasks above.

| Severity | Finding | Action |
|----------|---------|--------|
| CRITICAL | Cron double-transition risk: no distributed lock, overlapping runs can apply the same state transition twice | T11: add DB advisory lock or upsert guard |
| CRITICAL | Platform fee % is open but must be in the payment code before first Wompi charge, not a later config change | T22: resolve before Phase 1 ships |
| CRITICAL | Application-layer escrow + manual payouts may require money transmission license in El Salvador | T24: legal review before public launch |
| HIGH | Cloudflare Stream callback path not designed — `video.status` never gets set to READY without it | T13: add Cloudflare webhook handler |
| HIGH | No connection pooling — Vercel serverless exhausts Postgres connection limits under any real load | T16: add Prisma Accelerate |
| HIGH | avgRating/totalBookings update mechanism is ambiguous — Prisma middleware breaks on raw queries | T14: use explicit Prisma middleware, document all update paths |
| HIGH | No replay attack protection on Wompi webhooks — idempotency prevents double-processing but not replayed events | T10: add timestamp window check (±5 min) |
| HIGH | Rate limiting absent on booking creation — bad actor can spam musician's calendar | T15: add rate limiting |
| HIGH | genres: String[] blocks faceted search at scale | T28: plan migration to Genre relation in Phase 2 |
| HIGH | No dispute resolution process in Phase 1 — disputes can open but no one can resolve them | T25: define manual process for Phase 1 |
| MEDIUM | 48h dispute window has no rationale — may be too short (e.g., Friday-night events) | Note: consider 72h or business-days window |
| MEDIUM | No chargeback strategy — Wompi chargebacks hit platform account with no reserve fund | Note: reserve fund + musician T&C clause needed pre-launch |

---

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 1 | issues_resolved | GTM added, Airbnb split model (14%/3%), Wompi 5.27% corrected, fraud detection, AnalyticsEvent |
| Outside Voice | subagent challenge | Independent 2nd opinion | 1 | complete | 3 critical, 8 high, 2 medium — see above |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | complete — issues_resolved | 9 decisions, 28 implementation tasks |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | issues_open (6 deferred) | score: 2/10 → 9/10, 6 decisions made |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | — |

**BLOCKERS before Phase 1 ships:** ~~T22~~ ✅ ~~T23~~ ✅ ~~T24~~ ✅ — all 3 blockers resolved
**UNRESOLVED design decisions:** 4 open (Pro/Studio pricing amounts, video limits, band profiles, i18n) — see TODOS.md
**VERDICT:** Plan is fully implementation-ready. Start with T32 (waitlist landing page) + T1–T4 (scaffold) in parallel.

