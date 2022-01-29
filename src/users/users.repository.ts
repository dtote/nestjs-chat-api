import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDto } from './dtos/create-user-dto'
import { UpdateProfileDto } from './dtos/update-profile-dto'
import { UserStatus } from './enums/user-status'
import { User } from './user.entity'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { email, username, password } = createUserDto

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({
      email,
      username,
      password: hashedPassword,
    })

    try {
      await this.save(user)
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException('That email is already registered')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.findOne(id)

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`)
    }

    return found
  }

  async getUsersList(): Promise<User[]> {
    const query = this.createQueryBuilder('user')
    query.andWhere('user.status = :status', { status: UserStatus.ACTIVE })

    const activeUsers = await query.getMany()

    return activeUsers
  }

  async updateUser(updateProfileDto: UpdateProfileDto, user: User): Promise<void> {
    const { email, username } = updateProfileDto

    const updatedUser = this.create({
      id: user.id,
      email: email ? email : user.email,
      username: username ? username : user.username,
    })

    try {
      await this.save(updatedUser)
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException('That email is already registered')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async updateStatus(status: UserStatus, user: User): Promise<void> {
    const found = await this.findOne({ where: { user } })

    found.status = status

    await this.save(found)
  }

  async getProfile(user: User): Promise<User> {
    const found = await this.findOne({ where: { email: user.email } })

    return found
  }
}
