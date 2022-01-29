import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UserStatus } from './enums/user-status'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  username: string

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus
}
