import { IsNotEmpty, IsString } from 'class-validator'

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  public readonly from: string

  @IsString()
  @IsNotEmpty()
  public readonly to: string

  @IsString()
  @IsNotEmpty()
  public readonly note: string
}
