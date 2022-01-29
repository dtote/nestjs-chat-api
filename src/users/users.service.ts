import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dtos/create-user-dto'
import { GetUserDto } from './dtos/get-user-dto'
import { JwtPayload } from './dtos/jwt-payload.interface'
import { LoginUserDto } from './dtos/login-user-dto'
import { UpdateProfileDto } from './dtos/update-profile-dto'
import { UserStatus } from './enums/user-status'
import { User } from './user.entity'
import { UsersRepository } from './users.repository'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<void> {
    return this.usersRepository.createUser(createUserDto)
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto
    const user = await this.usersRepository.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email }
      const accessToken: string = await this.jwtService.sign(payload)
      return { accessToken }
    } else throw new UnauthorizedException('Email or password are incorrect')
  }

  async updateProfile(updateProfileDto: UpdateProfileDto, user: User): Promise<void> {
    return this.usersRepository.updateUser(updateProfileDto, user)
  }

  async updateStatus(status: UserStatus, user: User): Promise<void> {
    const found = await this.usersRepository.getUserById(user.id)

    found.status = status
    await this.usersRepository.save(found)
  }

  async getUsersList(): Promise<GetUserDto[]> {
    const activeUsers = await this.usersRepository.getUsersList()

    return activeUsers.map((user) => new GetUserDto({ ...user }))
  }

  async getProfile(user: User): Promise<GetUserDto> {
    const userData = await this.usersRepository.getProfile(user)

    return new GetUserDto({ ...userData })
  }
}
