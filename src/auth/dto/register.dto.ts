import { IsEmail, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string

  @IsEmail()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string

  @ApiProperty()
  address: string
}