import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { authMe } from './store/actions/auth.actions'

import { Observable, Subscription, tap } from 'rxjs'
import { selectAppLoading, selectAutoLogOut } from './store/selectors/app.selector'
import { setAutoLogOut } from './store/actions/app.actions'

@Component({
  selector: 'blog-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'blog'
  appLoading$?: Observable<boolean>
  isModalOpen$?: Observable<boolean>
  // isModalOpen: boolean = false
  private modalSubscription: Subscription = new Subscription()
  constructor(private store: Store) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      this.store.dispatch(authMe())
    }
    // this.modalSubs()
    // this.isModalOpen$ = this.store.select(selectAutoLogOut)
    this.appLoading$ = this.store
      .select(selectAppLoading)
      .pipe(tap(value => console.log('loading:', value)))
    this.isModalOpen$ = this.store
      .select(selectAutoLogOut)
      .pipe(tap(value => console.log('Auto Log Out:', value)))
  }

  // modalSubs() {
  //   this.modalSubscription = this.store.select(selectAutoLogOut).subscribe(item => {
  //     this.isModalOpen = item
  //   })
  // }

  onClose2() {
    this.store.dispatch(setAutoLogOut({ autoLogOut: true }))
    // this.isModalOpen = false
  }

  onClose() {
    this.store.dispatch(setAutoLogOut({ autoLogOut: false }))
    // this.isModalOpen = false
  }
}
