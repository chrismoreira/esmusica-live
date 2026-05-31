"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MusicianCard from "@/components/MusicianCard";

/* ── Mock data ───────────────────────────────────────────────── */
const MUSICIANS = [
  {
    name: "Carlos Mendoza",
    genre: "Jazz",
    location: "San Salvador",
    rating: "4.9",
    price: "Desde $120/hr",
    verified: true,
    reviews: 47,
    gradient: "linear-gradient(135deg, #e8d5b7, #d4b896)",
    slug: "carlos-mendoza",
  },
  {
    name: "Marimba Los Altos",
    genre: "Marimba",
    location: "Guatemala City",
    rating: "4.8",
    price: "Desde $200/evento",
    verified: false,
    reviews: 31,
    gradient: "linear-gradient(135deg, #c8dfc8, #a8c8a8)",
    slug: "marimba-los-altos",
  },
  {
    name: "Sofía Rivas",
    genre: "Pop/Acústico",
    location: "Santa Ana",
    rating: "5.0",
    price: "Desde $80/hr",
    verified: true,
    reviews: 62,
    gradient: "linear-gradient(135deg, #e8d0e8, #d4b0d4)",
    slug: "sofia-rivas",
  },
  {
    name: "Grupo Ritmo",
    genre: "Cumbia/Salsa",
    location: "Quetzaltenango",
    rating: "4.7",
    price: "Desde $150/evento",
    verified: false,
    reviews: 28,
    gradient: "linear-gradient(135deg, #ede0cc, #d4c4a8)",
    slug: "grupo-ritmo",
  },
  {
    name: "DJ Marco",
    genre: "Pop/Electrónico",
    location: "San Salvador",
    rating: "4.6",
    price: "Desde $300/evento",
    verified: true,
    reviews: 54,
    gradient: "linear-gradient(135deg, #cce0f0, #a8c8e8)",
    slug: "dj-marco",
  },
  {
    name: "Trío Clásico",
    genre: "Clásico",
    location: "Antigua GT",
    rating: "4.9",
    price: "Desde $250/evento",
    verified: true,
    reviews: 39,
    gradient: "linear-gradient(135deg, #f0e8d8, #ddd0b8)",
    slug: "trio-clasico",
  },
  {
    name: "Banda Vallenata",
    genre: "Vallenato",
    location: "Guatemala City",
    rating: "4.8",
    price: "Desde $400/evento",
    verified: false,
    reviews: 22,
    gradient: "linear-gradient(135deg, #f0d8d8, #ddb8b8)",
    slug: "banda-vallenata",
  },
  {
    name: "Andrea López",
    genre: "Jazz/Bossa",
    location: "San Salvador",
    rating: "4.5",
    price: "Desde $100/hr",
    verified: false,
    reviews: 18,
    gradient: "linear-gradient(135deg, #d8f0e8, #b8ddd0)",
    slug: "andrea-lopez",
  },
  {
    name: "Los Alegres",
    genre: "Cumbia",
    location: "San Miguel SV",
    rating: "4.7",
    price: "Desde $180/evento",
    verified: true,
    reviews: 35,
    gradient: "linear-gradient(135deg, #f0e8d0, #ddd4b0)",
    slug: "los-alegres",
  },
  {
    name: "Cuarteto Lírico",
    genre: "Clásico",
    location: "Quetzaltenango",
    rating: "4.9",
    price: "Desde $300/evento",
    verified: true,
    reviews: 41,
    gradient: "linear-gradient(135deg, #e0d8f0, #c8b8dd)",
    slug: "cuarteto-lirico",
  },
  {
    name: "Salsa Brava",
    genre: "Salsa",
    location: "Guatemala City",
    rating: "4.8",
    price: "Desde $250/evento",
    verified: false,
    reviews: 29,
    gradient: "linear-gradient(135deg, #f0dcc8, #ddc4a8)",
    slug: "salsa-brava",
  },
  {
    name: "Kevin Torres",
    genre: "Guitarra Acústica",
    location: "Santa Ana",
    rating: "4.6",
    price: "Desde $70/hr",
    verified: true,
    reviews: 56,
    gradient: "linear-gradient(135deg, #d8ecd8, #b8d4b8)",
    slug: "kevin-torres",
  },
] as const;

