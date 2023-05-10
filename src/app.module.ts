import {Module} from "@nestjs/common";
import {UserModule} from "./user/user.module";
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import {FileModule} from "./file/file.module";
import * as path from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import { PeopleModule } from './people/people.module';

console.log(path.resolve(__dirname,'..','static'))

@Module({
imports:[
	ServeStaticModule.forRoot({
		rootPath:path.resolve(__dirname,'static')
	}),
	MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.hr4nj2z.mongodb.net/musicApp?retryWrites=true&w=majority')
	,UserModule, AuthModule,FileModule, PeopleModule
	]
})

export class AppModule {}