import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import {Post, PostSchema} from "./schemas/post.schema";
import {FileService} from "../file/file.service";

@Module({
	imports: [
		MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
		MongooseModule.forFeature([{name: Post.name, schema: PostSchema}])
	],
	controllers: [UserController],
	providers: [UserService,FileService],
	exports: [UserService]
})
export class UserModule {
}