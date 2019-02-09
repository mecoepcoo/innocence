import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'JwtApp eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjAsIm5hbWUiOiIiLCJndWVzdCI6dHJ1ZSwiaWF0IjoxNTQ5NzE4NTc4LCJleHAiOjIwNjgxMTg1Nzh9.pZj5SX7xK-ejE9a_3D8QQMqvjExjG955Pn5W-Ec3CP4',
      }),
    })
    return next.handle(newReq).pipe(
      catchError(err => this.handleError(err)),
    );
  }

  private goto(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleError (error) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.error(error);
    return of(error);
  }
}