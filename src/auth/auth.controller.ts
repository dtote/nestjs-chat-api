import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dtos/create-user-dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO: añadir validaciones, si el email existe, da error
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto)
  }
}
