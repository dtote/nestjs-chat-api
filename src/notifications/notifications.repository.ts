import { EntityRepository, Repository } from 'typeorm'
import { User } from '../users/user.entity'
import { CreateNotificationDto } from './dtos/create-notification-dto'
import { Notification } from './notification.entity'

@EntityRepository(Notification)
export class NotificationsRepository extends Repository<Notification> {
  async createNotification(
    createNotificationDto: CreateNotificationDto,
    email: string
  ): Promise<void> {
    const { messageId, note } = createNotificationDto

    const notification = this.create({
      messageId,
      note,
      to: email,
    })

    this.save(notification)
  }

  async getNotifications(user: User): Promise<Notification[]> {
    const { email } = user

    const query = this.createQueryBuilder('notification')
    query.andWhere('notification.to = :to', { to: email })

    const notifications = await query.getMany()

    return notifications
  }
}
