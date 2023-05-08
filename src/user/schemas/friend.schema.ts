import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Post} from "./post.schema";

export type FriendDocument = Friend & Document

@Schema()
export class Friend{
	@Prop()
	name:string;
	@Prop()
	age:number;
	@Prop()
	education:string;
	@Prop()
	city:string;
	@Prop()
	avatar:string;
	@Prop()
	posts:Post[]
}
export const FriendSchema = SchemaFactory.createForClass(Friend);