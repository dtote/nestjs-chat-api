import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  note: string

  @Column()
  to: string

  @Column()
  messageId: string
}
