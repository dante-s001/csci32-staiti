import type { PrismaClient } from '@prisma/client'

export async function seedPosts(prisma: PrismaClient) {
  // author email of the posts, is one of the emails from seedUsers.ts
  const authorEmail = 'admin@example.com'

  const author = await prisma.user.findUnique({ where: { email: authorEmail } })
  if (!author) throw new Error(`Author with email ${authorEmail} not found`)

  const posts = [
    {
      title: 'First Post',
      body: 'This is the content of the first post.',
      imageUrl: '',
      authorId: author.user_id,
    },
    {
      title: 'Second Post',
      body: 'This is the content of the second post.',
      imageUrl: '',
      authorId: author.user_id,
    },
  ]

  await prisma.post.createMany({ data: posts, skipDuplicates: true })

  const firstPost = await prisma.post.findFirst({ where: { title: 'First Post', authorId: author.user_id } })
  if (!firstPost) throw new Error('could not find first post to add comments to')

  let basicUser = await prisma.user.findUnique({ where: { email: 'basic@example.com' } })
  if (!basicUser) {
    basicUser = await prisma.user.create({
      data: {
        name: 'Basic User',
        email: 'basic@example.com',
        passwordHash: 'seeded-fallback',
      },
    })
  }

  const topComment = await prisma.comment.create({
    data: {
      body: 'This is the top level comment.',
      postId: firstPost.id,
      authorId: basicUser.user_id,
    },
  })

  await prisma.comment.create({
    data: {
      body: 'This is a nested reply, and should be attached to the top level comment.',
      postId: firstPost.id,
      authorId: author.user_id,
      parentId: topComment.id,
    },
  })

  console.log(`✅ Seeded ${posts.length} posts for author ${authorEmail}`)
}
