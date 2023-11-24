import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt'

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: [true, 'Please provide username'] })
  username: string;

  @Prop({ required: [true, 'Please provide email'], unique: [true, 'Email already exist'] })
  email: string;

  @Prop({ required: [true, 'Please provide password'] })
  password: string;

  @Prop({ required: [true, 'Please provide phoneNumber'] })
  phoneNumber: string;

  @Prop()
  address: string

  comparePassword: Function
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
  return await bcrypt.compare(password, this.password)
}