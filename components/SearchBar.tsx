// TODO: Conectar a /api/search/suggestions cuando la DB esté lista
// Por ahora las sugerencias son locales. El endpoint recibirá { q: string }
// y retornará { genres: string[], cities: string[], eventTypes: string[] }

"use client";

import { useState, useEffect, useRef } from "react";

const GENRES = [
  "Jazz", "Cumbia", "Salsa", "Marimba", "Pop", "Rock",
  "Baladas", "Tropical", "Reggaeton", "Mariachi", "Vals", "Bolero",
];

const CITIES = [
  "San Salvador", "Santa Ana", "Sonsonate",
  "Guatemala City", "Antigua Guatemala", "Quetzaltenango",
  "Escuintla", "Mixco",
];

const EVENT_TYPES = [
  "Boda", "Quinceañera", "Aniversario", "Cumpleaños",
  "Evento corporativo", "Ceremonia", "Graduación", "Fiesta privada",
];

const PLACEHOLDERS = [
  "Jazz para una boda en San Salvador...",
  "Marimba para quinceañera en Guatemala...",
  "Grupo de salsa para evento corporativo...",
  "Músico acústico para aniversario...",
];

const DEFAULT_COUNT = 3;
const FILTERED_COUNT = 4;

function filterItems(items: string[], query: string, max: number): string[] {
  if (!query.trim()) return items.slice(0, DEFAULT_COUNT);
  return items
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, max);
}

interface SuggestionGroupProps {
  icon: string;
  label: string;
  items: string[];
  onSelect: (value: string) => void;
}

function SuggestionGroup({ icon, label, items, onSelect }: SuggestionGroupProps) {
  if (items.length === 0) return null;
  return (
    <div>
      <div
        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-text-muted)" }}
      >
        {icon} {label}
      </div>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onMouseDown={(e) => {
            // Prevent blur before click registers
            e.preventDefault();
            onSelect(item);
          }}
          className="w-full px-4 py-2.5 text-left text-sm transition-colors"
          style={{ color: "var(--color-text)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--color-border)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate placeholders every 3 seconds with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFadingOut(true);
      setTimeout(() => {
        setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
        setFadingOut(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasQuery = query.trim().length > 0;

  const suggestedGenres = filterItems(GENRES, query, hasQuery ? FILTERED_COUNT : DEFAULT_COUNT);
  const suggestedCities = filterItems(CITIES, query, hasQuery ? FILTERED_COUNT : DEFAULT_COUNT);
  const suggestedEvents = filterItems(EVENT_TYPES, query, hasQuery ? FILTERED_COUNT : DEFAULT_COUNT);

  const hasAnySuggestions =
    suggestedGenres.length > 0 ||
    suggestedCities.length > 0 ||
    suggestedEvents.length > 0;

  function handleSelect(value: string) {
    setQuery(value);
    setShowDropdown(false);
    inputRef.current?.focus();
  }

  function handleSearch() {
    const q = query.trim();
    if (!q) return;
    window.location.href = `/search?q=${encodeURIComponent(q)}`;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }

  return (
    <div ref={containerRef} className="relative mx-auto mt-10 max-w-3xl">
      {/* ── Pill container ── */}
      <div
        className="flex flex-col overflow-visible rounded-2xl border sm:flex-row sm:items-stretch sm:rounded-full"
        style={{
          background: "var(--color-surface)",
          borderColor: showDropdown ? "var(--color-accent)" : "var(--color-border)",
          transition: "border-color 0.15s ease",
        }}
      >
        {/* Input */}
        <div className="relative flex flex-1 items-center px-5 py-4">
          {/* Search icon */}
          <svg
            className="mr-3 shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--color-text-muted)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <div className="relative flex-1">
            {/* Animated placeholder (shown only when input is empty) */}
            {!query && (
              <span
                className="pointer-events-none absolute inset-0 flex items-center text-sm select-none"
                style={{
                  color: "var(--color-text-muted)",
                  opacity: fadingOut ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                {PLACEHOLDERS[placeholderIndex]}
              </span>
            )}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: "var(--color-text)" }}
              aria-label="Buscar músicos"
              aria-autocomplete="list"
              aria-expanded={showDropdown}
              autoComplete="off"
            />
          </div>

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="ml-2 shrink-0 rounded-full p-1 transition-colors"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="Limpiar búsqueda"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Buscar button */}
        <div className="flex items-center px-3 py-3 sm:py-2">
          <button
            type="button"
            onClick={handleSearch}
            className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-opacity sm:w-auto"
            style={{
              background: "var(--color-accent)",
              color: "#0A0A0F",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Buscar</span>
          </button>
        </div>
      </div>

      {/* ── Dropdown ── */}
      {showDropdown && hasAnySuggestions && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden py-2"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
          }}
          role="listbox"
          aria-label="Sugerencias de búsqueda"
        >
          <SuggestionGroup
            icon="🎵"
            label="Géneros"
            items={suggestedGenres}
            onSelect={handleSelect}
          />

          {suggestedGenres.length > 0 && suggestedCities.length > 0 && (
            <div
              className="mx-4 my-1.5 h-px"
              style={{ background: "var(--color-border)" }}
            />
          )}

          <SuggestionGroup
            icon="📍"
            label="Ciudades"
            items={suggestedCities}
            onSelect={handleSelect}
          />

          {suggestedCities.length > 0 && suggestedEvents.length > 0 && (
            <div
              className="mx-4 my-1.5 h-px"
              style={{ background: "var(--color-border)" }}
            />
          )}

          <SuggestionGroup
            icon="🎉"
            label="Tipo de evento"
            items={suggestedEvents}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}
