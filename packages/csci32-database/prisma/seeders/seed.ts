import { PrismaClient } from '@prisma/client'
import { seedPermissions } from './seedPermissions'
import { seedRoles } from './seedRoles'
import { seedUsers } from './seedUsers'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')
  await seedPermissions(prisma)
  const { adminRole, basicRole } = await seedRoles(prisma)
  await seedUsers(prisma, adminRole.role_id, basicRole.role_id)
  console.log('✅ All seeds completed successfully!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Seed error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
