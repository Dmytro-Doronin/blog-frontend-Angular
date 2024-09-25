import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { Observable, take, throwError } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { addAuthAlert, refreshToken, setAccessToken } from '../../store/actions/auth.actions'
import { selectAccessToken } from '../../store/selectors/auth.selector'
import { AuthService } from '../services/auth.service'

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(
//     private store: Store,
//     private authService: AuthService
//   ) {}
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return this.store.select(selectAccessToken).pipe(
//       take(1), // Получаем accessToken один раз
//       switchMap(accessToken => {
//         // Если accessToken есть, клонируем запрос и добавляем токен в заголовки
//         const clonedReq = accessToken
//           ? req.clone({
//               setHeaders: { Authorization: `Bearer ${accessToken}` },
//             })
//           : req
//
//         return next.handle(clonedReq).pipe(
//           catchError(error => {
//             if (error.status === 401) {
//               // Если токен истек, запрашиваем новый
//               return this.authService.sendRefreshToken().pipe(
//                 switchMap((response: any) => {
//                   // После получения нового токена сохраняем его и повторяем оригинальный запрос
//                   const newToken = response.accessToken // Извлекаем accessToken из ответа
//
//                   if (typeof newToken === 'string') {
//                     // Сохраняем новый accessToken в стор
//                     this.store.dispatch(setAccessToken({ accessToken: newToken }))
//                   }
//                   const retryReq = req.clone({
//                     setHeaders: { Authorization: `Bearer ${newToken}` },
//                   })
//                   return next.handle(retryReq) // Повторяем запрос с новым токеном
//                 }),
//                 catchError(refreshError => {
//                   // Если обновление токена не удалось, диспатчим сообщение об ошибке
//                   const message = refreshError?.error?.message || 'Ошибка обновления токена'
//                   this.store.dispatch(addAuthAlert({ severity: 'error', message }))
//                   return throwError(() => refreshError) // Пробрасываем ошибку дальше
//                 })
//               )
//             }
//
//             // Обрабатываем другие ошибки, если это не 401
//             const message = error?.error?.message || 'Произошла ошибка'
//             this.store.dispatch(addAuthAlert({ severity: 'error', message }))
//             return throwError(() => error) // Пробрасываем ошибку дальше
//           })
//         )
//       })
//     )
//   }
// }
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Список защищённых эндпоинтов, где требуется токен
    const secureEndpoints = [
      'https://blog-backend-nest.vercel.app/auth/me',
      'http://localhost:3000/auth/me',
      'http://localhost:3000/blogs',
    ]

    // Проверяем, является ли текущий запрос защищённым
    const isSecureEndpoint = secureEndpoints.some(endpoint => req.url.includes(endpoint))
    console.log('interceptor works')
    if (isSecureEndpoint) {
      // Если запрос защищённый, достаем accessToken из localStorage
      const accessToken = localStorage.getItem('accessToken')
      console.log(
        `Request URL: ${req.url}, Secure Endpoint: ${isSecureEndpoint}, Token: ${localStorage.getItem('accessToken')}`
      )

      // Если accessToken есть, добавляем его в заголовки запроса
      const clonedReq = accessToken
        ? req.clone({
            setHeaders: { Authorization: `Bearer ${accessToken}` },
          })
        : req

      return next.handle(clonedReq).pipe(
        catchError(error => {
          if (error.status === 401) {
            console.log(
              `Request URL: ${req.url}, Secure Endpoint: ${isSecureEndpoint}, Token: ${localStorage.getItem('accessToken')}`
            )
            console.log('hern9 token')
            // Если токен истек, пытаемся обновить токен
            return this.authService.sendRefreshToken().pipe(
              switchMap((response: any) => {
                const newToken = response.accessToken
                console.log('Error status below 401', error.status)
                // Сохраняем новый токен в localStorage
                if (typeof newToken === 'string') {
                  localStorage.setItem('accessToken', newToken)
                  console.log('токен пересохранен')
                  const newAccessToken = localStorage.getItem('accessToken')
                  console.log('new, access token', newAccessToken)
                  this.store.dispatch(setAccessToken({ accessToken: newToken }))
                }

                // Повторяем запрос с новым токеном
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` },
                })
                return next.handle(retryReq)
              }),
              catchError(refreshError => {
                const message = refreshError?.error?.message || 'Can not update token'
                this.store.dispatch(addAuthAlert({ severity: 'error', message }))
                return throwError(() => refreshError)
              })
            )
          }

          const message = error?.message
          this.store.dispatch(addAuthAlert({ severity: 'error', message }))
          return throwError(() => error)
        })
      )
    } else {
      // Если это публичный эндпоинт (например, для получения блогов), пропускаем запрос без изменений
      console.log(req)
      return next.handle(req)
    }
  }
}
