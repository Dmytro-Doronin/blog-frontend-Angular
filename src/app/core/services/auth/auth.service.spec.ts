import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { AuthService } from './auth.service'

import { baseVercelUrl } from '../services-variable'

describe('AuthService', () => {
  let service: AuthService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    })
    service = TestBed.inject(AuthService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should send login request with credentials', () => {
    service.userLogin('user', 'pass').subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/auth/login`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({ loginOrEmail: 'user', password: 'pass' })
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should send registration request', () => {
    service.userRegistration('user', 'pass', 'user@example.com').subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/auth/registration`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({
      login: 'user',
      password: 'pass',
      email: 'user@example.com',
    })
    req.flush({})
  })

  it('should confirm password with code', () => {
    service.passwordConfirmation('1234').subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/auth/registration-confirmation`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({ code: '1234' })
    req.flush({})
  })

  it('should send password recovery request', () => {
    service.sendPasswordRecovery('user@example.com').subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/auth/password-recovery`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({ email: 'user@example.com' })
    req.flush({})
  })

  it('should resend email confirmation', () => {
    service.emailResending('user@example.com').subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/auth/registration-email-resending`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({ email: 'user@example.com' })
    req.flush({})
  })

  it('should send new password with recovery code', () => {
    service.newPassword('newpass', 'recoveryCode').subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/auth/new-password`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({
      newPassword: 'newpass',
      recoveryCode: 'recoveryCode',
    })
    req.flush({})
  })

  it('should update user data with formData and file', () => {
    const fakeFile = new File([''], 'avatar.png', { type: 'image/png' })
    service.changeUserData('newLogin', fakeFile).subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/users`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.body instanceof FormData).toBeTrue()
    expect(req.request.withCredentials).toBeTrue()
    req.flush({ login: 'newLogin', imageUrl: 'url' })
  })

  it('should update user data without file', () => {
    service.changeUserData('newLogin', null).subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/users`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.body instanceof FormData).toBeTrue()
    expect(req.request.withCredentials).toBeTrue()
    req.flush({ login: 'newLogin', imageUrl: '' })
  })

  it('should send refresh token request', () => {
    service.sendRefreshToken().subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/auth/refresh-token`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({})
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should get user data with me()', () => {
    service.me().subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/auth/me`)
    expect(req.request.method).toBe('GET')
    req.flush({})
  })

  it('should send logout request', () => {
    service.logOut().subscribe()
    const req = httpMock.expectOne(`${baseVercelUrl}/auth/logout`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({})
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })
})
