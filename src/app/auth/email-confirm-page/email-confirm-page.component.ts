import { Component } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { ConfirmationEmailTypes } from '../../types/auth.models'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { confirmEmail } from '../../store/actions/auth.actions'
import { selectConfirmationStatus } from '../../store/selectors/auth.selector'

@Component({
  selector: 'blog-email-confirm-page',
  templateUrl: './email-confirm-page.component.html',
  styleUrl: './email-confirm-page.component.scss',
})
export class EmailConfirmPageComponent {
  private authQuerySubscription: Subscription = new Subscription()
  getStatusSubscription$?: Observable<ConfirmationEmailTypes>
  code!: string
  status!: string
  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authQuerySubscription = this.route.queryParamMap.subscribe(params => {
      this.code = params.get('code') || ''
    })

    this.store.dispatch(confirmEmail({ confirmationCode: this.code }))

    this.getStatus()
  }

  getStatus() {
    this.getStatusSubscription$ = this.store.select(selectConfirmationStatus)
  }
}
