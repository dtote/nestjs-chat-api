import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public readonly email: string

  @IsString()
  @IsNotEmpty()
  public readonly password: string

  @IsString()
  @IsNotEmpty()
  public readonly username: string
}
