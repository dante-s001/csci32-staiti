import { InputType, Field, Int } from 'type-graphql'
import { SortOrder } from './SortOrder'
import { FindManyUsersFilters } from './FindManyUsersFilters'

//this type is used as input when finding many users
@InputType()
export class FindManyUsersInput {
  //the skip field is optional
  //it is used for pagination, such as skipping the first 15 rows of the database
  @Field(() => Int, { nullable: true })
  skip?: number

  //the take field is optional
  //it is used for pagination as well, and determines how many rows to return
  //if skip = 10 and take = 20, it will find rows 11-30
  @Field(() => Int, { nullable: true })
  take?: number

  //sort direction is optional
  //it is used to determine the direction of sorting (such as ascending or descending)
  @Field(() => SortOrder, { nullable: true })
  sortDirection?: SortOrder

  //sort column is optional
  //it is used to determine which column is used for sorting (name or email)
  @Field(() => String, { nullable: true })
  sortColumn?: 'name' | 'email'

  //filters are optional
  //it is used to specify what we are searching for (such as name, email, id, roles, etc.)
  @Field(() => FindManyUsersFilters, { nullable: true })
  filters?: FindManyUsersFilters
}
