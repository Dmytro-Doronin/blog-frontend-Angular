import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, delay, finalize, map, mergeMap, switchMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'

import { AuthService } from '../../core/services/auth.service'
import {
  addAuthAlert,
  deleteAuthAlert,
  newPasswordAction,
  passwordRecovery,
  registerUser,
  setRegistrationLoading,
  setPasswordRecoveryLoading,
  setNewPasswordLoading,
  loginUser,
  setLoginLoading, setAccessToken, setIsAuthenticated,
} from '../actions/auth.actions'
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      concatMap(action =>
        concat(
          of(setLoginLoading({ loginLoading: true })),
          this.authService.userLogin(action.loginOrEmail, action.password).pipe(
            mergeMap((response: any) => [
              addAuthAlert({ severity: 'success', message: 'Login successful!' }),
              setAccessToken({accessToken: response.accessToken}),
              setIsAuthenticated({isAuthenticated: true}),
              setLoginLoading({ loginLoading: false }),
            ]),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setLoginLoading({ loginLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setAccessToken),
        map(() => {
          this.router.navigate(['/blogs']);
        })
      ),
    { dispatch: false }
  )

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

  // passwordRecovery = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(passwordRecovery),
  //       mergeMap(action =>
  //         this.authService
  //           .sendPasswordRecovery(action.email)
  //           .pipe
  //           // map(() => passwordRecovery())
  //           // catchError(error => of(sendPasswordResetFailure({ error })))
  //           ()
  //       )
  //     ),
  //   { dispatch: false }
  // )

  passwordRecovery = createEffect(() =>
    this.actions$.pipe(
      ofType(passwordRecovery),
      concatMap(action =>
        concat(
          of(setPasswordRecoveryLoading({ passwordRecoveryLoading: true })),
          this.authService.sendPasswordRecovery(action.email).pipe(
            mergeMap(() => [
              setPasswordRecoveryLoading({ passwordRecoveryLoading: false }),
              addAuthAlert({
                severity: 'success',
                message: 'An email has been sent to you with instructions.!',
              }),
            ]),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setPasswordRecoveryLoading({ passwordRecoveryLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  // newPassword = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(newPasswordAction),
  //       mergeMap(action =>
  //         this.authService
  //           .newPassword(action.newPassword, action.recoveryCode)
  //           .pipe
  //           // map(() => passwordRecovery())
  //           // catchError(error => of(sendPasswordResetFailure({ error })))
  //           ()
  //       )
  //     ),
  //   { dispatch: false }
  // )

  newPassword = createEffect(() =>
    this.actions$.pipe(
      ofType(newPasswordAction),
      concatMap(action =>
        concat(
          of(setNewPasswordLoading({ newPasswordLoading: true })),
          this.authService.newPassword(action.newPassword, action.recoveryCode).pipe(
            mergeMap(() => [
              setNewPasswordLoading({ newPasswordLoading: false }),
              addAuthAlert({
                severity: 'success',
                message: 'Password has been changed!',
              }),
            ]),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setNewPasswordLoading({ newPasswordLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )
}
