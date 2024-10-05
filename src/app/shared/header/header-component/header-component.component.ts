import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectIsAuthenticated, selectUserLogin } from '../../../store/selectors/auth.selector'
import { logOut } from '../../../store/actions/auth.actions'
import { selectAppLoading } from '../../../store/selectors/app.selector'

@Component({
  selector: 'blog-header-component',
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss',
})
export class HeaderComponentComponent implements OnInit {
  isAuthenticated$?: Observable<boolean>
  userLogin$?: Observable<string>
  headerLoading$?: Observable<boolean>

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.loader()
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    if (this.isAuthenticated$) {
      this.userLogin$ = this.store.select(selectUserLogin)
    }
  }

  loader() {
    this.headerLoading$ = this.store.select(selectAppLoading)
  }

  logOut() {
    this.store.dispatch(logOut())
  }
}
