import { UserStatus } from '../enums/user-status'

export interface User {
  id: string
  email: string
  password: string
  username: string
  status: UserStatus
}
