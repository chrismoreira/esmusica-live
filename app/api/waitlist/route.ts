import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// TODO: Replace file-based storage with Prisma + DATABASE_URL once the DB is set up.
// This is a temporary solution to capture waitlist emails before the database is configured.
// See prisma/schema.prisma for the WaitlistEntry model that should replace this.

const WAITLIST_FILE = path.join(process.cwd(), ".waitlist.json");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistEntry = {
  email: string;
  createdAt: string;
};

function readWaitlist(): WaitlistEntry[] {
  try {
    if (!fs.existsSync(WAITLIST_FILE)) return [];
    const raw = fs.readFileSync(WAITLIST_FILE, "utf-8");
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

function writeWaitlist(entries: WaitlistEntry[]): void {
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  let body: { email?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Cuerpo de solicitud inválido." },
      { status: 400 }
    );
  }

  const email = (body.email ?? "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json(
      { error: "El correo electrónico es requerido." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Por favor ingresá un correo electrónico válido." },
      { status: 400 }
    );
  }

  const entries = readWaitlist();

  const alreadyExists = entries.some((entry) => entry.email === email);
  if (alreadyExists) {
    // Return success silently — no need to expose whether email exists
    return NextResponse.json({ success: true });
  }

  entries.push({ email, createdAt: new Date().toISOString() });
  writeWaitlist(entries);

  return NextResponse.json({ success: true });
}
