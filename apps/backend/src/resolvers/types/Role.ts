import { ObjectType, Field, ID } from 'type-graphql'
import { Permission } from './Permission'

@ObjectType()
export class Role {
  @Field(() => ID)
  role_id!: string

  @Field()
  name!: string

  @Field(() => [Permission])
  permissions!: Permission[]
}
