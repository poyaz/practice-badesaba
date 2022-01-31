import {Injectable} from '@nestjs/common';
import {IIdentifierGenerator} from '../../core/interface/i-identifier-generator.interface';
import * as uuid from 'uuid';

@Injectable()
export class UuidIdentifierGenerator implements IIdentifierGenerator {
  generateId(): string {
    return uuid.v4();
  }
}
