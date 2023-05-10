import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PeopleService} from "./people.service";
import mongoose from "mongoose";

@Controller('/people')
export class PeopleController {
	constructor(private peopleService: PeopleService) {
	}

	@Get()
	getPeople() {
		return this.peopleService.getPeople()
	}

	@Post('/:id')
	addFriend(@Param('id') id: string,
						@Body() friendId: { friendId: string }) {
		return this.peopleService.addFriend(id, friendId.friendId)
	}
}
