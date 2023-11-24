import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://0.0.0.0:27017/nest'), AuthModule, UsersModule ],
  controllers: [ AppController ],
  // Khai bao guard global
  providers: [ AppService,  { useClass: AuthGuard, provide: APP_GUARD }],
})
export class AppModule {}
