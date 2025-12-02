import { Field, ObjectType, InputType, ID } from 'type-graphql'

//input type is what the client sends to the server
@InputType()
//SignUpInput is the input type, defining what information is required from the client when a sign up mutation is sent
export class SignUpInput {
  //these are the required fields that must be sent in the mutation
  // @Field(() => String) means that this fields must be a String
  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string

  //this field is not required, as indicated by the ? after the field name, and the {nullable: true}
  @Field(() => String, { nullable: true })
  name?: string
}

//ObjectType is what the server sends back to the client when called, either when the resolver returns it
//or when a graphql mutation/query requests it
@ObjectType()
//UserDTO is the object type defining the structure of the object being sent back to the client
export class UserDTO {
  //required fields in typescript must be initialized,
  //but there is no value assigned to this field yet because the resolver will handle that.
  //this would usually throw an error, but the ! tells typescript to ignore that,
  //and that we promise to assign it a value later before it gets used
  @Field(() => ID)
  user_id!: string

  //the name field is optional, and can be null
  @Field(() => String, { nullable: true })
  name?: string | null

  //the email field is optional, and can be null
  @Field(() => String, { nullable: true })
  email?: string | null
}

//object sent back to the client
@ObjectType()
//this object contains the JWT token and user information
export class AuthPayload {
  @Field(() => String)
  token!: string

  //this field is a DTO (Data Transfer Object) containing user id, as well as optional name and email fields
  //these objects purposefully only contain the data that needs to be transferred between client and server
  //this does not include things like passwords
  @Field(() => UserDTO)
  user!: UserDTO
}
