import { createAction, props } from '@ngrx/store'
import { AuthRegistration } from '../../types/auth.models'
import { Notify } from '../../types/notification.models'

export const registerUser = createAction('[Auth] Register User', props<AuthRegistration>())
export const addAuthAlert = createAction('[Alert] Add Alert', props<Notify>())
export const deleteAuthAlert = createAction('[Alert] Delete Alert')

export const setPasswordRecoveryLoading = createAction(
  '[Recovery loader] Set recovery loader',
  props<{ passwordRecoveryLoading: boolean }>()
)

export const setNewPasswordLoading = createAction(
  '[New password loader] Set new password loader',
  props<{ newPasswordLoading: boolean }>()
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
