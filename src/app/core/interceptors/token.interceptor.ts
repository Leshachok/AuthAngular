import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(this.authService.isLoggedIn){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
    }
    return next.handle(req).pipe(     
      tap(
        (event) => {
          if (event instanceof HttpResponse){
            console.log('Server response')
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401){
              
              this.authService.logout()
            }
          }
        }
      )
    )
  }

}