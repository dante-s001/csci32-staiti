import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import type { Context } from '@/utils/graphql'
import { CreatePostInput } from '@/resolvers/types/CreatePostInput'
import { Post } from '@/resolvers/types/Post'
import { getDecodedToken } from '@/utils/authHelpers'
import { Authorized } from 'type-graphql'
import { PermissionName } from 'csci32-database'

@Resolver()
export class PostResolver {
  @Authorized([PermissionName.PostCreate])
  @Mutation(() => String)
  async createPost(@Ctx() ctx: Context, @Arg('input', () => CreatePostInput) input: CreatePostInput): Promise<string> {
    const authorUserId = getDecodedToken(ctx).sub
    const post = await ctx.postService.createForAuthor(input, authorUserId)
    return post.id
  }

  //query option to get all the posts from the database
  //is of type post array
  @Query(() => [Post])
  //function to get all posts
  //ctx means
  async posts(@Ctx() ctx: Context): Promise<Post[]> {
    return ctx.postService.getAllPosts()
  }
}
