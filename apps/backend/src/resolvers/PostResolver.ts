import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import type { Context } from '@/utils/graphql'
import { CreatePostInput } from '@/resolvers/types/CreatePostInput'
import { Post } from '@/resolvers/types/Post'
import { getDecodedToken } from '@/utils/authHelpers'
import { Authorized } from 'type-graphql'
import { PermissionName } from 'csci32-database'

//ctx refers to context, which is a collection of services available to the resolver
//these services were previously instantiated and are reused through context to avoid creating a new instance

@Resolver()
//post resolver class
export class PostResolver {
  //use the Authorized decorator to check permissions
  //the parameter is an array of permissions that are required to access the mutation
  @Authorized([PermissionName.PostCreate])
  //if the user has the required permissions, they can use the mutation to create a post
  @Mutation(() => String)
  //function to create a post
  //"@Ctx()"" is the context decorator with no parameters (since type-graphql knows context is always Context)
  //"ctx: Context" is used to inject the context object into the "ctx" variable
  //this format follows the standard for type-graphql decorators of "@DecoratorName(optional parameters) variableName: TypeScriptType" (@Ctx() ctx: Context)

  //the next parameter is the input for creating a post
  //"@Arg('input', () => CreatePostInput)" is the argument decorator
  //"input: CreatePostInput" is the variable to hold the input data
  //the ": Promise<string>" after the parameters indicates the function returns a promise that resolves to a string
  //we use Promise because it is an async function
  async createPost(@Ctx() ctx: Context, @Arg('input', () => CreatePostInput) input: CreatePostInput): Promise<string> {
    //get the author user id from the decoded token (taken from context in the FastifyRequest object) and run through .sub to get the subject (user id)
    const authorUserId = getDecodedToken(ctx).sub
    //call the post service through context to create the post, using the input and author user id from before
    const post = await ctx.postService.createForAuthor(input, authorUserId)
    //return the id of the post that was just created
    return post.id
  }

  //query option to get all the posts from the database
  //is of type post array
  @Query(() => [Post])
  //function to get all posts
  async posts(@Ctx() ctx: Context): Promise<Post[]> {
    //ctx.postService.getAllPosts() means the following:
    //from the context, call postService (which is a variable of type PostService)
    //and then call the member function getAllPosts() from that class
    //the PostService class was instantiated with a prisma client in PostService.ts
    return ctx.postService.getAllPosts()
  }
}
