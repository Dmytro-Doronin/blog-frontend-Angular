import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { refreshAccessToken } from './auth.actions'; // Экшен для обновления токена
import { selectAccessToken } from './auth.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectAccessToken).pipe(
      take(1), // Получаем текущий accessToken один раз
      switchMap(accessToken => {
        const clonedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${accessToken}` }
        });

        return next.handle(clonedReq).pipe(
          catchError(error => {
            if (error.status === 401) {
              // Если токен истек, запрашиваем новый
              return this.store.dispatch(refreshAccessToken());
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
