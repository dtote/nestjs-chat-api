import { Body, Controller, Get, Patch, Put } from '@nestjs/common'
import { User } from '../shared/models/user.model'
import { UpdateStatusDto } from './dtos/update-status-dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  getUsersList(): User[] {
    return this.usersServices.getUsersList()
  }

  @Get('/me')
  getProfile(): User {
    return this.usersServices.getProfile()
  }

  @Patch('/me')
  updateStatus(@Body() updateStatusDto: UpdateStatusDto): User {
    return this.usersServices.updateStatus(updateStatusDto)
  }

  @Put('/me')
  updateProfile(): User {
    return this.usersServices.updateProfile()
  }
}
