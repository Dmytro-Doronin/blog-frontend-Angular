import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { newPasswordAction } from '../../../store/actions/auth.actions'
import { Store } from '@ngrx/store'
import {
  selectAuthAlertSeverity,
  selectIsAuthLoading,
} from '../../../store/selectors/auth.selector'
import { Observable, Subscription } from 'rxjs'
import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-new-password-page',
  templateUrl: './new-password-page.component.html',
  styleUrl: './new-password-page.component.scss',
})
export class NewPasswordPageComponent implements OnInit, OnDestroy {
  recoveryCode!: string
  authSeverity$?: Observable<SeverityType | undefined>
  newPasswordLoading$?: Observable<boolean>
  private authQuerySubscription: Subscription = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getParams()

    this.loader()
    this.severity()
  }

  getParams() {
    this.authQuerySubscription = this.route.queryParamMap.subscribe(params => {
      this.recoveryCode = params.get('recoveryCode') || ''
    })
  }

  loader() {
    this.newPasswordLoading$ = this.store.select(selectIsAuthLoading)

  }

  severity() {
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
  }

  onFormSubmit(data: { newPassword: string }) {
    this.store.dispatch(
      newPasswordAction({ newPassword: data.newPassword, recoveryCode: this.recoveryCode })
    )
  }

  ngOnDestroy() {
    this.authQuerySubscription.unsubscribe()
  }
}
