"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Mock data ────────────────────────────────────────────────────────────────
const MUSICIAN = {
  slug: "carlos-mendoza",
  name: "Carlos Mendoza",
  genres: ["Jazz", "Bossa Nova", "Blues"],
  location: "San Salvador, El Salvador",
  rating: 4.9,
  reviews: 48,
  price: "Desde $120/hr",
  bio: "Saxofonista profesional con 12 años de experiencia en eventos privados, bodas y veladas corporativas en El Salvador y Guatemala. Estudié en el Conservatorio Nacional y he colaborado con artistas internacionales en más de 300 eventos. Mi enfoque es crear una atmósfera única que eleve cada momento especial. Disponible para presentaciones en solitario, dúo o con banda completa.",
  verified: true,
  services: [
    { name: "1 hora (mínimo)", price: "$120" },
    { name: "2–3 horas", price: "$200" },
    { name: "Evento completo (4+ hrs)", price: "$320" },
  ],
  reviewsList: [
    {
      initials: "AM",
      name: "Ana Martínez",
      date: "Abril 2025",
      text: "Carlos fue absolutamente increíble en nuestra boda. El ambiente que creó con su saxofón durante la cena fue mágico y todos nuestros invitados quedaron encantados.",
      color: "#D4A853",
    },
    {
      initials: "RH",
      name: "Roberto Herrera",
      date: "Marzo 2025",
      text: "Contratamos a Carlos para el aniversario de nuestra empresa y superó todas las expectativas. Muy profesional, puntual y con un repertorio extraordinario.",
      color: "#7C9EBF",
    },
    {
      initials: "SC",
      name: "Sofía Castro",
      date: "Febrero 2025",
      text: "Desde el primer contacto fue muy atento y flexible con el repertorio. En la quinceañera de mi hija fue el toque perfecto. Lo recomiendo sin dudarlo.",
      color: "#A8C5A0",
    },
  ],
};

// ─── Photo gallery placeholders ───────────────────────────────────────────────
const GALLERY_GRADIENTS = [
  "linear-gradient(135deg, #f5e6cc 0%, #e8c992 100%)",
  "linear-gradient(135deg, #d4e8f0 0%, #aacfdf 100%)",
  "linear-gradient(135deg, #e8d4f0 0%, #c9a8df 100%)",
  "linear-gradient(135deg, #d4f0e0 0%, #a8dfc0 100%)",
  "linear-gradient(135deg, #f0d4d4 0%, #dfa8a8 100%)",
];

// ─── Fee calculation ──────────────────────────────────────────────────────────
const BASE_RATE = 120;
const HOURS = 3;
const SUBTOTAL = BASE_RATE * HOURS;
const SERVICE_FEE = parseFloat((SUBTOTAL * 0.14).toFixed(2));
const TOTAL = SUBTOTAL + SERVICE_FEE;

