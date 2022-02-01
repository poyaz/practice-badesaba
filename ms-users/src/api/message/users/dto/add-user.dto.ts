import {Allow, IsDefined, IsEmail, IsEmpty, IsNumber, IsOptional, IsString, Min, MinLength} from 'class-validator';

export class AddUserDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(3)
  name: string;

  @IsDefined()
  @IsString()
  @MinLength(3)
  family: string;

  @IsNumber()
  @Min(18)
  age: number;

  @IsString()
  info: string | null;
}
