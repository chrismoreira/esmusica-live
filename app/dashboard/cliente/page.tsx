"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type TabKey = "activas" | "pasadas" | "canceladas";

const TABS: { key: TabKey; label: string }[] = [
  { key: "activas", label: "Activas" },
  { key: "pasadas", label: "Pasadas" },
  { key: "canceladas", label: "Canceladas" },
];

type BookingStatus = "confirmado" | "en_espera";

interface Booking {
  id: number;
  musicianName: string;
  genre: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  eventType: string;
  address: string;
  amount: string;
  status: BookingStatus;
  avatarGradient: string;
}

const ACTIVE_BOOKINGS: Booking[] = [
  {
    id: 1,
    musicianName: "Carlos Mendoza",
    genre: "Jazz",
    location: "San Salvador",
    date: "15 jun 2025",
    time: "18:00",
    duration: "4 horas",
    eventType: "Boda",
    address: "Hacienda El Carmen, San Salvador",
    amount: "$410",
    status: "confirmado",
    avatarGradient: "linear-gradient(135deg, #D4A853 0%, #c49640 100%)",
  },
  {
    id: 2,
    musicianName: "Sofía Rivas",
    genre: "Pop",
    location: "Santa Ana",
    date: "28 jun 2025",
    time: "16:00",
    duration: "3 horas",
    eventType: "Quinceañera",
    address: "Salón Paraíso, Santa Ana",
    amount: "$295",
    status: "en_espera",
    avatarGradient: "linear-gradient(135deg, #7C9FF5 0%, #5b7de8 100%)",
  },
];

const STATUS_CONFIG: Record<BookingStatus, { label: string; bg: string; color: string }> = {
  confirmado: { label: "Confirmado",               bg: "rgba(34,197,94,0.12)",  color: "#16a34a" },
  en_espera:  { label: "En espera de confirmación", bg: "rgba(212,168,83,0.12)", color: "var(--primary)" },
};

export default function ClienteDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>("activas");

  return (
    <>
      <Nav activePage="dashboard" />

      <div style={{ minHeight: "calc(100vh - 80px)", background: "var(--surface-soft)" }}>
        <div style={{ maxWidth: "896px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "28px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--ink)", margin: "0 0 4px 0" }}>
                Mis reservas
              </h1>
              <p style={{ fontSize: "16px", color: "var(--muted)", margin: 0 }}>
                Hola, María 👋
              </p>
            </div>
            <a
              href="/search"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "12px 22px",
                background: "var(--primary)",
                color: "var(--on-primary)",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary-hover)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary)"; }}
            >
              Buscar músicos
            </a>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: "0",
              borderBottom: "1px solid var(--hairline)",
              marginBottom: "24px",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "10px 20px",
                    background: "none",
                    border: "none",
                    borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                    color: isActive ? "var(--ink)" : "var(--muted)",
                    fontSize: "15px",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    marginBottom: "-1px",
                    transition: "color 0.15s ease",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          {activeTab === "activas" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {ACTIVE_BOOKINGS.map((booking) => {
                const statusCfg = STATUS_CONFIG[booking.status];
                const isConfirmed = booking.status === "confirmado";

                return (
                  <div
                    key={booking.id}
                    style={{
                      background: "var(--canvas)",
                      borderRadius: "14px",
                      boxShadow: "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px",
                      overflow: "hidden",
                      display: "flex",
                    }}
                  >
                    {/* Amber left border for confirmed */}
                    {isConfirmed && (
                      <div
                        style={{
                          width: "4px",
                          background: "var(--primary)",
                          flexShrink: 0,
                          borderRadius: "14px 0 0 14px",
                        }}
                      />
                    )}

                    <div style={{ padding: "24px", flex: 1, display: "flex", gap: "20px", flexWrap: "wrap" }}>
                      {/* Musician photo placeholder */}
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "14px",
                          background: booking.avatarGradient,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "28px",
                        }}
                      >
                        🎵
                      </div>

                      {/* Main content */}
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        {/* Musician name + status */}
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <div>
                            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink)", margin: "0 0 2px 0" }}>
                              {booking.musicianName}
                            </h3>
                            <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
                              {booking.genre} · {booking.location}
                            </p>
                          </div>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "9999px",
                              background: statusCfg.bg,
                              color: statusCfg.color,
                              fontSize: "12px",
                              fontWeight: 600,
                              flexShrink: 0,
                            }}
                          >
                            {statusCfg.label}
                          </span>
                        </div>

                        {/* Event details */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                            gap: "6px 16px",
                            marginBottom: "16px",
                          }}
                        >
                          {[
                            { icon: "📅", text: `${booking.date}, ${booking.time}` },
                            { icon: "⏱", text: booking.duration },
                            { icon: "🎉", text: booking.eventType },
                            { icon: "📍", text: booking.address },
                          ].map((detail, i) => (
                            <p key={i} style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
                              <span style={{ marginRight: "4px" }}>{detail.icon}</span>
                              {detail.text}
                            </p>
                          ))}
                        </div>

                        {/* Bottom row: amount + actions */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                          <p style={{ fontSize: "20px", fontWeight: 700, color: "var(--primary)", margin: 0 }}>
                            {booking.amount} <span style={{ fontSize: "13px", fontWeight: 400, color: "var(--muted)" }}>total pagado</span>
                          </p>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <a
                              href="#"
                              style={{
                                padding: "8px 18px",
                                borderRadius: "8px",
                                background: "var(--primary)",
                                color: "white",
                                fontSize: "13px",
                                fontWeight: 600,
                                textDecoration: "none",
                              }}
                            >
                              Ver detalles
                            </a>
                            <a
                              href="#"
                              style={{
                                padding: "8px 18px",
                                borderRadius: "8px",
                                border: "1px solid var(--hairline)",
                                color: "var(--ink)",
                                fontSize: "13px",
                                fontWeight: 500,
                                textDecoration: "none",
                                background: "var(--canvas)",
                              }}
                            >
                              Contactar
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state for other tabs */}
          {(activeTab === "pasadas" || activeTab === "canceladas") && (
            <div
              style={{
                textAlign: "center",
                padding: "72px 24px",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎵</div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" }}>
                {activeTab === "pasadas"
                  ? "Aún no tenés reservas pasadas"
                  : "No tenés reservas canceladas"}
              </h3>
              <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "28px" }}>
                Explorá músicos para tu próximo evento
              </p>
              <a
                href="/search"
                style={{
                  display: "inline-block",
                  padding: "13px 28px",
                  background: "var(--primary)",
                  color: "var(--on-primary)",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Buscar músicos
              </a>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
