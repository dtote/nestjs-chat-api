import { IsNotEmpty, IsString } from 'class-validator'

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  public readonly messageId: string

  @IsString()
  @IsNotEmpty()
  public readonly note: string

  constructor(params: { messageId: string; note: string }) {
    this.messageId = params.messageId
    this.note = params.note
  }
}
