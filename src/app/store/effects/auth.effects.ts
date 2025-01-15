import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, delay, finalize, map, mergeMap, switchMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'

import {
  addAuthAlert,
  deleteAuthAlert,
  newPasswordAction,
  passwordRecovery,
  registerUser,
  loginUser,
  setAccessToken,
  setIsAuthenticated,
  refreshToken,
  authMe,
  setProfile,
  logOut,
  confirmEmail,
  setConfirmationEmailStatus,
  emailResending,
  setRegistrationEmail,
  setIsAuthLoading,
  changeUserData,
  setUserLoading,
  successChangeUserData,
} from '../actions/auth.actions'
import { Router } from '@angular/router'
import { AuthService } from '../../core/services/auth.service'
import { setAppLoading } from '../actions/app.actions'
import { setLikeStatusAsNoneForPostsInBlogAction } from '../actions/blogs.actions'
import { setLikeStatusAsNoneForPostsAction } from '../actions/posts.action'

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
          of(setIsAuthLoading({ isAuthLoading: true })),
          this.authService.userLogin(action.loginOrEmail, action.password).pipe(
            mergeMap((response: any) => {
              localStorage.setItem('accessToken', response.accessToken)

              return [
                addAuthAlert({ severity: 'success', message: 'Login successful!' }),
                setAccessToken({ accessToken: response.accessToken }),

                setIsAuthenticated({ isAuthenticated: true }),

                setIsAuthLoading({ isAuthLoading: false }),
                authMe(),
              ]
            }),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              console.log(message)
              return of(
                setIsAuthLoading({ isAuthLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  me$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authMe),
      concatMap(action =>
        concat(
          of(setAppLoading({ loading: true })),
          this.authService.me().pipe(
            mergeMap(user => {
              return [
                setIsAuthenticated({ isAuthenticated: true }),
                setProfile({
                  email: user.email,
                  login: user.login,
                  userId: user.userId,
                  deviceId: user.deviceId,
                  imageUrl: user.imageUrl,
                }),
                setAppLoading({ loading: false }),
              ]
            }),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                addAuthAlert({ severity: 'error', message: message }),
                setAppLoading({ loading: false })
              )
            })
          )
        )
      )
    )
  )

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshToken),
      concatMap(action =>
        concat(
          this.authService.sendRefreshToken().pipe(
            mergeMap((response: any) => [
              setAccessToken({ accessToken: response.accessToken }),
              // setIsAuthenticated({ isAuthenticated: true }),
            ]),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(addAuthAlert({ severity: 'error', message: message }))
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
          this.router.navigate(['/main/blogs-page'])
        })
      ),
    { dispatch: false }
  )

  userRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      concatMap(action =>
        concat(
          of(setIsAuthLoading({ isAuthLoading: true })),
          this.authService.userRegistration(action.login, action.password, action.email).pipe(
            mergeMap(() => [
              setIsAuthLoading({ isAuthLoading: false }),
              addAuthAlert({ severity: 'success', message: 'Registration successful!' }),
              setRegistrationEmail({ registrationEmail: action.email }),
            ]),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setIsAuthLoading({ isAuthLoading: false }),
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

  passwordRecovery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(passwordRecovery),
      concatMap(action =>
        concat(
          of(setIsAuthLoading({ isAuthLoading: true })),
          this.authService.sendPasswordRecovery(action.email).pipe(
            mergeMap(() => [
              setIsAuthLoading({ isAuthLoading: false }),
              addAuthAlert({
                severity: 'success',
                message: 'An email has been sent to you with instructions!',
              }),
            ]),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setIsAuthLoading({ isAuthLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  emailResending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(emailResending),
      concatMap(action =>
        concat(
          of(setIsAuthLoading({ isAuthLoading: true })),
          this.authService.emailResending(action.email).pipe(
            mergeMap(() => [
              setIsAuthLoading({ isAuthLoading: false }),
              addAuthAlert({
                severity: 'success',
                message: 'An email has been sent to you with instructions!',
              }),
            ]),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setIsAuthLoading({ isAuthLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )
  emailConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmEmail),
      concatMap(action =>
        concat(
          of(setConfirmationEmailStatus({ confirmationStatus: 'pending' })),
          this.authService.passwordConfirmation(action.confirmationCode).pipe(
            mergeMap(() => [
              setConfirmationEmailStatus({ confirmationStatus: 'success' }),
              // addAuthAlert({
              //   severity: 'success',
              //   message: 'An email has been sent to you with instructions!',
              // }),
            ]),
            catchError(error => {
              // const message = error.error.errorsMessages[0].message
              return of(
                setConfirmationEmailStatus({ confirmationStatus: 'error' })
                // addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  changeUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeUserData),
      concatMap(action =>
        concat(
          of(setUserLoading({ userLoading: true })),
          this.authService.changeUserData(action.login, action.file).pipe(
            mergeMap((response: { login: string; imageUrl: string }) => [
              setUserLoading({ userLoading: false }),
              addAuthAlert({
                severity: 'success',
                message: 'User data was changed!',
              }),
              successChangeUserData({ login: response.login, imageUrl: response.imageUrl }),
            ]),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setConfirmationEmailStatus({ confirmationStatus: 'error' }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  newPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newPasswordAction),
      concatMap(action =>
        concat(
          of(setIsAuthLoading({ isAuthLoading: true })),
          this.authService.newPassword(action.newPassword, action.recoveryCode).pipe(
            mergeMap(() => {
              this.router.navigate(['/auth/login'])
              return [
                setIsAuthLoading({ isAuthLoading: false }),
                addAuthAlert({
                  severity: 'success',
                  message: 'Password has been changed!',
                }),
              ]
            }),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setIsAuthLoading({ isAuthLoading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logOut),
      concatMap(action =>
        concat(
          of(setAppLoading({ loading: true })),
          this.authService.logOut().pipe(
            mergeMap(user => {
              this.router.navigate(['/main/blogs-page'])
              localStorage.removeItem('accessToken')
              return [
                setIsAuthenticated({ isAuthenticated: false }),
                setProfile({ email: '', login: '', userId: '', deviceId: '', imageUrl: '' }),
                setAppLoading({ loading: false }),
                setLikeStatusAsNoneForPostsInBlogAction({ status: 'None' }),
                setLikeStatusAsNoneForPostsAction({ status: 'None' }),
              ]
            }),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                addAuthAlert({ severity: 'error', message: message }),
                setAppLoading({ loading: false })
              )
            })
          )
        )
      )
    )
  )
}
