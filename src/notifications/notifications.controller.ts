import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateNotificationDto } from './dtos/create-notification-dto'
import { Notification } from './notification.model'
import { NotificationsService } from './notifications.service'

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  getNotifications(): Notification[] {
    return this.notificationsService.getNotifications()
  }

  // This endpoints is useless since all notifications are created at the same time as messages, this is used just for test purpose
  @Post()
  createNotification(@Body() createNotificationDto: CreateNotificationDto): Notification {
    return this.notificationsService.createNotification(createNotificationDto)
  }
}
