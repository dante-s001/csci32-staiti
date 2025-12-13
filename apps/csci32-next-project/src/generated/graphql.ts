/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any }
}

export type AuthPayload = {
  __typename?: 'AuthPayload'
  token: Scalars['String']['output']
  user: UserDto
}

export type Comment = {
  __typename?: 'Comment'
  author?: Maybe<UserInfo>
  authorId: Scalars['String']['output']
  body: Scalars['String']['output']
  createdAt: Scalars['DateTimeISO']['output']
  id: Scalars['String']['output']
  parentId?: Maybe<Scalars['String']['output']>
  postId: Scalars['String']['output']
}

export type CreatePostInput = {
  body: Scalars['String']['input']
  imageUrl: Scalars['String']['input']
  title: Scalars['String']['input']
}

export type FindManyUsersFilters = {
  query?: InputMaybe<Scalars['String']['input']>
}

export type FindManyUsersInput = {
  filters?: InputMaybe<FindManyUsersFilters>
  skip?: InputMaybe<Scalars['Int']['input']>
  sortColumn?: InputMaybe<Scalars['String']['input']>
  sortDirection?: InputMaybe<SortOrder>
  take?: InputMaybe<Scalars['Int']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createPost: Scalars['String']['output']
  signIn: AuthPayload
  signUp: AuthPayload
}

export type MutationCreatePostArgs = {
  input: CreatePostInput
}

export type MutationSignInArgs = {
  input: SignInInput
}

export type MutationSignUpArgs = {
  input: SignUpInput
}

export type Permission = {
  __typename?: 'Permission'
  name: Scalars['String']['output']
  permission_id: Scalars['ID']['output']
}

export type Post = {
  __typename?: 'Post'
  author: UserInfo
  authorId: Scalars['String']['output']
  body: Scalars['String']['output']
  comments?: Maybe<Array<Comment>>
  createdAt: Scalars['DateTimeISO']['output']
  id: Scalars['String']['output']
  imageUrl: Scalars['String']['output']
  title: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  findManyUsers: Array<UserInfo>
  posts: Array<Post>
  totalUsers: Scalars['Float']['output']
}

export type QueryFindManyUsersArgs = {
  params?: InputMaybe<FindManyUsersInput>
}

export type QueryTotalUsersArgs = {
  params?: InputMaybe<FindManyUsersInput>
}

export type Role = {
  __typename?: 'Role'
  name: Scalars['String']['output']
  permissions: Array<Permission>
  role_id: Scalars['ID']['output']
}

export type SignInInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type SignUpInput = {
  email: Scalars['String']['input']
  name?: InputMaybe<Scalars['String']['input']>
  password: Scalars['String']['input']
}

/** Defines ascending or descending sort order. */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type UserDto = {
  __typename?: 'UserDTO'
  email?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  role?: Maybe<Scalars['String']['output']>
  user_id: Scalars['ID']['output']
}

export type UserInfo = {
  __typename?: 'UserInfo'
  email: Scalars['String']['output']
  name: Scalars['String']['output']
  role?: Maybe<Role>
  role_id?: Maybe<Scalars['String']['output']>
  user_id: Scalars['String']['output']
}

export type SignUpMutationVariables = Exact<{
  input: SignUpInput
}>

export type SignUpMutation = {
  __typename?: 'Mutation'
  signUp: {
    __typename?: 'AuthPayload'
    token: string
    user: { __typename?: 'UserDTO'; user_id: string; name?: string | null; email?: string | null; role?: string | null }
  }
}

export type SignInMutationVariables = Exact<{
  input: SignInInput
}>

export type SignInMutation = {
  __typename?: 'Mutation'
  signIn: {
    __typename?: 'AuthPayload'
    token: string
    user: { __typename?: 'UserDTO'; user_id: string; name?: string | null; email?: string | null; role?: string | null }
  }
}

export const SignUpDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignUp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'SignUpInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signUp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'user_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>
export const SignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'SignInInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'user_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>
