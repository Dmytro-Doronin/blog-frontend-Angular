import { Injectable } from '@angular/core'
import {CanActivate, CanLoad, Route, Router, UrlSegment} from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'
import { map } from 'rxjs/operators'
import { selectIsAuthenticated } from '../../store/selectors/auth.selector'


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkAuthentication();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkAuthentication();
  }

  private checkAuthentication(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/main/blogs-page']);
          return false;
        }
      })
    );
  }
}
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private store: Store,
//     private router: Router
//   ) {}
//
//   canActivate(): Observable<boolean> {
//     return this.store.select(selectIsAuthenticated).pipe(
//       take(1),
//       map(isAuthenticated => {
//         if (isAuthenticated) {
//           return true
//         } else {
//           this.router.navigate(['/main/blogs-page'])
//           return false
//         }
//       })
//     )
//   }
// }
