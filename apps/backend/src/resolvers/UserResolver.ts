import 'reflect-metadata'
import {
  Resolver,
  Query,
  Field,
  ObjectType,
  Ctx,
  ID,
  Arg,
  Mutation,
  Authorized,
  FieldResolver,
  Root,
} from 'type-graphql'
import type { Context } from '@/utils/graphql'
import { AuthPayload, SignUpInput } from './types/AuthTypes'
import { SignInInput } from './types/SignInTypes'
import { PermissionName } from 'csci32-database'
import { Role } from './types/Role'
import { FindManyUsersInput } from './types/FindManyUsersInput'
import { UserInfo } from './types/User'

//ctx refers to context, which is a collection of services available to the resolver
//these services were previously instantiated and are reused through context to avoid creating a new instance

//this resolver adds the role field to the UserInfo type (using the field resolver) in the event that the client requests the user roles
//this is why it has "(() => UserInfo)" as the parameter, because adding a parameter to the resolver means it will be adding on to it
@Resolver(() => UserInfo)
//class UserResolver
export class UserResolver {
  //check permissions to see if the user has permission to read user information
  @Authorized([PermissionName.UserRead])
  //if they do, they can use this query
  @Query(() => [UserInfo])
  //this function is used in this query to find many users, based on the parameters provided in the input
  findManyUsers(
    //this parameter is destructuring the userService instance from the context so we can use it directly, instead of having to do ctx.userService
    //this is not necessarily required, but it makes it simpler and easier to read
    @Ctx() { userService }: Context,
    //this parameter is the input for finding many users using the parameters
    @Arg('params', () => FindManyUsersInput, { nullable: true }) params?: FindManyUsersInput,
  ) {
    //return the result of calling the findMany function in UserService with the provided parameters (if there are any)
    return userService.findMany(params ?? {})
  }

  //check if the user has permissions
  @Authorized([PermissionName.UserRead])
  //if they do they can use this query
  @Query(() => Number)
  //this function gets the total number of users that match the filters provided
  totalUsers(
    //destructure userService from the context for easier access
    @Ctx() { userService }: Context,
    //the parameters for the filters
    @Arg('params', () => FindManyUsersInput, { nullable: true }) params?: FindManyUsersInput,
  ) {
    //return the result of calling getTotalUsers from UserService with the provided filters (if any)
    return userService.getTotalUsers(params?.filters ?? {})
  }

  //this mutation is used for signing up a new user
  //the mutation will return an AuthPayload object, which is why it has () => AuthPayload as a parameter
  @Mutation(() => AuthPayload)
  //sign up function
  //the parameters are the input for signing up, as well as the userService being destructured from context for easy access
  async signUp(@Arg('input', () => SignUpInput) input: SignUpInput, @Ctx() { userService }: Context) {
    //check if email and password are provided, otherwise throw an error
    if (!input.email || !input.password) throw new Error('email and password are required')
    //if they are, call the createUser function from UserService with the provided input
    const { user, token } = await userService.createUser(input)
    //return the AuthPayload object, with user and token as the properties
    return { user, token }
  }

  //sign in mutation returning an AuthPayload object
  @Mutation(() => AuthPayload)
  //sign in function
  //parameters are the input for signing in, and the UserService destructured from context for easy access
  async signIn(@Arg('input', () => SignInInput) input: SignInInput, @Ctx() { userService }: Context) {
    //check if email and password are provided, otherwise throw an error
    if (!input.email || !input.password) throw new Error('email and password are required')
    //if they are, call the authenticateUser function from UserService with the provided input as the parameter
    const { user, token } = await userService.authenticateUser(input)
    //return the AuthPayload object with the user and token as properties
    return { user, token }
  }

  //field resolver that adds the role field to the UserInfo type
  //this field will not be returned when UserInfo is queried unless the role field is specifically requested
  @FieldResolver(() => String, { nullable: true })
  //function to get the role of the user
  //the parameters are the user object from UserInfo, and the context for access to the existing prisma client instance
  async role(@Root() user: UserInfo, @Ctx() ctx: Context): Promise<string | null> {
    //if the user does not have a role_id, return null
    if (!user.user_id) return null

    const userData = await ctx.prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: { role: true },
    })

    return userData?.role?.name ?? null
  }
}
