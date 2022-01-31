import {IsAlphanumeric, IsDefined, IsEmail, IsNumber, IsString, MinLength} from 'class-validator';

export class AddUserDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  @IsAlphanumeric()
  password: string;

  @IsDefined()
  @IsString()
  @MinLength(3)
  name: string;

  @IsDefined()
  @IsString()
  @MinLength(3)
  family: string;

  @IsNumber()
  age: number;

  @IsString()
  info: string;
}
