import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'
import { map } from 'rxjs/operators'
import { selectIsAuthenticated } from '../../store/selectors/auth.selector'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true
        } else {
          this.router.navigate(['/main/blogs-page'])
          return false
        }
      })
    )
  }
}
