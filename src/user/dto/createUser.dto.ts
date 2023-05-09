import {Prop} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Post} from "../schemas/post.schema";

export class CreateUserDto{
	readonly name;
	readonly age;
	readonly education;
	readonly city;
	readonly password;
	readonly email
}