import {Body, Controller, Get, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/createUser.dto";
import {FileFieldsInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {JwtService} from "@nestjs/jwt";

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {
	}

	// @Post('/isAuth')
	// encodeToken(@Body() token: { token: string }) {
	// 	return this.authService.encodeToken(token.token)
	// }

	@Post('/login')
	login(@Body() loginData: { email: string, password: string }) {
		const login = this.authService.login(loginData)
		return login
	}

	@Post('/registration')
	@UseInterceptors(FileFieldsInterceptor([
		{name: 'avatar', maxCount: 1}
	]))
	registration(@UploadedFiles() files, @Body() userDto: CreateUserDto) {
		const fromReg = this.authService.registration(userDto, files)
		return fromReg
	}
}
