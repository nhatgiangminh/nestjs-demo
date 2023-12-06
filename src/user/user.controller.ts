import { Controller, Get, Put, Param, Body, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/updateUser.dto'

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private userService: UserService){}

  @Get('/users')
  async getAllUser() {
    const users = await this.userService.getAllUser()
    return {
      message: 'SUCCESS',
      data: users
    }
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id)
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST)
    }
    return {
      message: 'SUCCESS',
      data: user
    }
  }

  @Put('/users/:id')
  async updateUser(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(id, updateUserDto)
    return {
      message: 'SUCCESS',
      data: user
    }
  }
}