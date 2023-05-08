import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import {User} from './user.schema';

export type PostDocument = Post & Document

@Schema()
export class Post {
	@Prop()
	text: string;
	@Prop()
	date:string
	// @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
	// user: User
}

export const PostSchema = SchemaFactory.createForClass(Post)