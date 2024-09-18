import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})

//https://blog-backend-nest.vercel.app/
export class AuthService {
  constructor(private http: HttpClient) {}

  userRegistration(login: string, password: string, email: string) {
    return this.http.post('https://blog-backend-nest.vercel.app/auth/registration', {
      login,
      password,
      email,
    })
  }

  userLogin(loginOrEmail: string, password: string) {
    return this.http.post('https://blog-backend-nest.vercel.app/auth/registration', {
      loginOrEmail,
      password,
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
}
