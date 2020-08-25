import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repository: UsersRepository,
  ) {}
}
