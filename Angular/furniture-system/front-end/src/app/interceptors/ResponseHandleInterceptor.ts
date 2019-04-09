import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandleInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(tap((success) => {
        if (success instanceof HttpResponse) {
          if (success.url.endsWith('login')
            || success.url.endsWith('register')
            || success.url.endsWith('create')
            || success.url.includes('delete')) {
            this.toastrService.success(success.body.message);
          }
        }

      }), catchError(error => {
        this.toastrService.error(error.message);
        throw error;
      }));
  }
}
