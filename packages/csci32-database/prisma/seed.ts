import { PrismaClient } from '@prisma/client'
import { seedPermissions } from './seeders/seedPermissions'
import { seedRoles } from './seeders/seedRoles'
import { seedUsers } from './seeders/seedUsers'
import { seedPosts } from './seeders/seedPosts'

const prisma = new PrismaClient()

async function main() {
  // Clear children first, then parents
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()

  // Run ordered seeders that share the same Prisma client
  await seedPermissions(prisma)
  await seedRoles(prisma)
  await seedUsers(prisma)
  await seedPosts(prisma)

  console.log('All seeds complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
