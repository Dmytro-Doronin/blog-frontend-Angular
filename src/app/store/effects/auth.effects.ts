import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, delay, finalize, map, mergeMap, switchMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'

import { AuthService } from '../../core/services/auth.service'
import {
  addAuthAlert,
  deleteAuthAlert,
  passwordRecovery,
  registerUser,
  setRegistrationLoading,
} from '../actions/auth.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  userRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      concatMap(action =>
        concat(
          of(setRegistrationLoading({ registrationLoading: true })),
          this.authService.userRegistration(action.login, action.password, action.email).pipe(
            mergeMap(() => [
              setRegistrationLoading({ registrationLoading: false }),
              addAuthAlert({ severity: 'success', message: 'Registration successful!' }),
            ]),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setRegistrationLoading({ registrationLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  clearAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAuthAlert),
      delay(5000),
      map(() => deleteAuthAlert())
    )
  )

  passwordRecovery = createEffect(
    () =>
      this.actions$.pipe(
        ofType(passwordRecovery),
        mergeMap(action =>
          this.authService
            .sendPasswordRecovery(action.email)
            .pipe
            // map(() => passwordRecovery())
            // catchError(error => of(sendPasswordResetFailure({ error })))
            ()
        )
      ),
    { dispatch: false }
  )
}
