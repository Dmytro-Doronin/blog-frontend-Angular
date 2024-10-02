import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { authMe } from './store/actions/auth.actions'

import { Observable } from 'rxjs'
import { selectAppLoading } from './store/selectors/app.selector'

@Component({
  selector: 'blog-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'blog'
  appLoading$?: Observable<boolean>
  constructor(private store: Store) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      this.store.dispatch(authMe())
    }

    this.appLoading$ = this.store.select(selectAppLoading)
  }
}
