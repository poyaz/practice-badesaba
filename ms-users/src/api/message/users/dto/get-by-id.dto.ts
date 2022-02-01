import {IsDefined, IsUUID,} from 'class-validator';

export class GetByIdDto {
  @IsDefined()
  @IsUUID()
  id: string;
}
