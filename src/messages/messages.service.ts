import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { CreateMessageDto } from './dtos/create-message-dto'
import { Message } from './message.model'

@Injectable()
export class MessagesService {
  private messages: Message[] = []

  getAllMessages(): Message[] {
    return this.messages
  }

  getMessageById(id: string): Message {
    const found = this.messages.find((message) => message.id === id)

    if (!found) throw new NotFoundException(`Message with id "${id}" not found`)

    return found
  }

  createMessage(createMessageDto: CreateMessageDto): Message {
    const { from, to, note } = createMessageDto

    const message: Message = {
      id: uuid(),
      from,
      to,
      note,
    }

    this.messages.push(message)

    return message
  }
}
