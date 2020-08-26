import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { JwtPayload } from './jwt-payloard.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from 'src/users/users.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly userRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'QW8wop5Ki7', // Ai3~aKj@]j@Q'jP10m6k,X,qmP[*+rkw_HYY`mtlXDLFL'g$&<b$m0-1IEs4_aK
    })
  }

  async validate(payload: JwtPayload) {
    const { username } = payload
    const user = await this.userRepository.findOne({ username })

    if (!user) throw new UnauthorizedException()

    return user
  }
}
