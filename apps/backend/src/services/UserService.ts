import type { SignUpInput } from '@/resolvers/types/AuthTypes'
import type { FindManyUsersFilters } from '@/resolvers/types/FindManyUsersFilters'
import type { FindManyUsersInput } from '@/resolvers/types/FindManyUsersInput'
import { SortOrder } from '@/resolvers/types/SortOrder'
import { comparePassword, hashPassword, signToken } from '@/utils/auth'
import { PrismaClient, BASIC_ROLE_ID, Prisma } from 'csci32-database'

//this interface defines some of the dependencies required for UserService
//same as the one in PostService, it requires a client
export interface UserServiceProps {
  prisma: PrismaClient
}

//user service class
export class UserService {
  //"inject" or pass the prisma client to the class so it can be used
  prisma: PrismaClient

  //assign the prisma client to the class property
  constructor({ prisma }: UserServiceProps) {
    this.prisma = prisma
  }

  //this function is used if the user wants to get an ordered list of users
  getOrderBy(params: FindManyUsersInput): Prisma.UserOrderByWithRelationInput {
    //this destructures the sortcolumn and sortdirection variables from the "params" object provided to this function when it is called
    const { sortColumn, sortDirection } = params
    //if there is a sortColumn value provided in the params, return an object
    if (sortColumn) {
      return { [sortColumn]: sortDirection ?? SortOrder.ASC }
    }
    //reurn a default sort order of all names if there was no column provided
    return { name: SortOrder.ASC }
  }

  //this function is used to create a "where" clause for filtering users in the database
  //this helps to filter out what specific selection of users to return, such as from id 50 to 100
  getUsersWhereClause(params: FindManyUsersInput): Prisma.UserWhereInput {
    //destructure the filters from the params object, so we can figure out what filters to apply
    const { filters } = params
    //create an empty "where" object of the type Prisma.UserWhereInput
    //this will be used later to tell the function what filters to apply
    const where: Prisma.UserWhereInput = {}

    //if there are filters provided, check what they were
    if (filters?.query) {
      //assign the filters to the empty "where" object created earlier
      where.OR = [
        { name: { contains: filters.query, mode: 'insensitive' } },
        { email: { contains: filters.query, mode: 'insensitive' } },
      ]
    }

    //return the "where" object now populated with the filters
    return where
  }

  //this function is used to find many users
  async findMany(params: FindManyUsersInput) {
    //default values for skip and take. This shows 15 users at a time by default
    const { skip = 0, take = 15 } = params
    //get the orderBy using the getOrderBy function from earlier
    const orderBy = this.getOrderBy(params)
    //get the where clause using the getUsersWhereClause function from earlier
    const where = this.getUsersWhereClause(params)

    //return the results
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy,
      where,
    })
  }

  //this function gets the total number of users with the matching filters
  async getTotalUsers(filters: FindManyUsersFilters) {
    //get the where clause using the getUsersWhereClause function from earlier
    //this is used as a way to tell the function what to search for (such as name/role)
    const where = this.getUsersWhereClause({ filters })
    //return the count of users that match the where clause
    return this.prisma.user.count({ where })
  }

  //this function creates a new user in the database using SignUpInput type
  async createUser(params: SignUpInput) {
    //destructure the parameters provided to the function to get the info
    const { email, password, name } = params

    //check if a user with the provided email already exists using the findUnique function
    //the findUnique function searches the database, checking the emails to see if there is a matching result
    const existing = await this.prisma.user.findUnique({ where: { email } })
    //if the email already exists in the database, throw an error
    if (existing) throw new Error('Email already in use')

    //hash the password provided using the hashPassowrd function
    const passwordHash = await hashPassword(password)

    //create the user in the database using the email, hashed password, name(optional), and the default role of basic user
    const created = await this.prisma.user.create({
      data: {
        email,
        name: name ?? '',
        passwordHash,
        role: { connect: { role_id: BASIC_ROLE_ID } },
      },
      //this part tells prisma what to return after creating the user
      //passowrdhash is not included, as it would be a security risk to return in the event it was intercepted or logged
      select: {
        user_id: true,
        email: true,
        name: true,
        role: { select: { name: true, role_permissions: { select: { permission: { select: { name: true } } } } } },
      },
    })

    //this calls the signToken function and assigns the result to the token variable
    //it is used to authenticate user requests without the need to sign in again
    const token = signToken({
      //these are the arguments that the signToken function takes to create the token
      sub: created.user_id,
      email: created.email,
      name: created.name ?? undefined,
      role: created.role?.name,
      permissions: created.role?.role_permissions.map((p) => p.permission.name) ?? [],
    })

    //the result is a string token
    return { user: created, token }
  }

  //this function is used to authenticate a user when they attempt a login
  async authenticateUser(params: { email: string; password: string }) {
    //destructure the email and password from the params object so we can use them
    const { email, password } = params

    //find the user in the database using the provided email
    const found = await this.prisma.user.findUnique({
      //search through the email fields in the database
      where: { email },
      select: {
        user_id: true,
        email: true,
        name: true,
        passwordHash: true,
        role: { select: { name: true, role_permissions: { select: { permission: { select: { name: true } } } } } },
      },
    })

    //using the found variable from the previous step, check if the user was found and if the passwordHash exists
    //if the user wasnt found or if the passwordHash is missing, throw an error
    if (!found || !found.passwordHash) throw new Error('Invalid email or password')

    //if the user was found and a passwordHash exists, compare the passwordHash with the one stored in the database for that user
    const ok = await comparePassword(password, found.passwordHash)
    //if it does not match, throw an error
    if (!ok) throw new Error('Invalid email or password')

    //if the password matches, create a token for the user with the signToken function
    const token = signToken({
      sub: found.user_id,
      email: found.email,
      name: found.name ?? undefined,
      role: found.role?.name,
      permissions: found.role?.role_permissions.map((p) => p.permission.name) ?? [],
    })

    //remove the passwordHash from the user object
    const { passwordHash, ...user } = found as any
    //return the user object and the token
    return { user, token }
  }
}
