import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, delay, map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { AuthService } from '../../core/services/auth.service'
import { addAlert, deleteAlert, registerUser } from '../actions/app.actions'
import { ApiError } from '../../types/error.model'

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
          map(() => addAlert({ severity: 'success', message: 'Registration successful!' })),
          catchError((error: { error: ApiError }) => {
            const message = error.error.errorsMessages[0].message
            return of(addAlert({ severity: 'error', message: message }))
          })
        )
      )
    )
  )

  clearAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAlert),
      delay(5000),
      map(() => deleteAlert())
    )
  )
}
