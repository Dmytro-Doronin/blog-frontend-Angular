import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, delay, map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { AuthService } from '../../core/services/auth.service'
import { ApiError } from '../../types/error.model'
import {addAuthAlert, deleteAuthAlert, registerUser, setRegistrationLoading} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  // userRegistration$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(registerUser), // Action Type
  //     mergeMap(action =>
  //       this.authService.userRegistration(action.login, action.password, action.email).pipe(
  //         map(() => addAuthAlert({ severity: 'success', message: 'Registration successful!' })),
  //         catchError((error: { error: ApiError }) => {
  //           const message = error.error.errorsMessages[0].message
  //           return of(addAuthAlert({ severity: 'error', message: message }))
  //         })
  //       )
  //     )
  //   )
  // )

  userRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap(action =>
        of(setRegistrationLoading({  registrationLoading: true })).pipe(
          mergeMap(() =>
            this.authService.userRegistration(action.login, action.password, action.email).pipe(
              mergeMap(() => {
                return of(
                  setRegistrationLoading({  registrationLoading: false }),
                  addAuthAlert({ severity: 'success', message: 'Registration successful!' })
                )
              }),
              catchError((error: any) => {
                const message = error.error.errorsMessages[0].message;
                return of(setRegistrationLoading({  registrationLoading: false }),
                  addAuthAlert({ severity: 'error', message: message }));
              })
            )
          )
        )
      )
    )
  );

  clearAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAuthAlert),
      delay(5000),
      map(() => deleteAuthAlert())
    )
  )
}
