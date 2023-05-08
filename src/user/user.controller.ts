import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/createUser.dto";
import mongoose from "mongoose";
import {CreatePostDto} from "./dto/createPost.dto";

@Controller('/user')
export class UserController {
	constructor(private userService: UserService) {
	}

	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.userService.create(dto)
	}

	@Get(':id')
	getUser(@Param('id') id: mongoose.Schema.Types.ObjectId) {
		return this.userService.getUser(id)
	}

	@Post('/post')
	addPost(@Body() dto: CreatePostDto) {
		return this.userService.addPost(dto)
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