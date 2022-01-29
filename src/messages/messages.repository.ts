import { EntityRepository, Repository } from 'typeorm'
import { User } from '../users/user.entity'
import { CreateMessageDto } from './dtos/create-message-dto'
import { Message } from './message.entity'

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {
  async createMessage(createMessageDto: CreateMessageDto, user: User): Promise<Message> {
    const { to, note } = createMessageDto

    const message = this.create({
      from: user.email,
      to,
      note,
    })

    await this.save(message)

    return message
  }

  async getAllMessages(user: User): Promise<Message[]> {
    const { email } = user

    const query = this.createQueryBuilder('message')
    query.andWhere('message.to = :to', { to: email })

    const messages = await query.getMany()

    return messages
  }
}
