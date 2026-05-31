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
  avatarColor: "#D4A853",
};

const HOURLY_RATE = 120;
const DEFAULT_HOURS = 3;
const SERVICE_FEE_RATE = 0.14;

type EventType =
  | ""
  | "Boda"
  | "Quinceañera"
  | "Aniversario"
  | "Corporativo"
  | "Fiesta privada"
  | "Ceremonia"
  | "Otro";

const EVENT_TYPES: EventType[] = [
  "Boda",
  "Quinceañera",
  "Aniversario",
  "Corporativo",
  "Fiesta privada",
  "Ceremonia",
  "Otro",
];

const DURATION_OPTIONS = [
  { label: "1 hora", hours: 1 },
  { label: "2 horas", hours: 2 },
  { label: "3 horas", hours: 3 },
  { label: "4+ horas", hours: 4 },
];

// ─── Shared input style ───────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  height: "48px",
  width: "100%",
  border: "1px solid var(--hairline)",
  borderRadius: "8px",
  padding: "0 16px",
  fontSize: "16px",
  fontFamily: "var(--font-inter)",
  color: "var(--ink)",
  background: "var(--canvas)",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--muted)",
  marginBottom: "6px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
  color: "var(--ink)",
  marginBottom: "16px",
  paddingBottom: "10px",
  borderBottom: "1px solid var(--hairline)",
};

