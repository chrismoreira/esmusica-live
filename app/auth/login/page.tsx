"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
        fill="#4285F4"
      />
      <path
        d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.759-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
        fill="#34A853"
      />
      <path
        d="M4.405 11.9A6.01 6.01 0 014.09 10c0-.661.114-1.305.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49L4.405 11.9z"
        fill="#FBBC05"
      />
      <path
        d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0A9.996 9.996 0 001.064 5.51L4.405 8.1C5.19 5.736 7.395 3.977 10 3.977z"
        fill="#EA4335"
      />
    </svg>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px" style={{ background: "var(--hairline)" }} />
      <span style={{ fontSize: "13px", color: "var(--muted)" }}>o</span>
      <div className="flex-1 h-px" style={{ background: "var(--hairline)" }} />
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Nav activePage="auth" />

      <main
        style={{ minHeight: "calc(100vh - 80px)", background: "var(--surface-soft)" }}
        className="flex items-center justify-center px-4 py-16"
      >
        <div
          style={{
            background: "var(--canvas)",
            borderRadius: "14px",
          }}
          className="w-full max-w-md p-8 shadow-card-hover"
        >
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="esmusica.live" className="h-8 w-auto mx-auto mb-6" />

          {/* Heading */}
          <h1
            className="text-center mb-1"
            style={{ fontSize: "22px", fontWeight: 600, color: "var(--ink)" }}
          >
            Bienvenido de vuelta
          </h1>
          <p
            className="text-center mb-6"
            style={{ fontSize: "15px", color: "var(--muted)" }}
          >
            Ingresá a tu cuenta
          </p>

          {/* Google button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 transition-colors"
            style={{
              height: "48px",
              border: "1px solid var(--hairline)",
              borderRadius: "8px",
              background: "var(--canvas)",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--ink)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-soft)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--canvas)";
            }}
          >
            <GoogleIcon />
            Continuar con Google
          </button>

          <Divider />

          {/* Email field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)", display: "block", marginBottom: "6px" }}
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full transition-colors"
              style={{
                height: "48px",
                border: "1px solid var(--hairline)",
                borderRadius: "8px",
                padding: "0 14px",
                fontSize: "15px",
                color: "var(--ink)",
                background: "var(--canvas)",
                outline: "none",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.outline = "2px solid var(--primary)";
                (e.currentTarget as HTMLInputElement).style.outlineOffset = "-1px";
                (e.currentTarget as HTMLInputElement).style.border = "1px solid transparent";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.outline = "none";
                (e.currentTarget as HTMLInputElement).style.border = "1px solid var(--hairline)";
              }}
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}
              >
                Contraseña
              </label>
              <a
                href="#"
                style={{ fontSize: "13px", color: "var(--primary)", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"; }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full transition-colors"
              style={{
                height: "48px",
                border: "1px solid var(--hairline)",
                borderRadius: "8px",
                padding: "0 14px",
                fontSize: "15px",
                color: "var(--ink)",
                background: "var(--canvas)",
                outline: "none",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.outline = "2px solid var(--primary)";
                (e.currentTarget as HTMLInputElement).style.outlineOffset = "-1px";
                (e.currentTarget as HTMLInputElement).style.border = "1px solid transparent";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.outline = "none";
                (e.currentTarget as HTMLInputElement).style.border = "1px solid var(--hairline)";
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            className="w-full transition-colors"
            style={{
              height: "48px",
              borderRadius: "8px",
              background: "var(--primary)",
              color: "var(--on-primary)",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
            }}
          >
            Ingresar
          </button>

          {/* Register link */}
          <p className="text-center mt-5" style={{ fontSize: "14px", color: "var(--muted)" }}>
            ¿No tenés cuenta?{" "}
            <a
              href="/auth/registro"
              style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: 500 }}
            >
              Registrate
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
