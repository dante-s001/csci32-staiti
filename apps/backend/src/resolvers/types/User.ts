import { Field, ObjectType } from 'type-graphql'

@ObjectType()
//user information object type
export class UserInfo {
  //the user id is required
  @Field(() => String)
  user_id!: string

  //the name of the user is required
  @Field(() => String)
  name!: string

  //the email of the user is required
  @Field(() => String)
  email!: string

  //the role id of the user is optional, as not all users have roles
  @Field(() => String, { nullable: true })
  role_id?: string | null
}
