import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import { loginUser } from '../../../store/actions/auth.actions'
import { Observable } from 'rxjs'
import { selectIsAuthLoading } from '../../../store/selectors/auth.selector'

@Component({
  selector: 'blog-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss',
})
export class AuthLoginComponent {
  loginLoading$?: Observable<boolean> = this.store.select(selectIsAuthLoading)

  constructor(private store: Store) {}

  onFormSubmit(data: { usernameOrEmail: string; password: string }) {
    this.store.dispatch(loginUser({ loginOrEmail: data.usernameOrEmail, password: data.password }))
  }
}
