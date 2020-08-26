import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { SignUpDto } from 'src/auth/dto/signup.dto'
import * as bcrypt from 'bcrypt'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { SignInDto } from 'src/auth/dto/signin.dto'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, password } = signUpDto

    const user = new User()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(password, user.salt)

    try {
      await user.save()
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists')
      } else throw new InternalServerErrorException()
    }
  }

  async validatePassword(signInDto: SignInDto): Promise<string> {
    const { username, password } = signInDto

    const user = await this.findOne({ username })

    if (user && user.validatePassword(password)) {
      return user.username
    }

    return null
  }
}
