import { UserStatus } from '../../shared/enums/user-status'

export class GetUserDto {
  public readonly id: string

  public readonly email: string

  public readonly username: string

  public readonly status: UserStatus

  constructor(params: { id: string; email: string; username: string; status: UserStatus }) {
    this.id = params.id
    this.email = params.email
    this.username = params.username
    this.status = params.status
  }
}
