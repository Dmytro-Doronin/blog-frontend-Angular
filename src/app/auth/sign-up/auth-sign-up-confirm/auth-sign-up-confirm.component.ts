import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { confirmEmail } from '../../../store/actions/auth.actions'
import { ConfirmationEmailTypes } from '../../../types/auth.models'
import { selectConfirmationStatus } from '../../../store/selectors/auth.selector'

@Component({
  selector: 'blog-auth-sign-up-confirm',
  templateUrl: './auth-sign-up-confirm.component.html',
  styleUrl: './auth-sign-up-confirm.component.scss',
})
export class AuthSignUpConfirmComponent {
  // private authQuerySubscription: Subscription = new Subscription()
  // private getStatusSubscription$?: Observable<ConfirmationEmailTypes>
  // code!: string
  // status!: string
  // constructor(
  //   private route: ActivatedRoute,
  //   private store: Store
  // ) {}
  //
  // ngOnInit(): void {
  //   this.authQuerySubscription = this.route.queryParamMap.subscribe(params => {
  //     this.code = params.get('code') || ''
  //   })
  //
  //   this.store.dispatch(confirmEmail({ confirmationCode: this.code }))
  //
  //   this.getStatus()
  // }
  //
  // getStatus() {
  //   this.getStatusSubscription$ = this.store.select(selectConfirmationStatus)
  // }
}
