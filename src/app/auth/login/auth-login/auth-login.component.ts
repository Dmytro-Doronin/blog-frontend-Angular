import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import { loginUser } from '../../../store/actions/auth.actions'
import { selectLoginLoading } from '../../../store/selectors/auth.selector'
import { Observable } from 'rxjs'

@Component({
  selector: 'blog-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss',
})
export class AuthLoginComponent implements OnInit {
  loginLoading$?: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loader()
  }
  loader() {
    this.loginLoading$ = this.store.select(selectLoginLoading)
  }

  onFormSubmit(data: { usernameOrEmail: string; password: string }) {
    this.store.dispatch(loginUser({ loginOrEmail: data.usernameOrEmail, password: data.password }))
  }
}
