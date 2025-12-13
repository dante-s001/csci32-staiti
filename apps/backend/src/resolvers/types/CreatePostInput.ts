import { Field, InputType } from 'type-graphql'

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
}
