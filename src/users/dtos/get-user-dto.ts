import { UserStatus } from '../enums/user-status'

export class GetUserDto {
  public readonly email: string

  public readonly username: string

  public readonly status: UserStatus

  constructor(params: { email: string; username: string; status: UserStatus }) {
    this.email = params.email
    this.username = params.username
    this.status = params.status
  }
}
