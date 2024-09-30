import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthMe } from '../../types/auth.models'

@Injectable({
  providedIn: 'root',
})

//https://blog-backend-nest.vercel.app/
//http://localhost:3000/
export class AuthService {
  constructor(private http: HttpClient) {}

  userLogin(loginOrEmail: string, password: string) {
    return this.http.post(
      'https://blog-backend-nest.vercel.app/auth/login',
      {
        loginOrEmail,
        password,
      },
      { withCredentials: true }
    )
  }
  userRegistration(login: string, password: string, email: string) {
    return this.http.post('https://blog-backend-nest.vercel.app/auth/registration', {
      login,
      password,
      email,
    })
  }

  sendPasswordRecovery(email: string) {
    return this.http.post('https://blog-backend-nest.vercel.app/auth/password-recovery', {
      email,
    })
  }

  newPassword(newPassword: string, recoveryCode: string) {
    return this.http.post('https://blog-backend-nest.vercel.app/auth/new-password', {
      newPassword,
      recoveryCode,
    })
  }

  sendRefreshToken() {
    return this.http.post('https://blog-backend-nest.vercel.app/auth/refresh-token', {}, { withCredentials: true })
  }

  me() {
    return this.http.get<AuthMe>('https://blog-backend-nest.vercel.app/auth/me')
  }

  logOut() {
    return this.http.post('https://blog-backend-nest.vercel.app/auth/logout', {}, { withCredentials: true })
  }
}
