import { Component, OnInit } from '@angular/core'

import { passwordRecovery } from '../../../store/actions/auth.actions'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { SeverityType } from '../../../types/notification.models'
import {
  selectAuthAlertSeverity,
  selectIsAuthLoading,
} from '../../../store/selectors/auth.selector'

@Component({
  selector: 'blog-recovery-page',
  templateUrl: './recovery-page.component.html',
  styleUrl: './recovery-page.component.scss',
})
export class RecoveryPageComponent implements OnInit {
  authSeverity$?: Observable<SeverityType | undefined>
  recoverPasswordLoading$?: Observable<boolean>
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loader()
  }

  loader() {
    this.recoverPasswordLoading$ = this.store.select(selectIsAuthLoading)
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
  }

  onFormSubmit(data: { email: string }) {
    this.store.dispatch(passwordRecovery({ email: data.email }))
  }
}
