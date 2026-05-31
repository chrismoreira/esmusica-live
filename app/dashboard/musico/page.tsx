"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const NAV_ITEMS = [
  { icon: "🏠", label: "Inicio", key: "inicio" },
  { icon: "📋", label: "Solicitudes", key: "solicitudes", badge: "3" },
  { icon: "📅", label: "Calendario", key: "calendario" },
  { icon: "💰", label: "Ingresos", key: "ingresos" },
  { icon: "⭐", label: "Reseñas", key: "resenas" },
  { icon: "👤", label: "Mi perfil", key: "perfil" },
  { icon: "⚙️", label: "Configuración", key: "config" },
];

type RequestStatus = "pendiente" | "confirmado" | "cancelado";

interface BookingRequest {
  id: number;
  clientAvatar: string;
  clientName: string;
  eventType: string;
  date: string;
  location: string;
  amount: string;
  status: RequestStatus;
}

const REQUESTS: BookingRequest[] = [
  {
    id: 1,
    clientAvatar: "#7C9FF5",
    clientName: "María García",
    eventType: "Boda",
    date: "15 jun 2025",
    location: "San Salvador",
    amount: "$360",
    status: "pendiente",
  },
  {
    id: 2,
    clientAvatar: "#F59E7C",
    clientName: "Pedro López",
    eventType: "Corporativo",
    date: "20 jun 2025",
    location: "Guatemala City",
    amount: "$480",
    status: "pendiente",
  },
  {
    id: 3,
    clientAvatar: "#7CF5B0",
    clientName: "Ana Martínez",
    eventType: "Quinceañera",
    date: "22 jun 2025",
    location: "Santa Ana",
    amount: "$320",
    status: "confirmado",
  },
];

const UPCOMING_EVENTS = [
  {
    id: 1,
    day: "15",
    month: "JUN",
    name: "Boda García-López",
    location: "Hacienda El Carmen, San Salvador",
    time: "18:00 – 23:00",
    amount: "$360",
  },
  {
    id: 2,
    day: "20",
    month: "JUN",
    name: "Evento Corporativo Avianca",
    location: "Hotel Real InterContinental, Guatemala City",
    time: "19:00 – 22:00",
    amount: "$480",
  },
];

const STATUS_CONFIG: Record<RequestStatus, { label: string; bg: string; color: string }> = {
  pendiente:   { label: "Pendiente",   bg: "rgba(212,168,83,0.12)",  color: "var(--primary)" },
  confirmado:  { label: "Confirmado",  bg: "rgba(34,197,94,0.12)",   color: "#16a34a" },
  cancelado:   { label: "Cancelado",   bg: "rgba(239,68,68,0.12)",   color: "#dc2626" },
};

