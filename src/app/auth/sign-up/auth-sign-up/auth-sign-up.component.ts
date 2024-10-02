import { Component, OnInit } from '@angular/core'
import {
  selectAuthAlertSeverity,
  selectRegistrationLoading,
} from '../../../store/selectors/auth.selector'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { registerUser } from '../../../store/actions/auth.actions'
import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-auth-sign-up',
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.scss',
})
export class AuthSignUpComponent implements OnInit {
  authSeverity$?: Observable<SeverityType | undefined>
  signUpLoading$?: Observable<boolean>
  isModalOpen = true
  email: string = ''
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.loader()
  }
  loader() {
    this.signUpLoading$ = this.store.select(selectRegistrationLoading)
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
  }
  openModal(): void {
    this.isModalOpen = true
  }

  closeModal(): void {
    this.isModalOpen = false
  }
  onFormSubmit(data: { login: string; password: string; email: string }) {
    this.store.dispatch(
      registerUser({ login: data.login, password: data.password, email: data.email })
    )
  }
  // authRegistration(login: string, password: string, email: string) {
  //   this.authService.userRegistration(login, password, email).subscribe(res => {
  //     alert('User was added' + res)
  //   })
  // }
}
