import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Post, PostDocument} from "./schemas/post.schema";
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/createUser.dto";
import mongoose from "mongoose";
import {CreatePostDto} from "./dto/createPost.dto";
import {FileService} from "../file/file.service";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
							@InjectModel(Post.name) private postModel: Model<PostDocument>,
							private fileService: FileService) {
	}

	async create(dto: CreateUserDto, file): Promise<User> {
		const imagePath = this.fileService.createFile(file)
		const user = await this.userModel.create({
			...dto,
			friends: [], posts: [], avatar: imagePath || ''
		})
		return user
	}

	async getUser(id: mongoose.Schema.Types.ObjectId): Promise<User> {
		const user = await this.userModel.findById(id)
		return user
	}

	async addPost(dto: CreatePostDto, file): Promise<Post> {
		const user = await this.userModel.findById(dto.userId)
		const imagePath = file.picture ? this.fileService.createFile(file.picture[0]) : ''
		const post = await this.postModel.create({
			text: dto.text,
			date: dto.date,
			userId: user._id,
			userName: user.name,
			picture: imagePath
		})
		// @ts-ignore
		!user.posts ? user.posts = [post] : user.posts.unshift(post)
		await user.save()
		return post
	}

	async addFriend(id: mongoose.Schema.Types.ObjectId, friendId: mongoose.Schema.Types.ObjectId): Promise<User> {
		const user = await this.userModel.findById(id);
		// @ts-ignore
		user.friends.push(friendId)
		await user.save();
		return user
	}

	async deleteFriend(id: mongoose.Schema.Types.ObjectId, friendId: mongoose.Schema.Types.ObjectId): Promise<User> {
		const user = await this.userModel.findById(id);
		// @ts-ignore
		user.friends = user.friends.filter(el => el !== friendId)
		await user.save();
		return user
	}

	async getUserByEmail(email: string) {
		const user = await this.userModel.findOne({email}, {include: {all: true}})
		console.log('getUserByEmail', user)
		return user
	}

}