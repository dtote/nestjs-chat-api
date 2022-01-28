import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { UserStatus } from '../shared/enums/user-status'
import { User } from '../shared/models/user.model'
import { CreateUserDto } from './dtos/create-user-dto'
import { LoginUserDto } from './dtos/login-user-dto'

@Injectable()
export class AuthService {
  private users: User[] = []

  register(createUserDto: CreateUserDto): User {
    const { email, username, password } = createUserDto

    const user: User = {
      id: uuid(),
      email,
      username,
      password,
      status: UserStatus.ACTIVE,
    }

    this.users.push(user)

    return user
    // return new GetUserDto({ ...user })
  }

  login(loginUserDto: LoginUserDto): User {
    const { email, password } = loginUserDto

    const foundUser: User = this.users.find(
      (user) => user.email === email && user.password === password
    )

    if (!foundUser) throw new Error('Email already exists')

    // Status should be active when logged in

    // Should return a token instead of the user
    return foundUser
    // return new GetUserDto({ ...user })
  }
}
