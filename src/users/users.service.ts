import { Injectable } from '@nestjs/common'
import { User } from '../shared/models/user.model'
import { UserStatus } from './../shared/enums/user-status'
import { UpdateStatusDto } from './dtos/update-status-dto'

@Injectable()
export class UsersService {
  private users: User[] = []

  getUsersList(): User[] {
    return this.users.filter((user) => user.status === UserStatus.ACTIVE)
    //   .map((user) => new GetUserDto({ ...user }))
  }

  // necesito saber que user soy
  getProfile(): User {
    return this.users[0]
  }

  // necesito saber que user soy
  updateStatus(updateStatusDto: UpdateStatusDto): User {
    return this.users[0]
  }

  // necesito saber que user soy
  updateProfile(): User {
    return this.users[0]
  }
}
