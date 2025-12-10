import { InputType, Field } from 'type-graphql'

//this type is for creating comments
@InputType()
export class CreateCommentForPostInput {
  //the body text field is required for a comment
  @Field(() => String)
  body!: string

  //the author id field of the user is required for a comment
  @Field(() => String)
  authorId!: string
}

//this type is for creating posts
@InputType()
export class CreatePostInput {
  //ths title of a post is required
  @Field(() => String)
  title!: string

  //the body text is required
  @Field(() => String)
  body!: string

  //an image url is required
  @Field(() => String)
  imageUrl!: string

  //the comments field is optional, as a post will not have comments by default
  //the "() =>" is used to tell typescript what the data type is (since complex types such as arrays may not be correctly inferred at runtime)
  //the "[CreateCommentForPostInput]" indicates that it will be an array of CreateCommentForPostInput objects
  @Field(() => [CreateCommentForPostInput], { nullable: true })
  comments?: CreateCommentForPostInput[]
}