export default function MusicoDashboard() {
  const [activeNav, setActiveNav] = useState("inicio");

  const smallBtnBase = {
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600 as const,
    cursor: "pointer",
    border: "none",
  };

  return (
    <>
      <Nav activePage="dashboard" />

      <div style={{ minHeight: "calc(100vh - 80px)", background: "var(--surface-soft)" }}>
        <div className="max-w-7xl mx-auto flex">
          {/* Sidebar */}
          <aside
            className="hidden md:block"
            style={{
              width: "224px",
              flexShrink: 0,
              background: "var(--canvas)",
              borderRight: "1px solid var(--hairline)",
              minHeight: "calc(100vh - 80px)",
              padding: "32px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Avatar + name */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                CM
              </div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)", margin: 0 }}>Carlos Mendoza</p>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  background: "rgba(212,168,83,0.12)",
                  color: "var(--primary)",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Músico verificado
              </span>
            </div>

            {/* Nav items */}
            <nav style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeNav === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveNav(item.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      height: "40px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: "none",
                      background: isActive ? "rgba(212,168,83,0.12)" : "transparent",
                      color: isActive ? "var(--primary)" : "var(--muted)",
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 400,
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          marginLeft: "auto",
                          background: "var(--primary)",
                          color: "white",
                          borderRadius: "9999px",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "1px 7px",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Profile link */}
            <div style={{ marginTop: "auto", paddingTop: "24px" }}>
              <a
                href="/musicos/carlos-mendoza"
                style={{
                  fontSize: "13px",
                  color: "var(--primary)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Ver mi perfil →
              </a>
            </div>
          </aside>

          {/* Main content */}
          <main style={{ flex: 1, padding: "32px" }}>
            {/* Welcome header */}
            <div style={{ marginBottom: "28px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--ink)", margin: "0 0 4px 0" }}>
                Hola, Carlos 👋
              </h1>
              <p style={{ fontSize: "16px", color: "var(--muted)", margin: 0 }}>
                Viernes 30 de mayo, 2025
              </p>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {[
                { icon: "📋", label: "Solicitudes pendientes", value: "3", badge: "Nuevo" },
                { icon: "✅", label: "Bookings confirmados este mes", value: "8" },
                { icon: "💰", label: "Ingresos este mes", value: "$1,240" },
                { icon: "⭐", label: "Rating promedio", value: "4.9" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--canvas)",
                    borderRadius: "14px",
                    boxShadow: "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px",
                    padding: "24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "20px" }}>{stat.icon}</span>
                    {stat.badge && (
                      <span
                        style={{
                          background: "rgba(212,168,83,0.12)",
                          color: "var(--primary)",
                          borderRadius: "9999px",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                        }}
                      >
                        {stat.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "32px", fontWeight: 700, color: "var(--ink)", margin: "0 0 4px 0" }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Solicitudes recientes */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                  Solicitudes recientes
                </h2>
                <a href="#" style={{ fontSize: "14px", color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>
                  Ver todas →
                </a>
              </div>

              <div
                style={{
                  background: "var(--canvas)",
                  borderRadius: "14px",
                  boxShadow: "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px",
                  overflow: "hidden",
                }}
              >
                {REQUESTS.map((req, index) => {
                  const statusCfg = STATUS_CONFIG[req.status];
                  return (
                    <div
                      key={req.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "16px 20px",
                        borderBottom: index < REQUESTS.length - 1 ? "1px solid var(--hairline)" : "none",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Avatar */}
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: req.clientAvatar,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {req.clientName.charAt(0)}
                      </div>

                      {/* Name + event */}
                      <div style={{ flex: "1 1 150px", minWidth: 0 }}>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)", margin: "0 0 2px 0" }}>
                          {req.clientName}
                        </p>
                        <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
                          {req.eventType} · {req.date}
                        </p>
                      </div>

                      {/* Location */}
                      <p style={{ fontSize: "13px", color: "var(--muted)", flex: "1 1 120px", minWidth: 0, margin: 0 }}>
                        📍 {req.location}
                      </p>

                      {/* Amount */}
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--primary)", margin: 0, flexShrink: 0 }}>
                        {req.amount}
                      </p>

                      {/* Status badge */}
                      <span
                        style={{
                          padding: "4px 10px",
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

                      {/* Actions */}
                      {req.status === "pendiente" && (
                        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                          <button
                            style={{
                              ...smallBtnBase,
                              background: "var(--primary)",
                              color: "white",
                            }}
                          >
                            Aceptar
                          </button>
                          <button
                            style={{
                              ...smallBtnBase,
                              background: "transparent",
                              color: "var(--muted)",
                              border: "1px solid var(--hairline)",
                            }}
                          >
                            Rechazar
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Próximos eventos */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                  Próximos eventos
                </h2>
                <a href="#" style={{ fontSize: "14px", color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>
                  Ver calendario →
                </a>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {UPCOMING_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    style={{
                      background: "var(--canvas)",
                      borderRadius: "14px",
                      border: "1px solid var(--hairline)",
                      padding: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    {/* Date column */}
                    <div
                      style={{
                        textAlign: "center",
                        flexShrink: 0,
                        width: "56px",
                        padding: "10px",
                        background: "rgba(212,168,83,0.08)",
                        borderRadius: "10px",
                      }}
                    >
                      <p style={{ fontSize: "28px", fontWeight: 700, color: "var(--primary)", margin: 0, lineHeight: 1 }}>
                        {event.day}
                      </p>
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)", margin: "4px 0 0 0", textTransform: "uppercase" }}>
                        {event.month}
                      </p>
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px 0" }}>
                        {event.name}
                      </p>
                      <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 2px 0" }}>
                        📍 {event.location}
                      </p>
                      <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
                        🕐 {event.time}
                      </p>
                    </div>

                    {/* Amount + link */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--primary)", margin: "0 0 6px 0" }}>
                        {event.amount}
                      </p>
                      <a
                        href="#"
                        style={{ fontSize: "13px", color: "var(--muted)", textDecoration: "none" }}
                      >
                        Ver detalles →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
