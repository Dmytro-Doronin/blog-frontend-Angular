import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { Observable, throwError } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { addAuthAlert, logOut, setAccessToken } from '../../store/actions/auth.actions'
import { AuthService } from '../services/auth.service'
import { setAutoLogOut } from '../../store/actions/app.actions'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken')
    const clonedReq = accessToken
      ? req.clone({
          setHeaders: { Authorization: `Bearer ${accessToken}` },
        })
      : req

    return next.handle(clonedReq).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.authService.sendRefreshToken().pipe(
            switchMap((response: any) => {
              const newToken = response.accessToken
              if (typeof newToken === 'string') {
                localStorage.setItem('accessToken', newToken)
                // const newAccessToken = localStorage.getItem('accessToken')
                this.store.dispatch(setAccessToken({ accessToken: newToken }))
              }

              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              })
              return next.handle(retryReq)
            }),
            catchError(refreshError => {
              const message = refreshError?.error?.message || 'Can not update token'
              if (message === 'Can not update token') {
                this.store.dispatch(setAutoLogOut({ autoLogOut: true }))
                localStorage.removeItem('accessToken')
              } else {
                this.store.dispatch(addAuthAlert({ severity: 'error', message }))
              }
              return throwError(() => refreshError)
            })
          )
        }

        const message = error?.message
        this.store.dispatch(addAuthAlert({ severity: 'error', message }))
        return throwError(() => error)
      })
    )
  }
}
