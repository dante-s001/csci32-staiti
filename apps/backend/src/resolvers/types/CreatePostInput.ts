import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateCommentForPostInput {
  @Field() body!: string
}

@InputType()
export class CreatePostInput {
  @Field() title!: string
  @Field() body!: string

  @Field(() => [CreateCommentForPostInput], { nullable: true })
  comments?: CreateCommentForPostInput[]
}
