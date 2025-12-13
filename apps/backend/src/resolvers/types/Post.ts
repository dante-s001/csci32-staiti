import { Field, ObjectType } from 'type-graphql'
import { UserInfo } from './User'
import { Comment } from './Comment' // Add this import

@ObjectType()
//post information object type
export class Post {
  //the id of the post is required
  @Field(() => String)
  id!: string

  //the title of the post is required
  @Field(() => String)
  title!: string

  //the body text of the post is required
  @Field(() => String)
  body!: string

  //the image url is required for each post
  @Field(() => String)
  imageUrl!: string

  //the auhor id of each post is required (in reality I will be the only one making posts)
  @Field(() => String)
  authorId!: string

  //the author information for each post is required
  @Field(() => UserInfo)
  author!: UserInfo

  //the comments for each post (optional, array)
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[]

  //the creation date of a post is required
  @Field(() => Date)
  createdAt!: Date
}
