import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from "./users.response.dto";


type queryPage = {
  page: string
}

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) { }

  @Get()
  async getAllUsers(@Query() query: queryPage) {
    this.logger.log('Get all users');
    const users = await this.userService.findAll(+query.page || 0);
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }
}
