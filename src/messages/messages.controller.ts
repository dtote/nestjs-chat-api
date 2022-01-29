import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../users/decorators/get-user.decorator'
import { User } from '../users/user.entity'
import { CreateMessageDto } from './dtos/create-message-dto'
import { Message } from './message.entity'
import { MessagesService } from './messages.service'
@Controller('messages')
@UseGuards(AuthGuard())
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  getAllMessages(@GetUser() user: User): Promise<Message[]> {
    return this.messagesService.getAllMessages(user)
  }

  @Post()
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @GetUser() user: User
  ): Promise<Message> {
    return this.messagesService.createMessage(createMessageDto, user)
  }
}
