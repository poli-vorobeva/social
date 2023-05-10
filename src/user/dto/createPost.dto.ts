import {ObjectId} from "mongoose";

export class CreatePostDto{
	readonly text:string;
	readonly userId:ObjectId;
	readonly date:string;
}