export default function BookingPage() {
  const [eventType, setEventType] = useState<EventType>("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(3);
  const [address, setAddress] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subtotal = HOURLY_RATE * duration;
  const serviceFee = parseFloat((subtotal * SERVICE_FEE_RATE).toFixed(2));
  const total = subtotal + serviceFee;

  const durationLabel = DURATION_OPTIONS.find((d) => d.hours === duration)?.label ?? `${duration} horas`;

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--primary)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,168,83,0.15)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--hairline)";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ background: "var(--canvas)", minHeight: "100vh" }}>
        <Nav activePage="search" />
        <main className="flex flex-col items-center justify-center px-6 py-24 text-center">
          <div
            className="mb-6 flex items-center justify-center rounded-full"
            style={{ width: "72px", height: "72px", background: "rgba(212,168,83,0.15)", fontSize: "32px" }}
          >
            🎷
          </div>
          <h1
            className="mb-3 font-bold"
            style={{ fontSize: "28px", color: "var(--ink)" }}
          >
            ¡Solicitud enviada!
          </h1>
          <p className="mb-2 max-w-md" style={{ color: "var(--body)", fontSize: "16px" }}>
            Carlos Mendoza recibirá tu solicitud y te responderá en menos de 2 horas.
          </p>
          <p className="max-w-md text-sm" style={{ color: "var(--muted)" }}>
            No se realizará ningún cobro hasta que el músico confirme la reserva.
          </p>
          <a
            href="/"
            className="mt-8 inline-block rounded-btn px-6 font-semibold text-sm"
            style={{
              height: "48px",
              lineHeight: "48px",
              background: "var(--primary)",
              color: "var(--on-primary)",
              textDecoration: "none",
            }}
          >
            Volver al inicio
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "var(--canvas)", minHeight: "100vh" }}>
      <Nav activePage="search" />

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Page heading */}
        <div className="mb-8">
          <h1
            className="mb-1 font-bold"
            style={{ fontSize: "28px", color: "var(--ink)" }}
          >
            Solicitá tu reserva
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "15px" }}>
            {MUSICIAN.name} · {MUSICIAN.genres[0]} · {MUSICIAN.location}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">

            {/* ── LEFT: Form ── */}
            <div className="flex flex-col gap-8">

              {/* Section 1: Tu evento */}
              <section>
                <p style={sectionHeadingStyle}>1. Tu evento</p>

                {/* Tipo de evento */}
                <div className="mb-4">
                  <label htmlFor="eventType" style={labelStyle}>Tipo de evento</label>
                  <select
                    id="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as EventType)}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                    required
                  >
                    <option value="" disabled>Seleccioná el tipo de evento</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Fecha */}
                <div className="mb-4">
                  <label htmlFor="date" style={labelStyle}>📅 Fecha del evento</label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    style={inputStyle}
                    required
                  />
                </div>

                {/* Hora + Duración */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="time" style={labelStyle}>Hora de inicio</label>
                    <input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" style={labelStyle}>Duración</label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                      style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                      required
                    >
                      {DURATION_OPTIONS.map((d) => (
                        <option key={d.hours} value={d.hours}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dirección */}
                <div>
                  <label htmlFor="address" style={labelStyle}>Dirección del evento</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Ej: Salón Los Pinos, Col. Escalón, San Salvador"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    style={inputStyle}
                    required
                  />
                </div>
              </section>

              {/* Section 2: Detalles adicionales */}
              <section>
                <p style={sectionHeadingStyle}>2. Detalles adicionales</p>

                <div className="mb-4">
                  <label htmlFor="guests" style={labelStyle}>Número aproximado de invitados</label>
                  <input
                    id="guests"
                    type="number"
                    min={1}
                    placeholder="Ej: 80"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>Mensaje al músico</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Contanos sobre tu evento, ambiente esperado, canciones especiales, etc."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    style={{
                      ...inputStyle,
                      height: "auto",
                      padding: "14px 16px",
                      resize: "vertical",
                      lineHeight: "1.6",
                    }}
                  />
                </div>
              </section>

              {/* Section 3: Contacto */}
              <section>
                <p style={sectionHeadingStyle}>3. Contacto</p>

                <div className="mb-4">
                  <label htmlFor="fullName" style={labelStyle}>Nombre completo</label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Tu nombre y apellido"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    style={inputStyle}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" style={labelStyle}>Teléfono</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+503 7000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    style={inputStyle}
                    required
                  />
                </div>
              </section>

              {/* Submit button — visible on mobile only (below form) */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  className="w-full rounded-btn font-semibold text-base transition-colors"
                  style={{
                    height: "52px",
                    background: "var(--primary)",
                    color: "var(--on-primary)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
                  }}
                >
                  Enviar solicitud
                </button>
                <p className="mt-3 text-center text-xs" style={{ color: "var(--muted)" }}>
                  Sin cargos hasta la confirmación · Cancela sin costo 48 hrs antes
                </p>
              </div>
            </div>

            {/* ── RIGHT: Order summary ── */}
            <div className="hidden lg:block">
              <div
                className="sticky top-24 rounded-card p-6"
                style={{
                  background: "var(--canvas)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Musician info */}
                <div className="mb-5 flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div
                    className="shrink-0 rounded-card flex items-center justify-center text-2xl font-bold"
                    style={{
                      width: "64px",
                      height: "64px",
                      background: `linear-gradient(135deg, ${MUSICIAN.avatarColor}55 0%, ${MUSICIAN.avatarColor}22 100%)`,
                      border: `1.5px solid ${MUSICIAN.avatarColor}44`,
                      color: MUSICIAN.avatarColor,
                    }}
                  >
                    🎷
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--ink)", fontSize: "15px" }}>
                      {MUSICIAN.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      {MUSICIAN.genres.join(" · ")}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      📍 {MUSICIAN.location}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--primary)" }}>
                      ★ {MUSICIAN.rating}
                    </p>
                  </div>
                </div>

                <hr style={{ borderColor: "var(--hairline)", margin: "0 0 16px" }} />

                {/* Price breakdown */}
                <div className="mb-2 flex justify-between text-sm">
                  <span style={{ color: "var(--muted)" }}>Servicio</span>
                  <span style={{ color: "var(--body)", fontWeight: 500 }}>
                    {MUSICIAN.genres[0]} · {durationLabel}
                  </span>
                </div>
                <div className="mb-4 flex justify-between text-sm">
                  <span style={{ color: "var(--muted)" }}>Tarifa</span>
                  <span style={{ color: "var(--body)", fontWeight: 500 }}>
                    ${HOURLY_RATE}/hr
                  </span>
                </div>

                <hr style={{ borderColor: "var(--hairline)", margin: "0 0 12px" }} />

                <div className="mb-2 flex justify-between text-sm">
                  <span style={{ color: "var(--muted)" }}>Subtotal</span>
                  <span style={{ color: "var(--body)" }}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="mb-4 flex justify-between text-sm">
                  <span style={{ color: "var(--muted)" }}>Cargo de reserva (14%)</span>
                  <span style={{ color: "var(--body)" }}>${serviceFee.toFixed(2)}</span>
                </div>

                <hr style={{ borderColor: "var(--hairline)", margin: "0 0 12px" }} />

                <div className="mb-1 flex justify-between">
                  <span
                    className="font-bold uppercase tracking-wide"
                    style={{ color: "var(--ink)", fontSize: "13px" }}
                  >
                    TOTAL
                  </span>
                  <span className="font-bold" style={{ color: "var(--ink)", fontSize: "18px" }}>
                    ${total.toFixed(2)}
                  </span>
                </div>

                <p className="mb-5 text-xs" style={{ color: "var(--muted)" }}>
                  El músico recibe ${(total - serviceFee * 0.5).toFixed(0)} · Solo pagás si acepta
                </p>

                {/* CTA */}
                <button
                  type="submit"
                  className="w-full rounded-btn font-semibold text-base transition-colors"
                  style={{
                    height: "52px",
                    background: "var(--primary)",
                    color: "var(--on-primary)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
                  }}
                >
                  Enviar solicitud
                </button>

                <p className="mt-3 text-center text-xs" style={{ color: "var(--muted)" }}>
                  Sin cargos hasta la confirmación · Cancela sin costo 48 hrs antes
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
