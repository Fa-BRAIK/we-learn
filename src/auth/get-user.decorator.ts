import { createParamDecorator } from '@nestjs/common'
import { User } from 'src/users/user.entity'

export const GetUser = createParamDecorator(
  (data, req): User => req.args[0].user,
)
