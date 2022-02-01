import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {catchError, Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class MessageTransformInterceptor implements NestInterceptor<any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(([error, result]) => {
        if (error) {
          error['error'] = (error as Error).message.toString();
          return {error: error as Error};
        }

        return {result};
      }),
    );
  }
}
