import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message-dto'
import { Message } from './message.model'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  getAllMessages(): Message[] {
    return this.messagesService.getAllMessages()
  }

  @Get('/:id')
  getMessageById(@Param('id') id: string): Message {
    return this.messagesService.getMessageById(id)
  }

  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto): Message {
    return this.messagesService.createMessage(createMessageDto)
  }
}