export default function MusicianProfilePage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--canvas)", minHeight: "100vh" }}>
      <Nav activePage="search" />

      {/* ── Photo Gallery ── */}
      <div
        className="w-full overflow-hidden"
        style={{ maxHeight: "480px" }}
        aria-label="Galería de fotos"
      >
        <div
          className="mx-auto grid h-[480px] max-w-6xl grid-cols-2 gap-2 px-0 md:px-6"
          style={{ gridTemplateRows: "1fr 1fr" }}
        >
          {/* Large photo — left half, full height */}
          <div
            className="relative row-span-2 rounded-none md:rounded-l-card overflow-hidden"
            style={{ background: GALLERY_GRADIENTS[0] }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{ fontSize: "64px", opacity: 0.25 }}>🎷</span>
            </div>
          </div>

          {/* Right half — 2×2 grid */}
          <div className="grid grid-cols-2 gap-2" style={{ gridRow: "span 2" }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`overflow-hidden ${
                  i === 2 ? "rounded-none md:rounded-tr-card" : ""
                } ${i === 4 ? "rounded-none md:rounded-br-card" : ""}`}
                style={{ background: GALLERY_GRADIENTS[i] }}
              />
            ))}
          </div>
        </div>

        {/* "Ver todas" button — positioned relative to gallery */}
        <div className="relative">
          <button
            className="absolute flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors"
            style={{
              bottom: "16px",
              right: "24px",
              background: "var(--canvas)",
              border: "1px solid var(--hairline)",
              borderRadius: "8px",
              color: "var(--ink)",
              cursor: "pointer",
              transform: "translateY(-100%) translateY(-16px)",
              zIndex: 10,
            }}
          >
            <span>⊞</span>
            Ver todas las fotos
          </button>
        </div>
      </div>

      {/* ── Content columns ── */}
      <div className="mx-auto max-w-6xl gap-8 px-6 py-10 md:flex md:items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="flex-1 min-w-0 md:pr-8">

          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1
                className="font-bold"
                style={{ fontSize: "28px", color: "var(--ink)", lineHeight: 1.2 }}
              >
                {MUSICIAN.name}
              </h1>
              {MUSICIAN.verified && (
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-pill"
                  style={{
                    background: "rgba(212,168,83,0.12)",
                    color: "var(--primary)",
                    border: "1px solid rgba(212,168,83,0.3)",
                  }}
                >
                  ✓ Verificado
                </span>
              )}
            </div>
            <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
              📍 {MUSICIAN.location}
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              ★ {MUSICIAN.rating} · {MUSICIAN.reviews} reseñas
            </p>
          </div>

          {/* Divider */}
          <hr style={{ borderColor: "var(--hairline)", margin: "24px 0" }} />

          {/* Sobre mí */}
          <section className="mb-6">
            <h2
              className="mb-3 font-semibold"
              style={{ fontSize: "18px", color: "var(--ink)" }}
            >
              Sobre mí
            </h2>
            <p style={{ fontSize: "15px", color: "var(--body)", lineHeight: 1.7 }}>
              {MUSICIAN.bio}
            </p>
          </section>

          {/* Géneros y estilo */}
          <section className="mb-6">
            <h2
              className="mb-3 font-semibold"
              style={{ fontSize: "18px", color: "var(--ink)" }}
            >
              Géneros y estilo
            </h2>
            <div className="flex flex-wrap gap-2">
              {MUSICIAN.genres.map((g) => (
                <span
                  key={g}
                  className="px-4 py-1.5 text-sm font-medium rounded-pill"
                  style={{
                    background: "var(--surface-soft)",
                    border: "1px solid var(--hairline)",
                    color: "var(--body)",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
          </section>

          <hr style={{ borderColor: "var(--hairline)", margin: "24px 0" }} />

          {/* Videos */}
          <section className="mb-6">
            <h2
              className="mb-4 font-semibold"
              style={{ fontSize: "18px", color: "var(--ink)" }}
            >
              Videos
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Demo — Boda en San Salvador 2024",
                "Demo — Evento Corporativo 2024",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-card overflow-hidden"
                  style={{
                    background: "var(--surface-soft)",
                    aspectRatio: "16/9",
                    position: "relative",
                  }}
                >
                  {/* Play button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.92)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      <span style={{ fontSize: "20px", marginLeft: "3px" }}>▶</span>
                    </div>
                    <p
                      className="text-xs font-medium text-center px-4"
                      style={{ color: "var(--muted)" }}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr style={{ borderColor: "var(--hairline)", margin: "24px 0" }} />

          {/* Servicios y precios */}
          <section className="mb-6">
            <h2
              className="mb-4 font-semibold"
              style={{ fontSize: "18px", color: "var(--ink)" }}
            >
              Servicios y precios
            </h2>
            <div className="flex flex-col gap-3">
              {MUSICIAN.services.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-card px-5 py-4"
                  style={{
                    background:
                      selectedService === i
                        ? "rgba(212,168,83,0.07)"
                        : "var(--surface-soft)",
                    border:
                      selectedService === i
                        ? "1px solid rgba(212,168,83,0.4)"
                        : "1px solid var(--hairline)",
                  }}
                >
                  <div>
                    <p className="font-medium" style={{ color: "var(--ink)", fontSize: "15px" }}>
                      {s.name}
                    </p>
                    <p
                      className="mt-0.5 font-semibold"
                      style={{ color: "var(--primary)", fontSize: "15px" }}
                    >
                      {s.price}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedService(i)}
                    className="px-4 py-2 text-sm font-semibold rounded-btn transition-colors"
                    style={{
                      background:
                        selectedService === i ? "var(--primary)" : "transparent",
                      color:
                        selectedService === i ? "var(--on-primary)" : "var(--primary)",
                      border: "1.5px solid var(--primary)",
                      cursor: "pointer",
                    }}
                  >
                    Seleccionar
                  </button>
                </div>
              ))}
            </div>
          </section>

          <hr style={{ borderColor: "var(--hairline)", margin: "24px 0" }} />

          {/* Reseñas */}
          <section className="mb-8">
            <h2
              className="mb-1 font-semibold"
              style={{ fontSize: "18px", color: "var(--ink)" }}
            >
              Reseñas
            </h2>
            <p className="mb-5 text-sm" style={{ color: "var(--muted)" }}>
              ★ {MUSICIAN.rating} · {MUSICIAN.reviews} reseñas
            </p>
            <div className="flex flex-col gap-5">
              {MUSICIAN.reviewsList.map((r) => (
                <div
                  key={r.initials}
                  className="rounded-card p-5"
                  style={{
                    background: "var(--surface-soft)",
                    border: "1px solid var(--hairline)",
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className="flex items-center justify-center rounded-full text-sm font-bold shrink-0"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: r.color,
                        color: "#fff",
                      }}
                    >
                      {r.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
                        {r.name}
                      </p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>
                        {r.date}
                      </p>
                    </div>
                    <div className="ml-auto text-sm" style={{ color: "var(--primary)" }}>
                      ★★★★★
                    </div>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--body)", lineHeight: 1.65 }}>
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── RIGHT COLUMN — Sticky booking CTA ── */}
        <div className="hidden md:block w-full md:w-[360px] shrink-0">
          <div
            className="sticky top-24 rounded-card p-6"
            style={{
              background: "var(--canvas)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Price */}
            <p className="mb-3 font-semibold" style={{ fontSize: "22px", color: "var(--ink)" }}>
              Desde $120
              <span className="font-normal" style={{ fontSize: "16px", color: "var(--muted)" }}>
                /hr
              </span>
            </p>

            {/* Availability pill */}
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-pill px-3 py-1.5 text-xs font-semibold"
              style={{
                background: "rgba(212,168,83,0.12)",
                color: "#a07620",
                border: "1px solid rgba(212,168,83,0.3)",
              }}
            >
              🟡 Agenda disponible · Responde en &lt; 2 hrs
            </div>

            {/* Date input */}
            <div
              className="mb-3 flex items-center gap-3 rounded-pill px-4"
              style={{
                height: "48px",
                border: "1px solid var(--hairline)",
                background: "var(--canvas)",
              }}
            >
              <span>📅</span>
              <span className="text-sm" style={{ color: "var(--muted)" }}>
                Fecha del evento
              </span>
            </div>

            {/* Time + duration row */}
            <div className="mb-3 grid grid-cols-2 gap-3">
              <div
                className="flex items-center gap-2 rounded-btn px-3"
                style={{
                  height: "48px",
                  border: "1px solid var(--hairline)",
                  background: "var(--canvas)",
                }}
              >
                <span>🕐</span>
                <span className="text-sm" style={{ color: "var(--muted)" }}>Hora</span>
              </div>
              <div
                className="flex items-center gap-2 rounded-btn px-3"
                style={{
                  height: "48px",
                  border: "1px solid var(--hairline)",
                  background: "var(--canvas)",
                }}
              >
                <span>⏱</span>
                <span className="text-sm" style={{ color: "var(--muted)" }}>Duración</span>
              </div>
            </div>

            {/* Event type dropdown placeholder */}
            <div
              className="mb-4 flex items-center justify-between rounded-btn px-4"
              style={{
                height: "48px",
                border: "1px solid var(--hairline)",
                background: "var(--canvas)",
              }}
            >
              <span className="text-sm" style={{ color: "var(--muted)" }}>Tipo de evento</span>
              <span style={{ color: "var(--muted)" }}>▾</span>
            </div>

            {/* Divider */}
            <hr style={{ borderColor: "var(--hairline)", margin: "16px 0" }} />

            {/* Fee breakdown */}
            <div className="mb-1 flex justify-between text-sm">
              <span style={{ color: "var(--muted)" }}>$120/hr × 3 horas</span>
              <span style={{ color: "var(--body)" }}>$360.00</span>
            </div>
            <div className="mb-3 flex justify-between text-sm">
              <span style={{ color: "var(--muted)" }}>Cargo por servicio</span>
              <span style={{ color: "var(--body)" }}>$50.40</span>
            </div>
            <hr style={{ borderColor: "var(--hairline)", margin: "12px 0" }} />
            <div className="mb-5 flex justify-between">
              <span className="font-semibold" style={{ color: "var(--ink)" }}>Total</span>
              <span className="font-semibold" style={{ color: "var(--ink)" }}>$410.40</span>
            </div>

            {/* CTA button */}
            <a
              href={`/reservar/${MUSICIAN.slug}`}
              className="block w-full rounded-btn font-semibold text-center transition-colors"
              style={{
                height: "52px",
                lineHeight: "52px",
                background: "var(--primary)",
                color: "var(--on-primary)",
                fontSize: "16px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary)";
              }}
            >
              Solicitar reserva
            </a>

            <p
              className="mt-3 text-center text-xs"
              style={{ color: "var(--muted)" }}
            >
              No se te cobrará hasta que el músico confirme
            </p>

            <hr style={{ borderColor: "var(--hairline)", margin: "16px 0" }} />

            <div className="text-center">
              <button
                className="text-xs underline"
                style={{ color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}
              >
                Reportar este perfil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3"
        style={{
          background: "var(--canvas)",
          borderTop: "1px solid var(--hairline)",
        }}
      >
        <div>
          <p className="text-xs" style={{ color: "var(--muted)" }}>Desde</p>
          <p className="font-semibold" style={{ color: "var(--ink)", fontSize: "18px" }}>
            $120
            <span className="font-normal text-sm" style={{ color: "var(--muted)" }}>/hr</span>
          </p>
        </div>
        <a
          href={`/reservar/${MUSICIAN.slug}`}
          className="rounded-btn px-6 font-semibold text-sm"
          style={{
            height: "48px",
            lineHeight: "48px",
            background: "var(--primary)",
            color: "var(--on-primary)",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Reservar
        </a>
      </div>

      {/* Bottom padding on mobile to clear sticky bar */}
      <div className="h-20 md:h-0" />

      <Footer />
    </div>
  );
}
