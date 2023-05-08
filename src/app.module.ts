import {Module} from "@nestjs/common";
import {UserModule} from "./user/user.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
imports:[MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.hr4nj2z.mongodb.net/musicApp?retryWrites=true&w=majority')
	,UserModule]
})

export class AppModule {}