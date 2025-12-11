import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserInfo {
  @Field(() => String)
  user_id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  email!: string

  @Field(() => String, { nullable: true })
  role_id?: string | null
}
