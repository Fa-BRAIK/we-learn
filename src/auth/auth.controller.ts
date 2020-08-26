import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/signup.dto'
import { SignInDto } from './dto/signin.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator'
import { User } from 'src/users/user.entity'
import { AuthUserDto } from './dto/auth-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signup')
  public async signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto,
  ): Promise<void> {
    await this.service.signUp(signUpDto)
  }

  @Post('signin')
  public async signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    return await this.service.signIn(signInDto)
  }

  @Post('user')
  @UseGuards(AuthGuard())
  public async currentUser(@GetUser() user: User): Promise<AuthUserDto> {
    return { ...user, password: undefined, salt: undefined }
  }
}
