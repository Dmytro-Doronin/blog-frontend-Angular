import { createAction, props } from '@ngrx/store'
import {
  AuthLogin,
  AuthMe,
  AuthRegistration,
  ConfirmationEmailTypes,
} from '../../types/auth.models'
import { Notify } from '../../types/notification.models'

export const loginUser = createAction('[Auth] Login User', props<AuthLogin>())
export const registerUser = createAction('[Auth] Register User', props<AuthRegistration>())
export const addAuthAlert = createAction('[Alert] Add Alert', props<Notify>())
export const deleteAuthAlert = createAction('[Alert] Delete Alert')

export const authMe = createAction('[Me] auth Me')
export const setProfile = createAction('[Auth profile] set profile', props<AuthMe>())
export const logOut = createAction('[Log out] Log out')

export const confirmEmail = createAction(
  '[Confirm] confirm email',
  props<{ confirmationCode: string }>()
)

export const setAccessToken = createAction(
  '[Access token] Set access token',
  props<{ accessToken: string | null }>()
)
export const refreshToken = createAction('[Refresh token] Get new token')

export const setPasswordRecoveryLoading = createAction(
  '[Recovery loader] Set recovery loader',
  props<{ passwordRecoveryLoading: boolean }>()
)

export const setNewPasswordLoading = createAction(
  '[New password loader] Set new password loader',
  props<{ newPasswordLoading: boolean }>()
)

export const setConfirmationEmailStatus = createAction(
  '[Confirmation status] Set new confirmation status',
  props<{ confirmationStatus: ConfirmationEmailTypes }>()
)

export const setLoginLoading = createAction(
  '[Login loader] Set login loader',
  props<{ loginLoading: boolean }>()
)

export const setRegistrationLoading = createAction(
  '[Registration loader] Set registration loader',
  props<{ registrationLoading: boolean }>()
)

export const passwordRecovery = createAction(
  '[Password] Password recovery',
  props<{ email: string }>()
)

export const newPasswordAction = createAction(
  '[Password] New password',
  props<{ newPassword: string; recoveryCode: string }>()
)
export const setIsAuthenticated = createAction(
  '[isAuthenticated] Set isAuthenticated',
  props<{ isAuthenticated: boolean }>()
)
