import {IsAlphanumeric, IsDefined, IsNumber, IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class AddUserDto {
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(13)
  @Matches(/^[a-z]+[0-9a-z.]+$/i)
  username: string;

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
