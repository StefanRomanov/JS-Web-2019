import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('token');
    let authHeader;

    if (token && token.length) {
      authHeader = {Authorization: `Bearer ${token}`};
    } else {
      authHeader = {};
    }

    req = req.clone({
      setHeaders: {
        Accept: 'application/json',
        ...authHeader
      }
    });
    return next.handle(req);
  }
}
