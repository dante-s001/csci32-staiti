import type { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { ADMIN_ROLE_ID, BASIC_ROLE_ID } from './seedRoles'

export async function seedUsers(prisma: PrismaClient) {
  const adminHash = await bcrypt.hash('admin123', 10)
  const basicHash = await bcrypt.hash('basic123', 10)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: adminHash,
      role: { connect: { role_id: ADMIN_ROLE_ID } },
    },
  })

  const basicUser = await prisma.user.upsert({
    where: { email: 'basic@example.com' },
    update: {},
    create: {
      name: 'Basic User',
      email: 'basic@example.com',
      passwordHash: basicHash,
      role: { connect: { role_id: BASIC_ROLE_ID } },
    },
  })

  console.log(`✅ Seeded users: ${adminUser.email}, ${basicUser.email}`)
}
