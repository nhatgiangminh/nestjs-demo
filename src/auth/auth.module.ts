import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/user/user.module";
import { SERVER_SECRET_KEY } from './constants'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: SERVER_SECRET_KEY,
      signOptions: { expiresIn: '2h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}