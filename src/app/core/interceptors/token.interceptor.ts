import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { Observable, throwError } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { addAuthAlert, setAccessToken } from '../../store/actions/auth.actions'
import { AuthService } from '../services/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const secureEndpoints = [
      'https://blog-backend-nest.vercel.app/auth/me',
      'http://localhost:3000/auth/me',
    ]

    const isSecureEndpoint = secureEndpoints.some(endpoint => req.url.includes(endpoint))
    if (this.isPostToBlogOrPost(req) || isSecureEndpoint) {
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
                  const newAccessToken = localStorage.getItem('accessToken')
                  this.store.dispatch(setAccessToken({ accessToken: newToken }))
                }

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
      return next.handle(req)
    }
  }
  private isPostToBlogOrPost(req: HttpRequest<any>): boolean {
    const postUrls = ['http://localhost:3000/blogs', 'http://localhost:3000/posts']
    return postUrls.includes(req.url) && req.method === 'POST'
  }
}
