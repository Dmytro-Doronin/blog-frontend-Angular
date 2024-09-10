import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { AuthService } from '../../core/services/auth.service'
import { addError, registerUser } from '../actions/app.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  userRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser), // Action Type
      mergeMap(action =>
        this.authService.userRegistration(action.login, action.password, action.email).pipe(
          map(() => ({ type: '[Error] Add Error' })),
          catchError(error => {
            console.error('Error in user registration:', error)
            return of(addError({ severity: 'error', message: 'Registration failed' }))
          })
        )
      )
    )
  )
}
