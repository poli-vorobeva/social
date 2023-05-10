import {Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/createUser.dto";
import mongoose from "mongoose";
import {CreatePostDto} from "./dto/createPost.dto";
import {JwtService} from "@nestjs/jwt";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('/user')
export class UserController {
	constructor(private userService: UserService) {
	}

	@Get(':id')
	getUser(@Param('id') id: mongoose.Schema.Types.ObjectId) {
		return this.userService.getUser(id)
	}


	@Post('/post')
	@UseInterceptors(FileFieldsInterceptor([
		{name: 'picture', maxCount: 1}
	]))
	addPost(@UploadedFiles() files, @Body() dto: CreatePostDto) {

		return this.userService.addPost(dto,files)
	}

	@Post('/friend/:id')
	addFriend(@Param('id') id: mongoose.Schema.Types.ObjectId,
						@Body() friendId: mongoose.Schema.Types.ObjectId) {
		return this.userService.addFriend(id, friendId)
	}

	@Delete('/friend/:id')
	deleteFriend(@Param('id') id: mongoose.Schema.Types.ObjectId,
							 @Body() friendId: mongoose.Schema.Types.ObjectId) {
		return this.userService.deleteFriend(id, friendId)
	}

}