import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [MongooseModule.forFeatureAsync(
    [
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema
          schema.pre('save', async function() {
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(this.password, salt)
            this.password = hash
          })
          return schema
        }
      }
    ]
  )],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule, UserService]
})
export class UsersModule {}