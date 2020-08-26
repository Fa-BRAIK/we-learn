import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/signup.dto'
import { SignInDto } from './dto/signin.dto'

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
}
