import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, type UserDocument } from './schemas/user.schema'
import { UpdateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  async getAllUser() {
    const users = await this.userModel.find().select('-password -__v')
    return users
  }

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id).select('-password -__v')
      return user
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (!id) {
        throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST)
      }
      const user = await this.userModel.findByIdAndUpdate(id, { ...updateUserDto }, { new: true }).select('-password -__v')
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST)
      }
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
