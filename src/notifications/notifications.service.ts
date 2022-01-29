import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/user.entity'
import { CreateNotificationDto } from './dtos/create-notification-dto'
import { Notification } from './notification.entity'
import { NotificationsRepository } from './notifications.repository'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationsRepository)
    private notificationsRepository: NotificationsRepository
  ) {}

  async getNotifications(user: User): Promise<Notification[]> {
    return this.notificationsRepository.getNotifications(user)
  }

  async createNotification(
    createNotificationDto: CreateNotificationDto,
    email: string
  ): Promise<void> {
    return this.notificationsRepository.createNotification(createNotificationDto, email)
  }
}
