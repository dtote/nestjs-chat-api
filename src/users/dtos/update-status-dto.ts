import { IsEnum, IsNotEmpty } from 'class-validator'
import { UserStatus } from '../../shared/enums/user-status'

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(UserStatus)
  public readonly status: string
}
