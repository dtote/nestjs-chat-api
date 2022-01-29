import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NotificationsRepository } from '../notifications/notifications.repository'
import { UserStatus } from '../users/enums/user-status'
import { User } from '../users/user.entity'
import { UsersRepository } from '../users/users.repository'
import { CreateMessageDto } from './dtos/create-message-dto'
import { Message } from './message.entity'
import { MessagesRepository } from './messages.repository'

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesRepository) private messagesRepository: MessagesRepository,
    @InjectRepository(NotificationsRepository)
    private notificationsRepository: NotificationsRepository,
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository
  ) {}

  getAllMessages(user: User): Promise<Message[]> {
    return this.messagesRepository.getAllMessages(user)
  }

  async createMessage(createMessageDto: CreateMessageDto, user: User): Promise<Message> {
    const { to } = createMessageDto
    const found = await this.usersRepository.findOne({ email: to })

    if (!found) throw new NotFoundException(`User with email ${to} doesn't exist`)

    const createdMessage = await this.messagesRepository.createMessage(createMessageDto, user)

    if (found.status === UserStatus.ACTIVE) {
      const newNotification = {
        messageId: createdMessage.id,
        note: `McFly App: Message received from ${createdMessage.from}`,
      }

      this.notificationsRepository.createNotification(newNotification, user.email)
    }

    return createdMessage
  }
}
