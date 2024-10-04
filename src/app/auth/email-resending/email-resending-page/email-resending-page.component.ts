import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { SeverityType } from '../../../types/notification.models'
import { Store } from '@ngrx/store'
import {
  selectAuthAlertSeverity,
  selectResendingEmailLoading,
} from '../../../store/selectors/auth.selector'
import { emailResending, newPasswordAction } from '../../../store/actions/auth.actions'

@Component({
  selector: 'blog-email-resending-page',
  templateUrl: './email-resending-page.component.html',
  styleUrl: './email-resending-page.component.scss',
})
export class EmailResendingPageComponent implements OnInit {
  authSeverity$?: Observable<SeverityType | undefined>
  resendingEmailLoading$?: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loader()
  }

  loader() {
    this.resendingEmailLoading$ = this.store.select(selectResendingEmailLoading)
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
  }

  onFormSubmit(data: { email: string }) {
    this.store.dispatch(emailResending({ email: data.email }))
  }
}
