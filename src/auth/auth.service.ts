import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User, type UserDocument } from '../user/schemas/user.schema'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { JwtService  } from '@nestjs/jwt'
import { SERVER_REFRESH_SECRET_KEY } from './constants'

@Injectable()
export class AuthService {
  constructor(
    // Inject depedencies
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService 
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userModel.findOne({ email: registerDto.email })
    if (existingUser) {
      throw new HttpException('Email is already registered', HttpStatus.BAD_REQUEST)
    }
    const user = await this.userModel.create(registerDto)
    user.password = undefined
    return user
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email })
    if (!user) {
      throw new UnauthorizedException()
    }
    const isMatch = await user.comparePassword(loginDto.password)
    if (!isMatch) {
      throw new UnauthorizedException()
    }
    const payload = { userId: user._id }
    const accessToken = await this.jwtService.signAsync(payload)
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d', secret: SERVER_REFRESH_SECRET_KEY })
    user.password = undefined
    return {
      accessToken,
      refreshToken,
      user
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const decoded = await this.jwtService.verifyAsync<{ userId: string}>(refreshTokenDto.refreshToken, { secret: SERVER_REFRESH_SECRET_KEY })
      const { userId } = decoded
      const newToken = await this.jwtService.signAsync({ userId })
      return newToken
    } catch (error) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED)
    }
  }

  async getProfile(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId)
    return user
  }
}