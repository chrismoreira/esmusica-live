"use client";

import { useState } from "react";
import WaitlistForm from "@/components/WaitlistForm";

/* ── Data ───────────────────────────────────────────────────── */
const NAV_TABS = ["Bodas", "Quinceañeras", "Corporativos", "Privados"] as const;

const GENRES = [
  { icon: "🎺", label: "Jazz" },
  { icon: "🥁", label: "Cumbia" },
  { icon: "💃", label: "Salsa" },
  { icon: "🎵", label: "Marimba" },
  { icon: "🎤", label: "Pop" },
  { icon: "🎸", label: "Rock" },
] as const;

const MUSICIANS = [
  {
    name: "Carlos Mendoza",
    genre: "Jazz",
    location: "San Salvador, SV",
    rating: "4.9",
    price: "Desde $120/hr",
    verified: true,
    gradient: "linear-gradient(135deg, #e8d5b7, #d4b896)",
  },
  {
    name: "Marimba Los Altos",
    genre: "Marimba",
    location: "Guatemala City",
    rating: "4.8",
    price: "Desde $200/evento",
    verified: false,
    gradient: "linear-gradient(135deg, #d4e8d5, #b8d4b9)",
  },
  {
    name: "Sofía Rivas",
    genre: "Pop/Acústico",
    location: "Santa Ana, SV",
    rating: "5.0",
    price: "Desde $80/hr",
    verified: true,
    gradient: "linear-gradient(135deg, #e8d5e8, #d4b8d4)",
  },
  {
    name: "Grupo Ritmo",
    genre: "Cumbia/Salsa",
    location: "Quetzaltenango",
    rating: "4.7",
    price: "Desde $150/evento",
    verified: false,
    gradient: "linear-gradient(135deg, #e8e0d5, #d4c8b8)",
  },
] as const;

