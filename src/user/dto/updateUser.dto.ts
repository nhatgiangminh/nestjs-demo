import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string

  @ApiProperty()
  @IsNotEmpty()
  address: string

  @ApiProperty()
  @IsNotEmpty()
  username: string
}