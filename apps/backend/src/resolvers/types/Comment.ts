import { Field, ObjectType } from 'type-graphql'
import { UserInfo } from './User'

@ObjectType()
export class Comment {
  @Field(() => String)
  id!: string

  @Field(() => String)
  body!: string

  @Field(() => String)
  postId!: string

  @Field(() => String)
  authorId!: string

  @Field(() => UserInfo, { nullable: true })
  author?: UserInfo

  @Field(() => String, { nullable: true })
  parentId?: string | null

  @Field(() => Date)
  createdAt?: Date
}
