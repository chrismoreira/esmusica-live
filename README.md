# esmusica.live

Marketplace de músicos en vivo para eventos privados en El Salvador y Guatemala. Conecta a personas que organizan bodas, quinceañeras, aniversarios y eventos corporativos con músicos y bandas disponibles para contratar.

> Modelo Airbnb: cliente paga 14% booking fee · músico paga 3% de comisión · powered by Wompi

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 App Router |
| Base de datos | PostgreSQL + Prisma v7 |
| Auth | Auth.js v5 + Google OAuth |
| Pagos | Wompi (El Salvador) |
| Video | Cloudflare Stream |
| Archivos | Cloudflare R2 |
| Email | Resend |
| Hosting | Vercel |
| i18n | next-intl |

## Modelo de negocio

```
Músico cobra:    $100.00
Cliente paga:    $114.00  (+ 14% booking fee)
Wompi se lleva:  $  6.01  (5.27% efectivo El Salvador)
Plataforma gana: $ 10.99  por booking ✅
Músico recibe:   $ 97.00
```

## Setup local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env.local
# Llenar DATABASE_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, etc.
```

### 3. Base de datos

```bash
# Requiere DATABASE_URL configurado (Neon o Supabase recomendado)
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Correr en desarrollo

```bash
npm run dev
# http://localhost:3000
```

## Variables de entorno requeridas

Ver `.env.example` para la lista completa. Las mínimas para desarrollo:

```
DATABASE_URL=          # PostgreSQL (Neon / Supabase)
NEXTAUTH_SECRET=       # openssl rand -base64 32
GOOGLE_CLIENT_ID=      # Google Cloud Console
GOOGLE_CLIENT_SECRET=
```

## Estructura del proyecto

```
app/
  page.tsx                    # Landing page (hero + buscador + waitlist)
  layout.tsx                  # Root layout (fuentes, metadata)
  api/
    auth/[...nextauth]/       # Auth.js v5 handler
    waitlist/                 # POST /api/waitlist
components/
  SearchBar.tsx               # Buscador con autocomplete
  WaitlistForm.tsx            # Form de waitlist
lib/
  auth.ts                     # Config Auth.js v5
  prisma.ts                   # Singleton PrismaClient
prisma/
  schema.prisma               # 14 modelos (User, Booking, Service, Video...)
public/
  logo.png                    # Logo esmusica.live
```

## Estado del proyecto

| Fase | Estado |
|------|--------|
| Landing page + waitlist | ✅ Listo |
| Schema DB + Auth | ✅ Listo |
| Onboarding músico | 🔧 Pendiente |
| Búsqueda con DB real | 🔧 Pendiente |
| Flujo de booking + Wompi | 🔧 Pendiente |
| Dashboard músico/cliente | 🔧 Pendiente |

## Mercado objetivo

**Fase 1:** El Salvador + Guatemala  
**Fase 2:** México, Colombia, resto de LatAm

---

© 2025 esmusica.live · El Salvador
