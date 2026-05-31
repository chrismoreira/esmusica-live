/**
 * Prisma v7 client singleton — MySQL via built-in engine.
 *
 * For MySQL, Prisma does not require an external driver adapter.
 * DATABASE_URL format: mysql://user:password@host:3306/database
 *
 * The CLI reads the URL from prisma.config.ts.
 * At runtime, PrismaClient reads DATABASE_URL automatically.
 */
import { PrismaClient } from '@/app/generated/prisma'

// ---------------------------------------------------------------------------
// Client factory
// ---------------------------------------------------------------------------
function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

// ---------------------------------------------------------------------------
// Singleton — prevents multiple instances in Next.js HMR dev mode
// ---------------------------------------------------------------------------
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
