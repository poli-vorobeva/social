import {Post} from "./post.schema";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Friend} from "./friend.schema";
import {Document} from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User{
	@Prop()
	name:string;
	@Prop()
	age:string;
	@Prop()
	education:string;
	@Prop()
	city:string;
	@Prop()
	avatar:string;
	@Prop()
	friends: { name: string, friendId: mongoose.Schema.Types.ObjectId, avatar: string }[];
	@Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}]})
	posts:Post[];
	@Prop()
	email:string;
	@Prop()
	password:string;
}
export const UserSchema = SchemaFactory.createForClass(User);