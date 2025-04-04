import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  selectAuthAlertSeverity,
  selectIsAuthLoading,
  selectRegistrationEmail,
} from '../../../store/selectors/auth.selector'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { registerUser } from '../../../store/actions/auth.actions'
import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-auth-sign-up',
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.scss',
})
export class AuthSignUpComponent implements OnInit, OnDestroy {
  authSeverity$?: Observable<SeverityType | undefined> = this.store.select(selectAuthAlertSeverity)
  signUpLoading$?: Observable<boolean> = this.store.select(selectIsAuthLoading)
  emailRegistration$?: Observable<string>
  isModalOpen = false
  content: string = ``
  private emailSubscription: Subscription = new Subscription()

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.email()
  }


  email() {
    this.emailRegistration$ = this.store.select(selectRegistrationEmail)
    this.emailSubscription = this.emailRegistration$.subscribe(item => {
      this.content = this.content = `We have sent a link to confirm your email to ${item}`
      this.isModalOpen = !!item
    })
  }

  closeModal(): void {
    this.isModalOpen = false
  }
  onFormSubmit(data: { login: string; password: string; email: string }) {
    this.store.dispatch(
      registerUser({ login: data.login, password: data.password, email: data.email })
    )
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe()
  }
}
