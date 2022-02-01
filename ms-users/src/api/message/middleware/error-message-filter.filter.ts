import {ArgumentsHost, Catch, RpcExceptionFilter} from '@nestjs/common';
import {RpcException} from '@nestjs/microservices';
import {Observable, of} from 'rxjs';

@Catch()
export class ErrorMessageFilterFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: Error, host: ArgumentsHost): Observable<any> {
    exception['error'] = exception.message.toString();

    return of({error: exception});
  }
}
