import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";

@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
  imports:[UserModule]
})
export class PeopleModule {}
