import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) { }

  // get list of all users
  async findAll(page: number): Promise<UsersEntity[]> {
    const amount = 20;
    return await this.usersRepo.find(
      {
        skip: page * amount,
        take: amount
      }
    );
  }
}
