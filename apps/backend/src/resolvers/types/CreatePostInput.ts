import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateCommentForPostInput {
  @Field()
  body!: string

  @Field()
  authorId!: string
}

@InputType()
export class CreatePostInput {
  @Field()
  title!: string

  @Field()
  body!: string

  @Field()
  imageUrl!: string

  @Field(() => [CreateCommentForPostInput], { nullable: true })
  comments?: CreateCommentForPostInput[]
}
