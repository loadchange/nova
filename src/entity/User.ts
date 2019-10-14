import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;
  @Field()
  username: string;
  @Field()
  phone: string;
  @Field({ nullable: true })
  email?: string;
}