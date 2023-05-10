import {Get, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user/schemas/user.schema";
import {Model} from "mongoose";
import {Post, PostDocument} from "../user/schemas/post.schema";
import {UserService} from "../user/user.service";

@Injectable()
export class PeopleService {
	constructor(private userService: UserService) {
	}
	async deleteFriend(friendId, userId){
		const user=await this.userService.deleteFriend(userId,friendId)
		return user
}
	async addFriend(id,friendId){
		const user=await this.userService.addFriend(id,friendId)
		return user
	}
	async getPeople(){
		const getPeople=await this.userService.getPeople()
		const peopleData=await getPeople.map(man=>{
			return {
				id:man._id,
				name:man.name,
				avatar:man.avatar
			}
		})
		return peopleData
	}
}
