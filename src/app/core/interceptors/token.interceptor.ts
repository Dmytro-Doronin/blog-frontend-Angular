import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { Observable, take, throwError } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { addAuthAlert, refreshToken, setAccessToken } from '../../store/actions/auth.actions'
import { selectAccessToken } from '../../store/selectors/auth.selector'
import { AuthService } from '../services/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectAccessToken).pipe(
      take(1), // Получаем accessToken один раз
      switchMap(accessToken => {
        // Если accessToken есть, клонируем запрос и добавляем токен в заголовки
        const clonedReq = accessToken
          ? req.clone({
              setHeaders: { Authorization: `Bearer ${accessToken}` },
            })
          : req

        return next.handle(clonedReq).pipe(
          catchError(error => {
            if (error.status === 401) {
              // Если токен истек, запрашиваем новый
              return this.authService.sendRefreshToken().pipe(
                switchMap((response: any) => {
                  // После получения нового токена сохраняем его и повторяем оригинальный запрос
                  const newToken = response.accessToken // Извлекаем accessToken из ответа

                  if (typeof newToken === 'string') {
                    // Сохраняем новый accessToken в стор
                    this.store.dispatch(setAccessToken({ accessToken: newToken }))
                  }
                  const retryReq = req.clone({
                    setHeaders: { Authorization: `Bearer ${newToken}` },
                  })
                  return next.handle(retryReq) // Повторяем запрос с новым токеном
                }),
                catchError(refreshError => {
                  // Если обновление токена не удалось, диспатчим сообщение об ошибке
                  const message = refreshError?.error?.message || 'Ошибка обновления токена'
                  this.store.dispatch(addAuthAlert({ severity: 'error', message }))
                  return throwError(() => refreshError) // Пробрасываем ошибку дальше
                })
              )
            }

            // Обрабатываем другие ошибки, если это не 401
            const message = error?.error?.message || 'Произошла ошибка'
            this.store.dispatch(addAuthAlert({ severity: 'error', message }))
            return throwError(() => error) // Пробрасываем ошибку дальше
          })
        )
      })
    )
  }
}
