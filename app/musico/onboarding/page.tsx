"use client";

import { useState } from "react";

const GENRES = [
  "Jazz", "Cumbia", "Salsa", "Marimba", "Pop", "Rock",
  "Clásico", "Vallenato", "Romántico", "Balada", "Reggaeton", "Electrónico",
];

const CITIES = [
  "San Salvador", "Guatemala City", "Santa Ana", "Quetzaltenango",
  "Antigua GT", "San Miguel", "Santa Rosa", "Escuintla", "Mixco", "Villa Nueva",
];

const COUNTRIES = ["El Salvador", "Guatemala"];

type Service = { name: string; price: string };

const DEFAULT_SERVICES: Service[] = [
  { name: "1 hora (mínimo)", price: "" },
  { name: "2–3 horas", price: "" },
  { name: "Evento completo (4+ hrs)", price: "" },
];

// --- Step components ---

function Step1({
  artisticName, setArtisticName,
  bio, setBio,
  experience, setExperience,
}: {
  artisticName: string; setArtisticName: (v: string) => void;
  bio: string; setBio: (v: string) => void;
  experience: string; setExperience: (v: string) => void;
}) {
  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>
        Contanos sobre vos
      </h2>
      <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "32px" }}>
        Así te conocerán tus futuros clientes.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Artistic name */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
            Nombre artístico *
          </label>
          <input
            type="text"
            required
            placeholder="Ej: Carlos Mendoza"
            value={artisticName}
            onChange={(e) => setArtisticName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid var(--hairline)",
              borderRadius: "8px",
              fontSize: "15px",
              color: "var(--ink)",
              background: "var(--canvas)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Photo upload */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "10px" }}>
            Foto de perfil
          </label>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                border: "2px dashed var(--hairline)",
                background: "var(--surface-soft)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "28px" }}>📷</span>
              <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 500 }}>Subir foto</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
            Bio corta
          </label>
          <textarea
            rows={4}
            placeholder="Describí tu estilo y experiencia en pocas palabras..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid var(--hairline)",
              borderRadius: "8px",
              fontSize: "15px",
              color: "var(--ink)",
              background: "var(--canvas)",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Experience */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
            Años de experiencia
          </label>
          <input
            type="number"
            placeholder="Ej: 8"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            style={{
              width: "160px",
              padding: "10px 14px",
              border: "1px solid var(--hairline)",
              borderRadius: "8px",
              fontSize: "15px",
              color: "var(--ink)",
              background: "var(--canvas)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Step2({
  selectedGenres, setSelectedGenres,
  customGenre, setCustomGenre,
}: {
  selectedGenres: string[]; setSelectedGenres: (v: string[]) => void;
  customGenre: string; setCustomGenre: (v: string) => void;
}) {
  const toggle = (genre: string) => {
    setSelectedGenres(
      selectedGenres.includes(genre)
        ? selectedGenres.filter((g) => g !== genre)
        : [...selectedGenres, genre]
    );
  };

  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>
        ¿Qué música tocás?
      </h2>
      <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "24px" }}>
        Seleccioná todos los que apliquen.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
        {GENRES.map((genre) => {
          const selected = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => toggle(genre)}
              style={{
                padding: "8px 16px",
                borderRadius: "9999px",
                border: selected ? "none" : "1px solid var(--hairline)",
                background: selected ? "var(--primary)" : "var(--canvas)",
                color: selected ? "var(--on-primary)" : "var(--ink)",
                fontSize: "14px",
                fontWeight: selected ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {genre}
            </button>
          );
        })}
      </div>

      <div>
        <label style={{ display: "block", fontSize: "13px", color: "var(--muted)", marginBottom: "8px" }}>
          ¿No encontrás tu género? Escribilo:
        </label>
        <input
          type="text"
          placeholder="Ej: Flamenco, Folk..."
          value={customGenre}
          onChange={(e) => setCustomGenre(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1px solid var(--hairline)",
            borderRadius: "8px",
            fontSize: "15px",
            color: "var(--ink)",
            background: "var(--canvas)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}

function Step3({
  city, setCity,
  country, setCountry,
  travels, setTravels,
  coverage, setCoverage,
}: {
  city: string; setCity: (v: string) => void;
  country: string; setCountry: (v: string) => void;
  travels: boolean | null; setTravels: (v: boolean) => void;
  coverage: string; setCoverage: (v: string) => void;
}) {
  const selectStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid var(--hairline)",
    borderRadius: "8px",
    fontSize: "15px",
    color: "var(--ink)",
    background: "var(--canvas)",
    outline: "none",
    appearance: "none" as const,
    boxSizing: "border-box" as const,
    cursor: "pointer",
  };

  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>
        ¿Dónde tocás?
      </h2>
      <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "28px" }}>
        Tu ubicación principal para que los clientes puedan encontrarte.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* City */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
            Ciudad principal
          </label>
          <select value={city} onChange={(e) => setCity(e.target.value)} style={selectStyle}>
            <option value="">Seleccioná tu ciudad</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Country */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
            País
          </label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} style={selectStyle}>
            <option value="">Seleccioná tu país</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Travels toggle */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "10px" }}>
            ¿Viajás a otras ciudades?
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => setTravels(val)}
                style={{
                  padding: "9px 24px",
                  borderRadius: "8px",
                  border: travels === val ? "2px solid var(--primary)" : "1px solid var(--hairline)",
                  background: travels === val ? "rgba(212,168,83,0.08)" : "var(--canvas)",
                  color: travels === val ? "var(--primary)" : "var(--muted)",
                  fontSize: "14px",
                  fontWeight: travels === val ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {val ? "Sí" : "No"}
              </button>
            ))}
          </div>
        </div>

        {/* Coverage — only if travels */}
        {travels === true && (
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
              Zona de cobertura
            </label>
            <textarea
              rows={3}
              placeholder="Ej: Toda la zona central de El Salvador"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid var(--hairline)",
                borderRadius: "8px",
                fontSize: "15px",
                color: "var(--ink)",
                background: "var(--canvas)",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Step4({
  services, setServices,
}: {
  services: Service[]; setServices: (v: Service[]) => void;
}) {
  const update = (index: number, field: keyof Service, value: string) => {
    setServices(services.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };
  const remove = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };
  const add = () => {
    setServices([...services, { name: "", price: "" }]);
  };

  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>
        ¿Cómo cobrás?
      </h2>
      <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "28px" }}>
        Podés cambiar los precios después.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
        {services.map((svc, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Nombre del servicio"
              value={svc.name}
              onChange={(e) => update(i, "name", e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid var(--hairline)",
                borderRadius: "8px",
                fontSize: "14px",
                color: "var(--ink)",
                background: "var(--canvas)",
                outline: "none",
              }}
            />
            <div style={{ position: "relative", width: "120px" }}>
              <span style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
                fontSize: "14px",
              }}>$</span>
              <input
                type="number"
                placeholder="0"
                value={svc.price}
                onChange={(e) => update(i, "price", e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 24px",
                  border: "1px solid var(--hairline)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "var(--ink)",
                  background: "var(--canvas)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              onClick={() => remove(i)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid var(--hairline)",
                background: "var(--canvas)",
                color: "var(--muted)",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        style={{
          background: "none",
          border: "none",
          color: "var(--primary)",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
          padding: "4px 0",
          marginBottom: "24px",
        }}
      >
        + Añadir otro servicio
      </button>

      <div
        style={{
          padding: "12px 14px",
          background: "rgba(212,168,83,0.08)",
          border: "1px solid rgba(212,168,83,0.2)",
          borderRadius: "8px",
          fontSize: "13px",
          color: "var(--muted)",
        }}
      >
        💡 El 3% de comisión se descuenta cuando completás un evento
      </div>
    </div>
  );
}

function Step5({ onComplete }: { onComplete: () => void }) {
  const [videoLink, setVideoLink] = useState("");

  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>
        Mostrá tu trabajo
      </h2>
      <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "28px" }}>
        Los perfiles con fotos y video reciben 3× más solicitudes.
      </p>

      {/* Photos */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "10px" }}>Fotos</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "8px" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                border: "2px dashed var(--hairline)",
                borderRadius: "14px",
                background: "var(--surface-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "24px",
              }}
            >
              📷
            </div>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>Subí hasta 6 fotos de tus presentaciones</p>
      </div>

      {/* Video */}
      <div>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "10px" }}>Video demo</p>
        <div
          style={{
            aspectRatio: "16/9",
            border: "2px dashed var(--hairline)",
            borderRadius: "14px",
            background: "var(--surface-soft)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <span style={{ fontSize: "36px" }}>🎬</span>
          <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}>Subí un video de hasta 3 minutos</p>
        </div>

        <p style={{ fontSize: "13px", color: "var(--muted)", textAlign: "center", marginBottom: "8px" }}>
          O pegá un link de YouTube/Vimeo
        </p>
        <input
          type="url"
          placeholder="https://youtube.com/..."
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1px solid var(--hairline)",
            borderRadius: "8px",
            fontSize: "15px",
            color: "var(--ink)",
            background: "var(--canvas)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}

function CompletionScreen() {
  return (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginBottom: "12px" }}>
        ¡Tu perfil está listo!
      </h2>
      <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "32px", lineHeight: "1.6" }}>
        En 24 hrs revisamos tu perfil y te enviamos un correo de confirmación.
      </p>
      <a
        href="/musicos/carlos-mendoza"
        style={{
          display: "inline-block",
          padding: "14px 32px",
          background: "var(--primary)",
          color: "var(--on-primary)",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Ver mi perfil
      </a>
    </div>
  );
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  // Step 1 state
  const [artisticName, setArtisticName] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");

  // Step 2 state
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [customGenre, setCustomGenre] = useState("");

  // Step 3 state
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [travels, setTravels] = useState<boolean | null>(null);
  const [coverage, setCoverage] = useState("");

  // Step 4 state
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES.map((s) => ({ ...s })));

  const TOTAL_STEPS = 5;

  const handleNext = () => {
    if (currentStep === TOTAL_STEPS) {
      setCompleted(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            artisticName={artisticName} setArtisticName={setArtisticName}
            bio={bio} setBio={setBio}
            experience={experience} setExperience={setExperience}
          />
        );
      case 2:
        return (
          <Step2
            selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}
            customGenre={customGenre} setCustomGenre={setCustomGenre}
          />
        );
      case 3:
        return (
          <Step3
            city={city} setCity={setCity}
            country={country} setCountry={setCountry}
            travels={travels} setTravels={setTravels}
            coverage={coverage} setCoverage={setCoverage}
          />
        );
      case 4:
        return <Step4 services={services} setServices={setServices} />;
      case 5:
        return <Step5 onComplete={() => setCompleted(true)} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-soft)" }}>
      {/* Top bar */}
      <header
        style={{
          background: "var(--canvas)",
          borderBottom: "1px solid var(--hairline)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" className="h-8 w-auto" alt="esmusica.live" />

        {/* Step dots */}
        {!completed && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === currentStep;
              const isCompleted = stepNum < currentStep;
              return (
                <div
                  key={i}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: isActive || isCompleted ? "var(--primary)" : "transparent",
                    border: isActive || isCompleted ? "none" : "1px solid var(--hairline)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  {isCompleted && (
                    <span style={{ fontSize: "7px", color: "white", lineHeight: 1 }}>✓</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Exit */}
        <a
          href="/"
          style={{
            fontSize: "13px",
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          Salir
        </a>
      </header>

      {/* Wizard content */}
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            background: "var(--canvas)",
            borderRadius: "14px",
            boxShadow: "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px",
            padding: "32px",
          }}
        >
          {completed ? (
            <CompletionScreen />
          ) : (
            <>
              {renderStep()}

              {/* Navigation */}
              <div
                style={{
                  marginTop: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <button
                  onClick={handleNext}
                  style={{
                    width: "100%",
                    height: "48px",
                    background: "var(--primary)",
                    color: "var(--on-primary)",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)"; }}
                >
                  {currentStep === TOTAL_STEPS ? "Finalizar" : "Continuar →"}
                </button>

                {currentStep > 1 && (
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={handleBack}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--muted)",
                        fontSize: "14px",
                        cursor: "pointer",
                        padding: "4px 8px",
                      }}
                    >
                      ← Atrás
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
