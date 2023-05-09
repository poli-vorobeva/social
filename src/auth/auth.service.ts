import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/createUser.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../user/schemas/user.schema";

@Injectable()
export class AuthService {
	constructor(private userService: UserService,
							private jwtService: JwtService) {
	}

	async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto)
		//return this.generateToken(user)
		console.log(user, 'UUUUUUU')
		return user
	}

	async registration(userDto: CreateUserDto,file): Promise<{ token: string }> {
		const candidate = await this.userService.getUserByEmail(userDto.email)
		if (candidate) {
			throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
		}
		const hashPassword = await bcrypt.hash(userDto.password, 5)
		const user = await this.userService.create({...userDto, password: hashPassword},file.avatar[0])
		return this.generateToken(user)
	}

	async encodeToken(token: string) {
		const userEncode = this.jwtService.verify(token||'')
		const usId = await this.userService.getUserByEmail(userEncode.email)
console.log(usId._id,'usId')
		const userData=await this.userService.getUser(usId._id)
		console.log(userData,'usD')
		return userData
	}

	private async generateToken(user: User) {
		return {
			token: this.jwtService.sign({email: user.email, password: user.password})
		}
	}

	private async validateUser(userDto: CreateUserDto) {
		const userId = await this.userService.getUserByEmail(userDto.email)
		const user = await this.userService.getUser(userId._id)
		const passwordEquals = await bcrypt.compare(userDto.password, user.password)
		if (user && passwordEquals) {
			return user
		}
		throw new UnauthorizedException({message: 'Некорректный емейл или пароль'})
	}
}
