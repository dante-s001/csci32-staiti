import { Field, ObjectType } from 'type-graphql'
import { UserInfo } from './User'

@ObjectType()
export class Post {
  @Field(() => String)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String)
  body!: string

  @Field(() => String)
  imageUrl!: string

  @Field(() => String)
  authorId!: string

  @Field(() => UserInfo)
  author!: UserInfo

  @Field(() => Date)
  createdAt?: Date
}
