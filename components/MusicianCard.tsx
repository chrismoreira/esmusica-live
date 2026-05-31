interface MusicianCardProps {
  name: string;
  genre: string;
  location: string;
  rating: string;
  price: string;
  verified?: boolean;
  gradient?: string;
  slug?: string;
  reviews?: number;
}

export default function MusicianCard({
  name,
  genre,
  location,
  rating,
  price,
  verified = false,
  gradient = "linear-gradient(135deg, #e8d5b7, #d4b896)",
  slug,
  reviews = 0,
}: MusicianCardProps) {
  const href = slug ? `/musicos/${slug}` : "#";

  return (
    <a
      href={href}
      style={{ textDecoration: "none", display: "block" }}
      className="group"
    >
      <div
        className="cursor-pointer transition-all duration-200"
        style={{
          borderRadius: "14px",
          background: "var(--surface-card)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow =
            "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Photo placeholder */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "1 / 1",
            borderRadius: "14px 14px 0 0",
            background: gradient,
          }}
        >
          {/* Verified badge top-left */}
          {verified && (
            <div
              className="absolute left-3 top-3"
              style={{
                background: "var(--primary)",
                borderRadius: "9999px",
                padding: "3px 9px",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--on-primary)",
                lineHeight: 1.6,
              }}
            >
              Verificado
            </div>
          )}

          {/* Heart button top-right */}
          <button
            className="absolute right-3 top-3 flex items-center justify-center rounded-full transition-transform duration-150"
            style={{
              width: "36px",
              height: "36px",
              background: "rgba(255,255,255,0.92)",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
            aria-label={`Guardar ${name}`}
            onClick={(e) => e.preventDefault()}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            ♡
          </button>
        </div>

        {/* Card body */}
        <div className="px-3 py-3">
          {/* Name row */}
          <div className="flex items-start justify-between gap-2">
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--ink)",
                lineHeight: 1.3,
              }}
            >
              {name}
            </span>
            {/* Rating */}
            <span
              className="flex-shrink-0"
              style={{ fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}
            >
              ★ {rating}
            </span>
          </div>

          {/* Reviews count */}
          {reviews > 0 && (
            <p
              style={{
                fontSize: "12px",
                color: "var(--muted-soft)",
                marginTop: "1px",
              }}
            >
              {reviews} reseñas
            </p>
          )}

          {/* Genre · location */}
          <p
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              marginTop: "3px",
            }}
          >
            {genre} · {location}
          </p>

          {/* Price */}
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--primary)",
              marginTop: "5px",
            }}
          >
            {price}
          </p>
        </div>
      </div>
    </a>
  );
}
