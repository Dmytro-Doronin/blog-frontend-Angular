import { Component, OnInit } from '@angular/core'
import { IconSignOutComponent } from '../icon-sign-out/icon-sign-out.component'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectIsAuthenticated, selectUserLogin } from '../../../store/selectors/auth.selector'
import { logOut } from '../../../store/actions/auth.actions'

@Component({
  selector: 'blog-header-component',
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss',
})
export class HeaderComponentComponent implements OnInit {
  isAuthenticated$?: Observable<boolean>
  userLogin$?: Observable<string>

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    if (this.isAuthenticated$) {
      this.userLogin$ = this.store.select(selectUserLogin)
    }
  }

  logOut() {
    this.store.dispatch(logOut())
  }
}
