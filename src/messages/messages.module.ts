import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationsRepository } from '../notifications/notifications.repository'
import { UsersModule } from '../users/users.module'
import { UsersRepository } from '../users/users.repository'
import { MessagesController } from './messages.controller'
import { MessagesRepository } from './messages.repository'
import { MessagesService } from './messages.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([MessagesRepository, UsersRepository, NotificationsRepository]),
    UsersModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
