import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { MessagesModule } from './messages/messages.module'
import { NotificationsModule } from './notifications/notifications.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule, AuthModule, NotificationsModule, MessagesModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
