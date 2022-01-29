import { Body, Controller, Get, Patch, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateUserDto } from './dtos/create-user-dto'
import { GetUserDto } from './dtos/get-user-dto'
import { LoginUserDto } from './dtos/login-user-dto'
import { UpdateProfileDto } from './dtos/update-profile-dto'
import { UserStatus } from './enums/user-status'
import { GetUser } from './get-user.decorator'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersServices.register(createUserDto)
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.usersServices.login(loginUserDto)
  }

  @Put('/me')
  @UseGuards(AuthGuard())
  updateProfile(@Body() updateProfileDto: UpdateProfileDto, @GetUser() user: User): Promise<void> {
    return this.usersServices.updateProfile(updateProfileDto, user)
  }

  @Patch('/me')
  @UseGuards(AuthGuard())
  updateStatus(@Body('status') status: UserStatus, @GetUser() user: User): Promise<void> {
    return this.usersServices.updateStatus(status, user)
  }

  @Get()
  getUsersList(): Promise<GetUserDto[]> {
    return this.usersServices.getUsersList()
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: User): Promise<GetUserDto> {
    return this.usersServices.getProfile(user)
  }
}
