// Prisma v7 configuration — database URLs live here, NOT in schema.prisma.
//
// DATABASE_URL   — used by Prisma CLI for migrate/introspect.
//                  Use a direct (non-pooled) connection string here so that
//                  Prisma Migrate can manage DDL transactions properly.
//                  If your provider requires a pooler URL at runtime, set
//                  DIRECT_URL to the non-pooled URL and DATABASE_URL to the
//                  pooler URL for this file.
//
// At runtime, the adapter in lib/prisma.ts reads DATABASE_URL directly.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // For Neon/Supabase: use DIRECT_URL (non-pooled) so migrate can run DDL.
    // Fall back to DATABASE_URL if DIRECT_URL is not set.
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
