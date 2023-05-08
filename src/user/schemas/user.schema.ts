import {Post} from "./post.schema";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Friend} from "./friend.schema";

export type UserDocument = User & Document

@Schema()
export class User{
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
	@Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Friend'}]})
	friends:Friend[];
}
export const UserSchema = SchemaFactory.createForClass(User);