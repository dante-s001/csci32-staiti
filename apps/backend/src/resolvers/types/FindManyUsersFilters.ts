import { InputType, Field } from 'type-graphql'

//this is used to filter users when finding many users
@InputType()
export class FindManyUsersFilters {
  //the query field is a string (user, email, role, etc.) and is optional when searching for users
  @Field(() => String, { nullable: true })
  query?: string
}
