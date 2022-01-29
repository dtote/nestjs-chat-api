import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class UpdateProfileDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string

  @MinLength(4)
  @MaxLength(30)
  @IsString()
  // 1 uppercase, 1 lowercase, 1 number or special character
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @IsOptional()
  password?: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  username?: string
}
