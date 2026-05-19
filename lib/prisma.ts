/**
 * Prisma v7 client singleton with @prisma/adapter-pg driver.
 *
 * Prisma v7 requires either an `adapter` or `accelerateUrl` passed to the
 * PrismaClient constructor — the URL is no longer read from schema.prisma.
 *
 * For Prisma Accelerate (Vercel edge / connection pooling), swap the
 * `adapter` approach for the `accelerateUrl` approach — see the commented
 * block below.
 */
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/app/generated/prisma'

// ---------------------------------------------------------------------------
// Direct adapter (standard Node.js / Vercel serverless with PgBouncer)
// ---------------------------------------------------------------------------
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

// ---------------------------------------------------------------------------
// Alternative: Prisma Accelerate (uncomment when PRISMA_ACCELERATE_URL is set)
// ---------------------------------------------------------------------------
// import { withAccelerate } from '@prisma/extension-accelerate'
// function createPrismaClient() {
//   return new PrismaClient({
//     accelerateUrl: process.env.PRISMA_ACCELERATE_URL!,
//   }).$extends(withAccelerate())
// }

// ---------------------------------------------------------------------------
// Singleton (prevents multiple instances in Next.js HMR dev mode)
// ---------------------------------------------------------------------------
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
