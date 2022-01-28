import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { CreateNotificationDto } from './dtos/create-notification-dto'
import { Notification } from './notification.model'

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = []

  getNotifications(): Notification[] {
    return this.notifications
  }

  createNotification(createNotificationDto: CreateNotificationDto): Notification {
    const { messageId, note } = createNotificationDto

    const notification: Notification = {
      id: uuid(),
      messageId,
      note,
    }

    this.notifications.push(notification)

    return notification
  }
}
