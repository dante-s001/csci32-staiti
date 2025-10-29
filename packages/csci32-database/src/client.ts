export * from '../prisma/seeders/seedRoles'
export * from '../prisma/seeders/seedPermissions'
export * from '../prisma/seeders/seedUsers'

import { PrismaClient } from '@prisma/client'
import { ADMIN_ROLE_ID } from 'csci32-database'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export * from '@prisma/client'
