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
export class RecoveryPageComponent {

  authSeverity$?: Observable<SeverityType | undefined> = this.store.select(selectAuthAlertSeverity)
  recoverPasswordLoading$?: Observable<boolean> = this.store.select(selectIsAuthLoading)

  constructor(private store: Store) {}

  onFormSubmit(data: { email: string }) {
    this.store.dispatch(passwordRecovery({ email: data.email }))
  }
}
