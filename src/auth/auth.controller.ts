import { Post, Get, Controller, Body, HttpException, HttpStatus, ValidationPipe, Req, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { Public } from './constants'

@ApiBearerAuth()
@ApiTags('auth')
@Controller()
export class AuthController {
  // Inject authservice
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/auth/login')
  // Pipe validation request body
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    const { accessToken, user, refreshToken } = await this.authService.login(loginDto)
    return {
      message: 'SUCCESS',
      data: user,
      accessToken,
      refreshToken
    }
  }

  @Public()
  @Post('/auth/register')
  // Pipe validation request body
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto)
    return {
      message: 'SUCCESS',
      data: user
    }
  }

  @Public()
  @Post('/auth/refresh')
  // Pipe validation request body
  async refreshToken(@Body(new ValidationPipe()) rfToken: RefreshTokenDto) {
    const newToken = await this.authService.refreshToken(rfToken)
    return {
      message: 'SUCCESS',
      data: newToken
    }
  }

  @Get('/profile')
  async getProfile(@Req() req: Request) {
    const user = await this.authService.getProfile(req['userId'])
    if (!user) {
      throw new HttpException('INVALID_USER', HttpStatus.BAD_REQUEST)
    }
    return {
      message: 'SUCCESS',
      data: user
    }
  }
}