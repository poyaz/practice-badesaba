import {IsDefined, IsNumber, IsOptional, IsString, MinLength} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  family: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  info: string;
}
