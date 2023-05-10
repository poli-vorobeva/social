import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import {User} from './user.schema';
import {Document} from "mongoose";

export type PostDocument = Post & Document

@Schema()
export class Post {
	@Prop()
	text: string;
	@Prop()
	date:string;
	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
	userId: User;
	@Prop()
	userName:string
	@Prop()
	picture:string
	@Prop()
	likes:string
}

export const PostSchema = SchemaFactory.createForClass(Post)