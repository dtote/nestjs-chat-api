import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../users/decorators/get-user.decorator'
import { User } from '../users/user.entity'
import { Notification } from './notification.entity'
import { NotificationsService } from './notifications.service'

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getNotifications(@GetUser() user: User): Promise<Notification[]> {
    return this.notificationsService.getNotifications(user)
  }
}
