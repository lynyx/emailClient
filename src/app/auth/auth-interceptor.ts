import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq);
      // .pipe(
      //   filter(val => val.type === HttpEventType.Response), // For demonstration purpose
      //   tap(val => {
      //     if (val.type === HttpEventType.Sent) {
      //       console.log('Request has been sent to the server.');
      //     }
      //
      //     if (val.type === HttpEventType.Response) {
      //       console.log('Response from server: ', val)
      //     }
      //   })
      // );
  }
}
