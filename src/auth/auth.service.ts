import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from 'src/users/users.repository'
import { JwtService } from '@nestjs/jwt'
import { SignUpDto } from './dto/signup.dto'
import { JwtPayload } from './jwt-payloard.interface'
import { SignInDto } from './dto/signin.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    await this.usersRepository.signUp(signUpDto)
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const username = await this.usersRepository.validatePassword(signInDto)

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials')
    }

    const payload: JwtPayload = { username },
      access_token: string = await this.jwtService.sign(payload)

    return { access_token }
  }
}
