// Prisma v7 configuration — database URLs live here, NOT in schema.prisma.
//
// DATABASE_URL format (MySQL):
//   mysql://USER:PASSWORD@HOST:PORT/DATABASE
//
// Example (local):   mysql://root:password@localhost:3306/esmusica
// Example (hosting): mysql://usr_abc:pass@mysql.mihosting.com:3306/db_esmusica
//
// Set this in .env.local — never commit the real URL.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
