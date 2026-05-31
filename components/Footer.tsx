export default function Footer() {
  return (
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
          className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid var(--hairline-soft)" }}
        >
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>
            © 2025 esmusica.live · El Salvador · Guatemala
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              style={{ fontSize: "13px", color: "var(--muted)", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
            >
              Privacidad
            </a>
            <a
              href="#"
              style={{ fontSize: "13px", color: "var(--muted)", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
