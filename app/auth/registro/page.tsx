"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type Role = "cliente" | "musico" | null;

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

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}

function InputField({ id, label, type = "text", value, onChange, placeholder, hint }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)", display: "block", marginBottom: "6px" }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
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
      {hint && (
        <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "5px" }}>{hint}</p>
      )}
    </div>
  );
}

interface RoleCardProps {
  emoji: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function RoleCard({ emoji, title, description, selected, onClick }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex flex-col items-center text-center p-5 transition-all"
      style={{
        border: selected ? "2px solid var(--primary)" : "2px solid var(--hairline)",
        borderRadius: "14px",
        background: selected ? "#fff8ee" : "var(--canvas)",
        cursor: "pointer",
        outline: "none",
      }}
    >
      <span style={{ fontSize: "48px", lineHeight: 1, marginBottom: "12px" }}>{emoji}</span>
      <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
        {title}
      </p>
      <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.5" }}>
        {description}
      </p>
    </button>
  );
}

interface StepRoleProps {
  role: Role;
  onRoleSelect: (r: Role) => void;
  onContinue: () => void;
}

function StepRole({ role, onRoleSelect, onContinue }: StepRoleProps) {
  return (
    <>
      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="esmusica.live" className="h-8 w-auto mx-auto mb-6" />

      <h1
        className="text-center mb-1"
        style={{ fontSize: "22px", fontWeight: 600, color: "var(--ink)" }}
      >
        ¿Cómo vas a usar esmusica.live?
      </h1>
      <p className="text-center mb-7" style={{ fontSize: "14px", color: "var(--muted)" }}>
        Podés cambiar esto después
      </p>

      {/* Role cards */}
      <div className="flex gap-4 mb-6">
        <RoleCard
          emoji="🎉"
          title="Busco músicos"
          description="Quiero contratar músicos para mi evento"
          selected={role === "cliente"}
          onClick={() => onRoleSelect("cliente")}
        />
        <RoleCard
          emoji="🎸"
          title="Soy músico"
          description="Quiero ofrecer mis servicios en eventos"
          selected={role === "musico"}
          onClick={() => onRoleSelect("musico")}
        />
      </div>

      {/* Continue button */}
      <button
        type="button"
        onClick={onContinue}
        disabled={!role}
        className="w-full transition-colors"
        style={{
          height: "48px",
          borderRadius: "8px",
          background: role ? "var(--primary)" : "var(--primary-disabled)",
          color: "var(--on-primary)",
          fontSize: "15px",
          fontWeight: 600,
          border: "none",
          cursor: role ? "pointer" : "not-allowed",
          marginBottom: "16px",
        }}
        onMouseEnter={(e) => {
          if (role) (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)";
        }}
        onMouseLeave={(e) => {
          if (role) (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
        }}
      >
        Continuar
      </button>

      <p className="text-center" style={{ fontSize: "14px", color: "var(--muted)" }}>
        ¿Ya tenés cuenta?{" "}
        <a
          href="/auth/login"
          style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: 500 }}
        >
          Ingresá
        </a>
      </p>
    </>
  );
}

interface StepInfoProps {
  role: Role;
  onBack: () => void;
  fields: {
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
    generos: string;
  };
  setFields: React.Dispatch<React.SetStateAction<{
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
    generos: string;
  }>>;
}

function StepInfo({ role, onBack, fields, setFields }: StepInfoProps) {
  const isMusico = role === "musico";

  return (
    <>
      {/* Back + progress */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--muted)",
            fontSize: "18px",
            padding: "0",
            lineHeight: 1,
          }}
          aria-label="Volver"
        >
          ←
        </button>
        <span style={{ fontSize: "13px", color: "var(--muted)" }}>Paso 2 de 2</span>
      </div>

      <h1
        className="mb-6"
        style={{ fontSize: "22px", fontWeight: 600, color: "var(--ink)" }}
      >
        {isMusico ? "Creá tu perfil de artista" : "Creá tu cuenta"}
      </h1>

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

      {/* Form fields */}
      <InputField
        id="nombre"
        label={isMusico ? "Nombre artístico" : "Nombre completo"}
        value={fields.nombre}
        onChange={(v) => setFields((f) => ({ ...f, nombre: v }))}
        placeholder={isMusico ? "Ej: Marimba Los Alegres" : "Tu nombre completo"}
      />

      <InputField
        id="email"
        label="Correo electrónico"
        type="email"
        value={fields.email}
        onChange={(v) => setFields((f) => ({ ...f, email: v }))}
        placeholder="tu@correo.com"
      />

      <InputField
        id="password"
        label="Contraseña"
        type="password"
        value={fields.password}
        onChange={(v) => setFields((f) => ({ ...f, password: v }))}
        placeholder="••••••••"
        hint="Mín. 8 caracteres"
      />

      <InputField
        id="confirmPassword"
        label="Confirmar contraseña"
        type="password"
        value={fields.confirmPassword}
        onChange={(v) => setFields((f) => ({ ...f, confirmPassword: v }))}
        placeholder="••••••••"
      />

      {isMusico && (
        <InputField
          id="generos"
          label="Géneros principales"
          value={fields.generos}
          onChange={(v) => setFields((f) => ({ ...f, generos: v }))}
          placeholder="Ej: Jazz, Salsa, Marimba"
        />
      )}

      {/* Submit */}
      <button
        type="button"
        className="w-full transition-colors mt-2"
        style={{
          height: "48px",
          borderRadius: "8px",
          background: "var(--primary)",
          color: "var(--on-primary)",
          fontSize: "15px",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          marginBottom: "16px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
        }}
      >
        Crear cuenta
      </button>

      {/* Terms */}
      <p className="text-center" style={{ fontSize: "12px", color: "var(--muted)", lineHeight: "1.6" }}>
        Al registrarte aceptás nuestros{" "}
        <a href="#" style={{ color: "var(--primary)", textDecoration: "underline" }}>
          Términos de servicio
        </a>{" "}
        y{" "}
        <a href="#" style={{ color: "var(--primary)", textDecoration: "underline" }}>
          Política de privacidad
        </a>
      </p>
    </>
  );
}

export default function RegistroPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>(null);
  const [fields, setFields] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    generos: "",
  });

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
          className="w-full max-w-lg p-8 shadow-card-hover"
        >
          {step === 1 ? (
            <StepRole
              role={role}
              onRoleSelect={setRole}
              onContinue={() => setStep(2)}
            />
          ) : (
            <StepInfo
              role={role}
              onBack={() => setStep(1)}
              fields={fields}
              setFields={setFields}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
