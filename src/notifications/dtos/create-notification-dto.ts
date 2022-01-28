import { IsNotEmpty, IsString } from 'class-validator'

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  public readonly messageId: string

  @IsString()
  @IsNotEmpty()
  public readonly note: string
}
