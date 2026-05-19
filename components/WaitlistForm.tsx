"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Algo salió mal. Intentá de nuevo.");
        setState("error");
        return;
      }

      setState("success");
      setEmail("");
    } catch {
      setErrorMessage("No pudimos conectar con el servidor. Intentá de nuevo.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-2xl border px-8 py-8 text-center"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-success)",
        }}
      >
        <span
          className="text-4xl font-bold"
          style={{ color: "var(--color-success)" }}
        >
          ✓
        </span>
        <p
          className="text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          ¡Ya estás en la lista!
        </p>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Te avisaremos en cuanto lancemos. Gracias por tu interés.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="waitlist-email"
          className="text-sm font-medium"
          style={{ color: "var(--color-text-muted)" }}
        >
          Correo electrónico
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            disabled={state === "loading"}
            className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-50"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
          <button
            type="submit"
            disabled={state === "loading" || !email}
            className="rounded-xl px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-50"
            style={{
              background:
                state === "loading"
                  ? "var(--color-accent)"
                  : "var(--color-accent)",
              color: "#0A0A0F",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--color-accent-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--color-accent)";
            }}
          >
            {state === "loading" ? "Enviando…" : "Unirme a la lista"}
          </button>
        </div>
        {state === "error" && (
          <p className="text-sm" style={{ color: "var(--color-error)" }}>
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
