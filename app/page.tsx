import WaitlistForm from "@/components/WaitlistForm";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* ── Nav bar ── */}
      <header
        className="sticky top-0 z-50 border-b px-4 py-3 sm:px-6 sm:py-4"
        style={{
          background: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-center sm:justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="esmusica.live"
            className="h-9 w-auto sm:h-12"
          />
          <a
            href="#waitlist"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:block"
            style={{
              background: "var(--color-accent)",
              color: "#0A0A0F",
            }}
          >
            Unirme a la lista
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-6 pb-20 pt-24 text-center"
        style={{ background: "var(--color-bg)" }}
      >
        {/* Ambient glow behind headline */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full opacity-15 blur-3xl"
          style={{ background: "var(--color-accent)" }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl">
          <h1
            className="font-heading text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl"
            style={{ color: "var(--color-text)" }}
          >
            Músicos en vivo para tu evento.
          </h1>

          {/* ── Search bar ── */}
          <SearchBar />

          {/* ── Genre chips ── */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0">
            {["Jazz", "Cumbia", "Salsa", "Marimba", "Pop", "Rock"].map((genre) => (
              <a
                key={genre}
                href={`/search?genre=${genre.toLowerCase()}`}
                className="flex-shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors hover:border-amber-400"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-muted)",
                  background: "var(--color-surface)",
                }}
              >
                {genre}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Musicians ── */}
      <section className="px-6 pb-24 pt-4" style={{ background: "var(--color-bg)" }}>
        <div className="mx-auto max-w-6xl">
          <h2
            className="font-heading mb-8 text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--color-text)" }}
          >
            Músicos destacados
          </h2>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              {
                name: "Carlos Mendoza",
                genre: "Jazz",
                location: "San Salvador, SV",
                rating: "4.9",
                reviews: 23,
                price: "Desde $120/hr",
                verified: true,
                gradient: "linear-gradient(135deg, #1C1C28, #2E2E3E)",
              },
              {
                name: "Marimba Los Altos",
                genre: "Marimba",
                location: "Guatemala City",
                rating: "4.8",
                reviews: 41,
                price: "Desde $200/evento",
                verified: false,
                gradient: "linear-gradient(135deg, #1C2028, #2A2E3E)",
              },
              {
                name: "Sofía Rivas",
                genre: "Pop/Acústico",
                location: "Santa Ana, SV",
                rating: "5.0",
                reviews: 18,
                price: "Desde $80/hr",
                verified: true,
                gradient: "linear-gradient(135deg, #1C1C28, #2E2E3E)",
              },
              {
                name: "Grupo Ritmo",
                genre: "Cumbia/Salsa",
                location: "Quetzaltenango",
                rating: "4.7",
                reviews: 55,
                price: "Desde $150/evento",
                verified: false,
                gradient: "linear-gradient(135deg, #1A1C28, #2C2E3E)",
              },
            ].map((musician) => (
              <div
                key={musician.name}
                className="group relative overflow-hidden rounded-2xl border"
                style={{
                  background: musician.gradient,
                  borderColor: "var(--color-border)",
                  minHeight: "220px",
                }}
              >
                {/* Genre badge top-left */}
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: "rgba(212,168,83,0.18)",
                      color: "var(--color-accent)",
                      border: "1px solid rgba(212,168,83,0.3)",
                    }}
                  >
                    {musician.genre}
                  </span>
                  {musician.verified && (
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{
                        background: "rgba(212,168,83,0.18)",
                        color: "var(--color-accent)",
                        border: "1px solid rgba(212,168,83,0.3)",
                      }}
                    >
                      Verificado
                    </span>
                  )}
                </div>

                {/* Card content bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div
                    className="h-px mb-3 opacity-20"
                    style={{ background: "var(--color-border)" }}
                  />
                  <p
                    className="font-heading text-sm font-bold leading-tight sm:text-base"
                    style={{ color: "var(--color-text)" }}
                  >
                    {musician.name}
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {musician.location}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      ⭐ {musician.rating}{" "}
                      <span style={{ color: "var(--color-text-muted)", opacity: 0.6 }}>
                        ({musician.reviews})
                      </span>
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {musician.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <div
        className="border-y px-6 py-5"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-bg-app)",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 text-center">
          {[
            "20+ músicos",
            "El Salvador y Guatemala",
            "Primera plataforma de su tipo",
          ].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-6">
              <span
                className="text-sm font-medium tracking-wide"
                style={{ color: "var(--color-text-muted)" }}
              >
                {item}
              </span>
              {i < arr.length - 1 && (
                <span
                  className="hidden h-4 w-px sm:block"
                  style={{ background: "var(--color-border)" }}
                  aria-hidden
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── How it works for clients ── */}
      <section className="px-6 py-24" style={{ background: "var(--color-bg)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p
              className="mb-3 text-xs font-medium uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Para clientes
            </p>
            <h2
              className="font-heading text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--color-text)" }}
            >
              Reservá músicos en 3 pasos
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
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
              <div
                key={step.num}
                className="rounded-2xl border p-8"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <span
                  className="font-heading block text-7xl font-bold leading-none"
                  style={{ color: "var(--color-accent)", opacity: 0.25 }}
                >
                  {step.num}
                </span>
                <h3
                  className="font-heading mt-4 text-xl font-bold leading-snug"
                  style={{ color: "var(--color-text)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works for musicians ── */}
      <section
        className="px-6 py-24"
        style={{ background: "var(--color-bg-app)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p
              className="mb-3 text-xs font-medium uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Para músicos
            </p>
            <h2
              className="font-heading text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--color-text)" }}
            >
              Tu próximo show está a un perfil de distancia
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
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
              <div
                key={step.num}
                className="rounded-2xl border p-8"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <span
                  className="font-heading block text-7xl font-bold leading-none"
                  style={{ color: "var(--color-accent)", opacity: 0.25 }}
                >
                  {step.num}
                </span>
                <h3
                  className="font-heading mt-4 text-xl font-bold leading-snug"
                  style={{ color: "var(--color-text)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Waitlist ── */}
      <section
        id="waitlist"
        className="px-6 py-28 text-center"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="font-heading text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-text)" }}
          >
            Sé el primero en enterarte del lanzamiento.
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Estamos construyendo el marketplace de música en vivo para El
            Salvador y Guatemala. Dejanos tu correo y te avisamos cuando
            abramos.
          </p>

          <div className="mt-10 flex justify-center">
            <WaitlistForm />
          </div>

          <p
            className="mt-5 text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Sin spam. Solo novedades del lanzamiento.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="border-t px-6 py-8 text-center"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-bg-app)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          esmusica.live © 2025 · El Salvador
        </p>
      </footer>
    </div>
  );
}
