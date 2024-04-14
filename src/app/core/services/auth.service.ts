import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})

//https://blog-backend-nest.vercel.app/
export class AuthService {
  constructor(private http: HttpClient) {}

  registration(login: string, password: string, email: string) {
    return this.http.post('https://blog-backend-nest.vercel.app/auth/registration', {
      login,
      password,
      email,
    })
  }
}
