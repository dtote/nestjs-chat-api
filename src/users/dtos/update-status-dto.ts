import { IsEnum, IsNotEmpty } from 'class-validator'
import { UserStatus } from '../enums/user-status'

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(UserStatus)
  public readonly status: UserStatus

  constructor(status: UserStatus) {
    this.status = status
  }
}
