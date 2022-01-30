import {IsAlphanumeric, IsDefined, IsString, MinLength} from 'class-validator';

export class ChangePasswordUserDto {
  @IsDefined()
  @IsString()
  @MinLength(6)
  @IsAlphanumeric()
  password: string;
}
