import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Post} from "./post.schema";
import {Document} from "mongoose";
import mongoose from "mongoose";
import {User} from "./user.schema";

export type FriendDocument = Friend & Document

@Schema()
export class Friend{
	@Prop()
	name:string;
	@Prop()
	avatar:string;
	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
	friendId: User;
}
export const FriendSchema = SchemaFactory.createForClass(Friend);