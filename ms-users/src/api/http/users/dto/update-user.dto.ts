import {IsDefined, IsNumber, IsString, MinLength} from 'class-validator';

export class UpdateUserDto {
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
