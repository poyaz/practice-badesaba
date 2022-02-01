import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ErrorHandler} from '../error-handler';

@Injectable()
export class TransformInterceptor implements NestInterceptor<any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => {
      if (data.error) {
        throw ErrorHandler.throwError(data.error);
      }

      return data.result;
    }));
  }
}
