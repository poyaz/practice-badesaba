import {IsDefined, IsNumber, IsOptional, IsString, IsUUID, MinLength} from 'class-validator';

export class UpdateUserDto {
  @IsDefined()
  @IsUUID()
  id: string;

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
