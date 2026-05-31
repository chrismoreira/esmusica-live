"use client";

import { useState } from "react";

const NAV_TABS = ["Bodas", "Quinceañeras", "Corporativos", "Privados"] as const;

interface NavProps {
  activePage?: "search" | "home" | "dashboard" | "auth";
}

export default function Nav({ activePage = "home" }: NavProps) {
  const [activeTab, setActiveTab] = useState<string>("Bodas");

  return (
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
        <a href="/">
          <img src="/logo.png" alt="esmusica.live" className="h-9 w-auto" />
        </a>

        {/* Center navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Navegación principal">
          {activePage === "home" ? (
            // Event-type tabs for home page
            NAV_TABS.map((tab) => (
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
            ))
          ) : (
            // Simple links for other pages
            <>
              <a
                href="/search"
                className="relative pb-1 text-sm font-medium transition-colors"
                style={{
                  color: activePage === "search" ? "var(--ink)" : "var(--muted)",
                  textDecoration: "none",
                }}
              >
                Explorar músicos
                {activePage === "search" && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </a>
              <a
                href="#"
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--muted)", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
              >
                Cómo funciona
              </a>
            </>
          )}
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="/auth/login"
            className="hidden rounded-lg border px-4 py-2 text-sm font-semibold transition-colors sm:block"
            style={{
              borderColor: "var(--hairline)",
              color: "var(--ink)",
              background: "var(--canvas)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--hairline)";
            }}
          >
            Soy músico
          </a>
          <a
            href="/auth/registro"
            className="text-sm font-medium"
            style={{ color: "var(--ink)", textDecoration: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
          >
            Ingresá
          </a>
        </div>
      </div>
    </header>
  );
}
