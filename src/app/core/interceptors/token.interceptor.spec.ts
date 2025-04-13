import { TestBed } from '@angular/core/testing'
import { TokenInterceptor } from './token.interceptor'
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Store } from '@ngrx/store'
import { of, throwError } from 'rxjs'
import { AuthService } from '../services/auth/auth.service'
import { addAuthAlert, setAccessToken } from '../../store/actions/auth.actions'
import { setAutoLogOut } from '../../store/actions/app.actions'

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController
  let http: HttpClient
  let authService: jasmine.SpyObj<AuthService>
  let store: jasmine.SpyObj<Store>

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['sendRefreshToken'])
    store = jasmine.createSpyObj('Store', ['dispatch'])

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Store, useValue: store },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    })

    http = TestBed.inject(HttpClient)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
    localStorage.clear()
    store.dispatch.calls.reset()
  })

  it('should pass through login and refresh-token URLs without adding token', () => {
    http.get('/login').subscribe()
    const req = httpMock.expectOne('/login')
    expect(req.request.headers.has('Authorization')).toBeFalse()
    req.flush({})

    http.get('/refresh-token').subscribe()
    const req2 = httpMock.expectOne('/refresh-token')
    expect(req2.request.headers.has('Authorization')).toBeFalse()
    req2.flush({})
  })

  it('should add Authorization header if token is in localStorage', () => {
    localStorage.setItem('accessToken', 'mock-token')

    http.get('/secure').subscribe()
    const req = httpMock.expectOne('/secure')
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token')
    req.flush({})
  })

  it('should refresh token on 401 and retry the request', () => {
    localStorage.setItem('accessToken', 'expired-token')

    authService.sendRefreshToken.and.returnValue(of({ accessToken: 'new-token' }))

    http.get('/secure').subscribe()

    const req1 = httpMock.expectOne('/secure')
    expect(req1.request.headers.get('Authorization')).toBe('Bearer expired-token')

    req1.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' })

    const req2 = httpMock.expectOne('/secure')
    expect(req2.request.headers.get('Authorization')).toBe('Bearer new-token')
    req2.flush({})

    expect(store.dispatch).toHaveBeenCalledWith(setAccessToken({ accessToken: 'new-token' }))
  })

  it('should dispatch autoLogOut if refresh token fails with message', () => {
    localStorage.setItem('accessToken', 'old-token')

    authService.sendRefreshToken.and.returnValue(
      throwError(() => ({ error: { message: 'Can not update token' } }))
    )

    http.get('/secure').subscribe({
      error: () => {
        expect(store.dispatch).toHaveBeenCalledWith(setAutoLogOut({ autoLogOut: true }))
      },
    })

    const req1 = httpMock.expectOne('/secure')
    req1.flush({}, { status: 401, statusText: 'Unauthorized' })
  })

  it('should dispatch addAuthAlert on non-401 errors', () => {
    http.get('/secure').subscribe({
      error: () => {
        expect(store.dispatch).toHaveBeenCalledWith(
          addAuthAlert({
            severity: 'error',
            message: 'Http failure response for /secure: 500 Server Error',
          })
        )
      },
    })

    const req = httpMock.expectOne('/secure')
    req.flush({ message: 'Some other error' }, { status: 500, statusText: 'Server Error' })
  })
})
