import type { PrismaClient } from 'csci32-database'

//this interface defines the dependencies required by the PostService
export interface ServiceDeps {
  //we need a PrismaClient instance to interact with the database
  prisma: PrismaClient
}

//createpostinput type
export type CreatePostInput = {
  //when this type is used, a title is required
  title: string
  //body text is also required
  body: string
  //comments are optional, since a post may not have comments on it
  comments?: { body: string; authorId: string }[]
}

//post service class
export class PostService {
  //this constructor injects the dependencies defined in ServiceDeps
  constructor(private deps: ServiceDeps) {}

  //this function creates a post for a specific author
  //it uses the CreatePostInput type, as well as the authors user ID
  async createForAuthor(input: CreatePostInput, authorUserId: string) {
    //pass the prisma client to the function
    //this tells the function to use the existing prisma client instead of creating a new one
    const { prisma } = this.deps
    //destructure the variable "input" to get the title, body, and comments
    const { title, body, comments } = input

    //data object to hold the post data
    //this object uses the title, body, and authorId
    const data: any = {
      title,
      body,
      authorId: authorUserId,
    }

    //if there are comments, add them to the data object
    //this statement checks for comments checking the size of the comments array
    if (comments && comments.length > 0) {
      //assign the comments to the data object
      data.comments = {
        //use map to iterate through each comment, create a new object, and add it to the comments array
        //since it is a nested create, it will automatically link the new comments to the post
        create: comments.map((c) => ({
          body: c.body,
          authorId: c.authorId,
        })),
      }
    }

    //create the post in the database using prisma.post.create
    return prisma.post.create({
      //return the data object
      data,
      //including the author and comments in the response
      include: { author: true, comments: true },
    })
  }

  //function to get all posts from the database (will be displayed on the website)
  async getAllPosts() {
    const { prisma } = this.deps

    return prisma.post.findMany({
      include: {
        author: true,
        comments: true,
      },

      orderBy: { id: 'desc' },
    })
  }
}
