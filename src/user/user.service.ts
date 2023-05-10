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

	async getPeople() {
		const people = await this.userModel.find()
		return people
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
			picture: imagePath,
			likes: '0'
		})
		// @ts-ignore
		!user.posts ? user.posts = [post] : user.posts.unshift(post)
		await user.save()
		return post
	}

	async deleteFriend(userId: mongoose.Schema.Types.ObjectId, friendId: mongoose.Schema.Types.ObjectId) {
		const user = await this.userModel.findById(userId);
		user.friends=user.friends.filter(fr => !(fr.friendId==friendId))
		await user.save();
		console.log(user, '@@')
		return user
	}

	async addFriend(id: mongoose.Schema.Types.ObjectId, friendId: mongoose.Schema.Types.ObjectId): Promise<User> {
		const friend = await this.userModel.findById(friendId);
		const user = await this.userModel.findById(id);
		// @ts-ignore
		if (!user.friends.find(fr => fr.name == friend.name)) {
			user.friends.push({name: friend.name, friendId: friend._id, avatar: friend.avatar})
			await user.save();
			return user
		}
		return user
	}

	async getUserByEmail(email: string) {
		const user = await this.userModel.findOne({email}, {include: {all: true}})
		console.log('getUserByEmail', user)
		return user
	}

}