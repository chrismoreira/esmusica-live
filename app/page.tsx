"use client";

import { useState } from "react";
import WaitlistForm from "@/components/WaitlistForm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MusicianCard from "@/components/MusicianCard";

/* ── Data ───────────────────────────────────────────────────── */
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
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--canvas)", color: "var(--ink)" }}>

      {/* ── 1. Nav ─────────────────────────────────────────────── */}
      <Nav activePage="home" />

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
              <MusicianCard
                key={musician.name}
                name={musician.name}
                genre={musician.genre}
                location={musician.location}
                rating={musician.rating}
                price={musician.price}
                verified={musician.verified}
                gradient={musician.gradient}
                slug={musician.name.toLowerCase().replace(/\s+/g, "-")}
              />
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
      <Footer />

    </div>
  );
}