const GENRE_OPTIONS = ["Jazz", "Cumbia", "Salsa", "Marimba", "Pop", "Rock", "Clásico", "Vallenato"];
const CITY_OPTIONS = [
  "San Salvador",
  "Guatemala City",
  "Santa Ana",
  "Quetzaltenango",
  "Antigua",
  "San Miguel",
];
const SORT_OPTIONS = [
  { value: "relevance", label: "Más relevantes" },
  { value: "rating", label: "Mejor calificados" },
  { value: "price_asc", label: "Precio: menor a mayor" },
];

/* ── Component ──────────────────────────────────────────────── */
export default function SearchPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [eventType, setEventType] = useState("Boda, corporativo...");
  const [city, setCity] = useState("San Salvador...");

  /* Toggle helpers */
  const toggleGenre = (g: string) =>
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  const toggleCity = (c: string) =>
    setSelectedCities((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  /* Active filter pills */
  type FilterPill = { label: string; onRemove: () => void };
  const activePills: FilterPill[] = [
    ...selectedGenres.map((g) => ({ label: g, onRemove: () => toggleGenre(g) })),
    ...selectedCities.map((c) => ({ label: c, onRemove: () => toggleCity(c) })),
    ...(maxPrice < 500
      ? [{ label: `Hasta $${maxPrice}`, onRemove: () => setMaxPrice(500) }]
      : []),
    ...(minRating !== null
      ? [{ label: `★ ${minRating}+`, onRemove: () => setMinRating(null) }]
      : []),
    ...(verifiedOnly
      ? [{ label: "Verificado", onRemove: () => setVerifiedOnly(false) }]
      : []),
  ];

  const clearAll = () => {
    setSelectedGenres([]);
    setSelectedCities([]);
    setMaxPrice(500);
    setMinRating(null);
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--canvas)", color: "var(--ink)" }}>
      <Nav activePage="search" />

      <main>
        {/* ── Search bar strip ─────────────────────────────────── */}
        <div
          className="px-6 py-4"
          style={{ borderBottom: "1px solid var(--hairline)", background: "var(--canvas)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div
              className="flex items-center overflow-hidden"
              style={{
                background: "var(--canvas)",
                border: "1px solid var(--hairline)",
                borderRadius: "9999px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                height: "52px",
                maxWidth: "600px",
              }}
            >
              {/* Segment 1 */}
              <div className="flex flex-1 flex-col justify-center px-4 text-left">
                <span
                  className="block leading-none"
                  style={{ fontSize: "10px", fontWeight: 700, color: "var(--ink)", letterSpacing: "0.02em" }}
                >
                  Tipo de evento
                </span>
                <input
                  type="text"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="mt-0.5 w-full bg-transparent outline-none"
                  style={{ color: "var(--muted)", fontSize: "13px" }}
                />
              </div>

              {/* Divider */}
              <div className="h-7 w-px flex-shrink-0" style={{ background: "var(--hairline)" }} aria-hidden />

              {/* Segment 2 */}
              <div className="flex flex-1 flex-col justify-center px-4 text-left">
                <span
                  className="block leading-none"
                  style={{ fontSize: "10px", fontWeight: 700, color: "var(--ink)", letterSpacing: "0.02em" }}
                >
                  Ciudad
                </span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-0.5 w-full bg-transparent outline-none"
                  style={{ color: "var(--muted)", fontSize: "13px" }}
                />
              </div>

              {/* Search button */}
              <div className="flex-shrink-0 pr-1.5">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-base transition-all duration-150"
                  style={{
                    background: "var(--primary)",
                    color: "var(--on-primary)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
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
        </div>

        {/* ── Main content area ────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex gap-8">
            {/* ── Filter sidebar (md+) ─────────────────────────── */}
            <aside
              className="hidden md:block"
              style={{ width: "256px", flexShrink: 0 }}
            >
              {/* Filters header */}
              <div className="mb-5 flex items-center justify-between">
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)" }}>
                  Filtros
                </span>
                {activePills.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-sm font-medium transition-colors"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--primary)",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--primary-hover)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)"; }}
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* 1. Género */}
              <div className="py-4" style={{ borderBottom: "1px solid var(--hairline-soft)" }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "10px" }}>
                  Género
                </p>
                <div className="flex flex-col gap-2.5">
                  {GENRE_OPTIONS.map((g) => (
                    <label
                      key={g}
                      className="flex cursor-pointer items-center gap-2.5"
                      style={{ fontSize: "14px", color: "var(--body)" }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(g)}
                        onChange={() => toggleGenre(g)}
                        className="cursor-pointer"
                        style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Ciudad */}
              <div className="py-4" style={{ borderBottom: "1px solid var(--hairline-soft)" }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "10px" }}>
                  Ciudad
                </p>
                <div className="flex flex-col gap-2.5">
                  {CITY_OPTIONS.map((c) => (
                    <label
                      key={c}
                      className="flex cursor-pointer items-center gap-2.5"
                      style={{ fontSize: "14px", color: "var(--body)" }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(c)}
                        onChange={() => toggleCity(c)}
                        className="cursor-pointer"
                        style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Precio por evento */}
              <div className="py-4" style={{ borderBottom: "1px solid var(--hairline-soft)" }}>
                <div className="mb-3 flex items-center justify-between">
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
                    Precio por evento
                  </p>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--primary)" }}>
                    Hasta ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: "var(--primary)" }}
                />
                <div className="mt-1 flex justify-between">
                  <span style={{ fontSize: "12px", color: "var(--muted-soft)" }}>$50</span>
                  <span style={{ fontSize: "12px", color: "var(--muted-soft)" }}>$500+</span>
                </div>
              </div>

              {/* 4. Rating mínimo */}
              <div className="py-4" style={{ borderBottom: "1px solid var(--hairline-soft)" }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "10px" }}>
                  Rating mínimo
                </p>
                <div className="flex gap-2">
                  {[4, 4.5, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(minRating === r ? null : r)}
                      className="flex items-center gap-1 rounded-pill px-3 py-1.5 text-sm font-medium transition-all duration-150"
                      style={{
                        border: `1px solid ${minRating === r ? "var(--primary)" : "var(--hairline)"}`,
                        background: minRating === r ? "var(--primary)" : "var(--canvas)",
                        color: minRating === r ? "var(--on-primary)" : "var(--body)",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      ★ {r}+
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Verificado */}
              <div className="py-4">
                <label
                  className="flex cursor-pointer items-center gap-2.5"
                  style={{ fontSize: "14px", color: "var(--body)", fontWeight: 500 }}
                >
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="cursor-pointer"
                    style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                  />
                  Solo músicos verificados
                </label>
              </div>
            </aside>

            {/* ── Results area ─────────────────────────────────── */}
            <div className="min-w-0 flex-1">
              {/* Results header */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p style={{ fontSize: "14px", color: "var(--muted)" }}>
                  <span style={{ fontWeight: 600, color: "var(--ink)" }}>32</span> músicos encontrados
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-btn border px-3 py-1.5 text-sm"
                  style={{
                    borderColor: "var(--hairline)",
                    color: "var(--ink)",
                    background: "var(--canvas)",
                    fontSize: "13px",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active filter pills */}
              {activePills.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {activePills.map((pill) => (
                    <button
                      key={pill.label}
                      onClick={pill.onRemove}
                      className="flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-sm font-medium transition-all duration-150"
                      style={{
                        background: "var(--primary)",
                        color: "var(--on-primary)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
                      }}
                    >
                      {pill.label}
                      <span style={{ fontSize: "15px", lineHeight: 1 }}>×</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Results grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {MUSICIANS.map((musician) => (
                  <MusicianCard key={musician.slug} {...musician} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
