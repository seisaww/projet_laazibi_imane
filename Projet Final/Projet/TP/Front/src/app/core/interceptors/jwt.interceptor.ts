import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../shared/states/auth-state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    const accessToken = this.store.selectSnapshot(AuthState.accessToken);
    
    if (accessToken && !request.url.includes('/auth/login')) 
      {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}