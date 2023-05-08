import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Post, PostDocument} from "./schemas/post.schema";
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/createUser.dto";
import mongoose from "mongoose";
import {CreatePostDto} from "./dto/createPost.dto";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
							@InjectModel(Post.name) private postModel: Model<PostDocument>) {
	}

	async create(dto: CreateUserDto): Promise<User> {
		const user = await this.userModel.create({...dto, friends: [], posts: []})
		return user
	}

	async getUser(id: mongoose.Schema.Types.ObjectId): Promise<User> {
		const user = await this.userModel.findById(id)
		return user
	}

	async addPost(dto: CreatePostDto): Promise<User> {
		const user = await this.userModel.findById(dto.userId)
		const post = await this.postModel.create({...dto})
		// @ts-ignore
		user.posts.push(post)
		await user.save()
		return user
	}

	async addFriend(id: mongoose.Schema.Types.ObjectId, friendId: mongoose.Schema.Types.ObjectId):Promise<User> {
		const user = await this.userModel.findById(id);
		// @ts-ignore
		user.friends.push(friendId)
		await user.save();
		return user
	}

	async deleteFriend(id: mongoose.Schema.Types.ObjectId, friendId: mongoose.Schema.Types.ObjectId):Promise<User> {
		const user = await this.userModel.findById(id);
		// @ts-ignore
		user.friends=user.friends.filter(el=>el!==friendId)
		await user.save();
		return user
	}
}