/* ── Component ──────────────────────────────────────────────── */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("Bodas");
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--canvas)", color: "var(--ink)" }}>

      {/* ── 1. Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "var(--canvas)",
          borderBottom: "1px solid var(--hairline)",
          height: "80px",
        }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="esmusica.live" className="h-9 w-auto" />

          {/* Center: event-type tabs */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Tipo de evento">
            {NAV_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative pb-1 text-sm font-medium transition-colors"
                style={{
                  color: activeTab === tab ? "var(--ink)" : "var(--muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tab}
                {activeTab === tab && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: CTAs */}
          <div className="flex items-center gap-3">
            <button
              className="hidden rounded-lg border px-4 py-2 text-sm font-semibold transition-colors sm:block"
              style={{
                borderColor: "var(--hairline)",
                color: "var(--ink)",
                background: "var(--canvas)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--hairline)";
              }}
            >
              Soy músico
            </button>
            <button
              className="text-sm font-medium"
              style={{ color: "var(--ink)", background: "none", border: "none", cursor: "pointer" }}
            >
              Ingresá
            </button>
          </div>
        </div>
      </header>

      {/* ── 2. Hero ────────────────────────────────────────────── */}
      <section className="px-6 pb-8 pt-16 text-center" style={{ background: "var(--canvas)" }}>
        <div className="mx-auto max-w-2xl animate-fade-up">
          <h1
            className="text-balance leading-tight"
            style={{ fontSize: "32px", fontWeight: 700, color: "var(--ink)" }}
          >
            Encontrá músicos para tu evento.
          </h1>
          <p
            className="mt-3"
            style={{ fontSize: "16px", color: "var(--muted)" }}
          >
            Más de 50 músicos en El Salvador y Guatemala
          </p>

          {/* Search pill */}
          <div
            className="animate-fade-up-delay mx-auto mt-8 flex max-w-xl items-center overflow-hidden"
            style={{
              background: "var(--canvas)",
              border: "1px solid var(--hairline)",
              borderRadius: "9999px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
              height: "64px",
            }}
          >
            {/* Segment 1 */}
            <div className="flex flex-1 flex-col justify-center px-5 text-left">
              <span
                className="block leading-none"
                style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink)", letterSpacing: "0.02em" }}
              >
                Tipo de evento
              </span>
              <input
                type="text"
                placeholder="Boda, corporativo..."
                className="mt-0.5 w-full bg-transparent text-sm outline-none"
                style={{ color: "var(--muted)", fontSize: "13px" }}
              />
            </div>

            {/* Divider */}
            <div className="h-8 w-px flex-shrink-0" style={{ background: "var(--hairline)" }} aria-hidden />

            {/* Segment 2 */}
            <div className="flex flex-1 flex-col justify-center px-5 text-left">
              <span
                className="block leading-none"
                style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink)", letterSpacing: "0.02em" }}
              >
                Ciudad
              </span>
              <input
                type="text"
                placeholder="San Salvador..."
                className="mt-0.5 w-full bg-transparent text-sm outline-none"
                style={{ color: "var(--muted)", fontSize: "13px" }}
              />
            </div>

            {/* Search button */}
            <div className="flex-shrink-0 pr-2">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full text-lg transition-all"
                style={{
                  background: "var(--primary)",
                  color: "var(--on-primary)",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
                aria-label="Buscar"
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Genre strip ─────────────────────────────────────── */}
      <div
        className="animate-fade-up-delay-2"
        style={{ borderBottom: "1px solid var(--hairline)", background: "var(--canvas)" }}
      >
        <div className="mx-auto max-w-6xl overflow-x-auto px-6">
          <div className="flex items-center gap-8 py-4" style={{ minWidth: "max-content" }}>
            {GENRES.map(({ icon, label }) => {
              const isActive = activeGenre === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveGenre(isActive ? null : label)}
                  className="relative flex flex-col items-center gap-1 pb-1 transition-colors"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: isActive ? "var(--ink)" : "var(--muted)",
                  }}
                >
                  <span style={{ fontSize: "20px", lineHeight: 1 }} aria-hidden>{icon}</span>
                  <span style={{ fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap" }}>{label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "var(--primary)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 4. Featured musicians ──────────────────────────────── */}
      <section className="px-6 py-12" style={{ background: "var(--canvas)" }}>
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-6"
            style={{ fontSize: "22px", fontWeight: 600, color: "var(--ink)" }}
          >
            Músicos destacados
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MUSICIANS.map((musician) => (
              <div
                key={musician.name}
                className="group cursor-pointer"
                style={{ borderRadius: "14px" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Photo placeholder (square) */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: "14px",
                    background: musician.gradient,
                    transition: "box-shadow 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Verified badge top-left */}
                  {musician.verified && (
                    <div
                      className="absolute left-3 top-3"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        borderRadius: "9999px",
                        padding: "3px 8px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      Verificado
                    </div>
                  )}

                  {/* Heart top-right */}
                  <button
                    className="absolute right-3 top-3 flex items-center justify-center rounded-full transition-transform"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(255,255,255,0.92)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "15px",
                    }}
                    aria-label={`Guardar ${musician.name}`}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    }}
                  >
                    ♡
                  </button>
                </div>

                {/* Card info */}
                <div className="mt-3 px-0.5">
                  {/* Name + rating row */}
                  <div className="flex items-start justify-between">
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
                      {musician.name}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>
                      ★ {musician.rating}
                    </span>
                  </div>
                  {/* Genre · location */}
                  <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px" }}>
                    {musician.genre} · {musician.location}
                  </p>
                  {/* Price */}
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--primary)", marginTop: "4px" }}>
                    {musician.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. How it works ────────────────────────────────────── */}
      <section style={{ background: "var(--surface-soft)" }}>

        {/* For clients */}
        <div className="px-6 pb-16 pt-16">
          <div className="mx-auto max-w-6xl">
            <p
              className="mb-5 uppercase tracking-widest"
              style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}
            >
              Para clientes
            </p>
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                {
                  num: "1",
                  title: "Buscá por género, ubicación o presupuesto",
                  desc: "Filtrá por lo que necesitás: jazz para una boda, cumbia para una fiesta, salsa para un evento corporativo.",
                },
                {
                  num: "2",
                  title: "Vé demos en video y leé reseñas",
                  desc: "Cada perfil incluye videos de presentaciones reales y opiniones de clientes anteriores.",
                },
                {
                  num: "3",
                  title: "Reservá y pagá de forma segura",
                  desc: "Confirmá la fecha y pagá con total seguridad. El músico recibe el pago solo cuando el evento termina.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-5">
                  <span
                    className="flex-shrink-0 leading-none"
                    style={{ fontSize: "64px", fontWeight: 700, color: "var(--primary)", lineHeight: 1 }}
                  >
                    {step.num}
                  </span>
                  <div className="pt-2">
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.4 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "6px", lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hairline divider */}
        <div className="mx-auto max-w-6xl px-6">
          <div style={{ height: "1px", background: "var(--hairline)" }} />
        </div>

        {/* For musicians */}
        <div className="px-6 pb-16 pt-16">
          <div className="mx-auto max-w-6xl">
            <p
              className="mb-5 uppercase tracking-widest"
              style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}
            >
              Para músicos
            </p>
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                {
                  num: "1",
                  title: "Creá tu perfil en minutos — es gratis",
                  desc: "Subí tu foto, videos de presentaciones y descripción de tu estilo. Sin costo de registro.",
                },
                {
                  num: "2",
                  title: "Recibí solicitudes de clientes",
                  desc: "Los clientes te contactan directamente. Vos decidís qué fechas aceptás.",
                },
                {
                  num: "3",
                  title: "Cobrá directo, con solo un 3% de comisión",
                  desc: "La comisión más baja del mercado. Tu trabajo, tus ingresos.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-5">
                  <span
                    className="flex-shrink-0 leading-none"
                    style={{ fontSize: "64px", fontWeight: 700, color: "var(--primary)", lineHeight: 1 }}
                  >
                    {step.num}
                  </span>
                  <div className="pt-2">
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.4 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "6px", lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Waitlist ────────────────────────────────────────── */}
      <section
        id="waitlist"
        className="px-6 py-20 text-center"
        style={{ background: "var(--canvas)" }}
      >
        <div className="mx-auto max-w-lg">
          <h2 style={{ fontSize: "22px", fontWeight: 600, color: "var(--ink)" }}>
            Sé el primero en enterarte
          </h2>
          <p
            className="mt-3"
            style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.6 }}
          >
            Estamos construyendo el marketplace de música en vivo para El Salvador y Guatemala. Dejanos tu correo y te avisamos cuando abramos.
          </p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm />
          </div>
          <p
            className="mt-4"
            style={{ fontSize: "13px", color: "var(--muted-soft)" }}
          >
            Sin spam. Solo novedades del lanzamiento.
          </p>
        </div>
      </section>

      {/* ── 7. Footer ──────────────────────────────────────────── */}
      <footer
        className="px-6 py-12"
        style={{
          background: "var(--canvas)",
          borderTop: "1px solid var(--hairline)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          {/* 3-column link grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p
                className="mb-4 uppercase tracking-widest"
                style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}
              >
                Plataforma
              </p>
              {["Cómo funciona", "Músicos destacados", "Precios", "Blog"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="mb-2.5 block transition-colors"
                  style={{ fontSize: "14px", color: "var(--body)", textDecoration: "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--body)"; }}
                >
                  {link}
                </a>
              ))}
            </div>
            <div>
              <p
                className="mb-4 uppercase tracking-widest"
                style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}
              >
                Músicos
              </p>
              {["Crear perfil", "Gestionar agenda", "Cobros y comisiones", "Soporte para artistas"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="mb-2.5 block transition-colors"
                  style={{ fontSize: "14px", color: "var(--body)", textDecoration: "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--body)"; }}
                >
                  {link}
                </a>
              ))}
            </div>
            <div>
              <p
                className="mb-4 uppercase tracking-widest"
                style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}
              >
                Soporte
              </p>
              {["Centro de ayuda", "Contacto", "Términos de uso", "Privacidad"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="mb-2.5 block transition-colors"
                  style={{ fontSize: "14px", color: "var(--body)", textDecoration: "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--body)"; }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Legal band */}
          <div
            className="mt-10 pt-6"
            style={{ borderTop: "1px solid var(--hairline-soft)" }}
          >
            <p style={{ fontSize: "13px", color: "var(--muted)" }}>
              © 2025 esmusica.live · El Salvador
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
